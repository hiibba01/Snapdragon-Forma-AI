import bcrypt from "bcrypt";
import User from "../models/User.model.js";
import jwt from "jsonwebtoken";

export const register=async(req, res)=>{
    const { name, email, password } = req.body;

    try{
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email and password are required!"
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email address!"
            });
        }

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters long and should contain both letters and numbers!"
            });
        }
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User with this email already exists."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            success: true,
            message: "Account created successfully.",
            data: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    }

    catch(error){
        console.error("Registration error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to create account!"
        });
    }
}


export const login = async(req, res)=>{
    try{
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required!"
            });
        }
        const user = await User.findOne({ email });

        if(!user){
            return res.status(401).json({
                success: false,
                message: "Invalid email or password!"
            });
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password!"
            });
        }

        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d"}
        );

        res.status(200).json({
            success: true,
            message: "Login successful!",
            data: {
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            }
        });

    } catch(error){
        console.error("Login error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to login!"
        })

    }
}