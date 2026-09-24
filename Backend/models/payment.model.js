const mongoose = require('mongoose');

// Card data is deliberately never stored here. It is collected only by Payriff.
const paymentSchema = new mongoose.Schema({
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Food', required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
  }],
  amount: { type: Number, required: true },
  customer: {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
  },
  provider: { type: String, default: 'payriff' },
  invoiceUuid: { type: String, unique: true, sparse: true },
  status: { type: String, enum: ['PENDING', 'APPROVED', 'DECLINED', 'CANCELLED'], default: 'PENDING' },
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
