const express = require('express');
const Food = require('../models/food.model');
const Payment = require('../models/payment.model');

const paymentRouter = express.Router();
const PAYRIFF_URL = process.env.PAYRIFF_API_URL || 'https://api.payriff.com';
const CLIENT_URL = (process.env.CLIENT_URL || 'http://localhost:5173').replace(/\/$/, '');

function configured() {
  return Boolean(process.env.PAYRIFF_SECRET_KEY && process.env.PAYRIFF_MERCHANT_ID);
}

function customerIsValid(customer) {
  return customer && ['fullName', 'phone', 'email', 'address'].every((key) =>
    typeof customer[key] === 'string' && customer[key].trim().length > 0,
  );
}

async function payriffRequest(path, body) {
  const response = await fetch(`${PAYRIFF_URL}${path}`, {
    method: 'POST',
    headers: {
      Authorization: process.env.PAYRIFF_SECRET_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.code !== '00000') {
    throw new Error(data.message || 'Payriff sorğusu alınmadı.');
  }
  return data.payload;
}

paymentRouter.post('/payments/checkout', async (req, res) => {
  try {
    if (!configured()) {
      return res.status(503).json({ error: 'Ödəniş xidməti hələ sazlanmayıb.' });
    }

    const { items, customer } = req.body;
    if (!Array.isArray(items) || items.length === 0 || !customerIsValid(customer)) {
      return res.status(400).json({ error: 'Sifariş və çatdırılma məlumatlarını yoxlayın.' });
    }

    const quantities = new Map();
    for (const item of items) {
      const quantity = Number(item.quantity);
      if (!item.productId || !Number.isInteger(quantity) || quantity < 1 || quantity > 50) {
        return res.status(400).json({ error: 'Sifarişdə düzgün olmayan məhsul var.' });
      }
      quantities.set(String(item.productId), (quantities.get(String(item.productId)) || 0) + quantity);
    }

    const foods = await Food.find({ _id: { $in: [...quantities.keys()] } });
    if (foods.length !== quantities.size) {
      return res.status(400).json({ error: 'Məhsullardan biri artıq mövcud deyil.' });
    }

    const verifiedItems = foods.map((food) => ({
      productId: food._id,
      name: food.FoodName,
      quantity: quantities.get(String(food._id)),
      unitPrice: Number(food.Price),
    }));
    const amount = Number(verifiedItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0).toFixed(2));
    if (!Number.isFinite(amount) || amount <= 0) {
      return res.status(400).json({ error: 'Ödəniləcək məbləğ düzgün deyil.' });
    }

    const payment = await Payment.create({
      items: verifiedItems,
      amount,
      customer: {
        fullName: customer.fullName.trim(), phone: customer.phone.trim(),
        email: customer.email.trim(), address: customer.address.trim(),
      },
    });
    const returnUrl = `${CLIENT_URL}/payment-result?paymentId=${payment._id}`;
    const invoice = await payriffRequest('/api/v2/invoices', {
      merchant: process.env.PAYRIFF_MERCHANT_ID,
      body: {
        amount,
        approveURL: returnUrl,
        cancelURL: `${returnUrl}&result=cancelled`,
        declineURL: `${returnUrl}&result=declined`,
        currencyType: 'AZN',
        description: `Yemək sifarişi #${payment._id}`,
        fullName: payment.customer.fullName,
        email: payment.customer.email,
        phoneNumber: payment.customer.phone,
        expireDate: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
        languageType: 'AZ',
        sendSms: false,
        sendEmail: false,
        sendWhatsapp: false,
        amountDynamic: false,
        directPay: true,
        metadata: { paymentId: String(payment._id) },
      },
    });
    payment.invoiceUuid = invoice.invoiceUuid;
    await payment.save();
    res.status(201).json({ paymentUrl: invoice.paymentUrl });
  } catch (error) {
    console.error('Payment checkout error:', error.message);
    res.status(502).json({ error: 'Ödəniş səhifəsi yaradıla bilmədi. Yenidən cəhd edin.' });
  }
});

paymentRouter.get('/payments/:paymentId/status', async (req, res) => {
  try {
    if (!configured()) return res.status(503).json({ error: 'Ödəniş xidməti hələ sazlanmayıb.' });
    const payment = await Payment.findById(req.params.paymentId);
    if (!payment || !payment.invoiceUuid) return res.status(404).json({ error: 'Ödəniş tapılmadı.' });

    const invoice = await payriffRequest('/api/v2/get-invoice', {
      merchant: process.env.PAYRIFF_MERCHANT_ID,
      body: { uuid: payment.invoiceUuid },
    });
    const statuses = { APPROVED: 'APPROVED', DECLINED: 'DECLINED', CANCELLED: 'CANCELLED' };
    if (statuses[invoice.invoiceStatus]) {
      payment.status = statuses[invoice.invoiceStatus];
      await payment.save();
    }
    res.json({ status: payment.status, amount: payment.amount });
  } catch (error) {
    console.error('Payment verification error:', error.message);
    res.status(502).json({ error: 'Ödəniş statusu yoxlanıla bilmədi.' });
  }
});

module.exports = paymentRouter;
