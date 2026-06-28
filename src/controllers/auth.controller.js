const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

console.log("USER =", User);

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        User.createUser(
            {
                name,
                email,
                password: hashedPassword
            },
            (err, result) => {
                if (err) return res.status(500).json(err);

                res.status(201).json({
                    message: "Register berhasil"
                });
            }
        );

    } catch (err) {
        res.status(500).json(err);
    }
};

exports.login = (req, res) => {

    const { email, password } = req.body;

    User.findByEmail(email, async (err, result) => {

        if (err)
            return res.status(500).json(err);

        if (result.length === 0)
            return res.status(404).json({
                message: "Email tidak ditemukan"
            });

        const user = result[0];

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch)
            return res.status(401).json({
                message: "Password salah"
            });

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.json({
            message: "Login berhasil",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    });

};

exports.profile = (req, res) => {

    res.json({
        message: "Profile berhasil diambil",
        user: req.user
    });

};