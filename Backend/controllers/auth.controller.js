const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authController = {
    register: async (req , res) => {
        try{
            const {name , email , password} = req.body;

            const existingUser = await User.findOne({email});
            if(existingUser){
                return res.status(400).json({error: "Bu email artiq qeydiyatdan kecib"});

            }
            const hashedPassword = await bcrypt.hash(password , 10);
            const newUser = new User({name , email , password: hashedPassword });
            await newUser.save();

            const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET , {expiresIn: "7d"});
            res.status(201).json({
                token,
                user: {id: newUser._id , name : newUser.name , email: newUser.email},

            });

        } catch(error){
            console.error("Error registering user:" , error);
            res.status(500).json({error: 'Internal Server Error' });
         }
    },

    login: async(req , res) => {
        try{
            const {email , password } = req.body;

            const user = await User.findOne({email});
            if(!user){
                return res.status(400).json({error: "email və ya şifrə yalnışdır" });

            }

            const isMatch = await bcrypt.compare(password , user.password );
            if(!isMatch){
                return res.status(400).json({error: "Email və ya şifrə yanlışdır"});
            }
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET , {expiresIn: "7d"});

            res.json({
                token , 
                user: { id: user._id , name : user.name , email: user.email},

            });

        } catch (error) {
            console.error("Error logging in:", error);
            res.status(500).json({error: "Internal Server Error"});
        }
    },
};

module.exports = authController;
