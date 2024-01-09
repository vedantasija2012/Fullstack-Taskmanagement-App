import User from "../models/User.js";

export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User Already Exist!"
            })
        }

        user = await User.create({
            name,
            email,
            password
        })

        const token = await user.generateToken();

        const options = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), httpOnly: true
        }

        return res.status(201).cookie('token', token, options).json({
            success: true,
            message: "User Registered Successfully!",
            user,
            token
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // we need to access the "this.password" so we will change "select:true" as done below
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User does not exist"
            })
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect Password"
            })
        }

        const token = await user.generateToken()

        const options = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true
        }

        res.status(200).cookie('token', token, options).json({
            success: true,
            message:`Welcome Back ${user.name}!`,
            user,
            token
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const logout = async (req, res) => {
    try {

        res.status(200).cookie('token', null, { expires: new Date(Date.now()), httpOnly: true }).json({
            success: true,
            message: "User Logged Out!"
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const showProfile = async(req, res)=>{
    try {
        const user = await User.findById(req.user._id);

        if(!user){
            return res.status(404).json({
                success:false,
                message:"User Not Found!"
            })
        }

        res.status(201).json({
            success:true,
            user
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export const updateProfile = async(req,res)=>{
    try {
        const user = await User.findById(req.user._id);

        const { name, email } = req.body

        if (name) {
            user.name = name
        }
        if (email) {
            user.email = email
        }

        await user.save();

        res.status(201).json({
            success: true,
            message: "User Profile Updated"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}