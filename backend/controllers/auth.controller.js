import { z } from "zod";
import {User} from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;

const signupSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum(["admin", "candidate", "recruiter"])
});

export const userSignup = async (req, res, next)=>{

    const parseResults = signupSchema.safeParse(req.body);

    if(parseResults.success){
        try{
            const { email, password, name, role } = parseResults.data; 

            const existingUser = await User.findOne({email: email});
            if(existingUser) return res.status(400).json({msg: "User with this email already exists!!!"});

            const hashedPassword = await bcrypt.hash(password, 8);
            await User.create({
                email: email,
                password: hashedPassword,
                name: name,
                role: role
            })
            res.status(201).json({
                msg: "User signed up successfully..."
            });
        }
        catch(e){
            return res.status(500).json({
                msg: `Something went wrong in sign up process!!! Error: ${e}`
            });
        }
    }
    else{
        return res.status(400).json({
            msg: "Validation failed!!!",
            errors: parseResults.error
        });
    }
}

const loginSchema = z.object({
    email: z.email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters")
});


export const userLogin = async (req, res, next)=>{
    
    const parseResults = loginSchema.safeParse(req.body);

    if(parseResults.success){

        try{
            const { email, password } = parseResults.data;

            const foundUser = await User.findOne({
                email: email
            });

            if(!foundUser) return res.status(404).json({msg: "Invalid credentials, try again!!!"});

            const isPasswordValid = await bcrypt.compare(password, foundUser.password);

            if(!isPasswordValid) {return res.status(401).json({msg: "Invalid credentials, try again!!!"}); }

            const token = jwt.sign({
                id: foundUser._id
            }, JWT_SECRET);

            res.status(200).json({msg: "User logged in succesfully...", token: token});
        }
        catch(e){
            res.status(500).json({
                msg: `Something went wrong in login process!!! Error: ${e}`
            });
        }
    }
    else{
        res.status(400).json({
            msg: "Login Validation failed!!!",
            errors: parseResults.error
        });
    }
}