const bcrypt = require('bcrypt')
const { user } = require('../models')
const { generateToken } = require('../utils/jwt')

const registerUser = async (req, res) => {
    const { username, password , email } = req.body;
  
    try {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);

        
        const hashedPassword = await bcrypt.hash(password, salt);

        
        const newUser = await user.create({
            username : username,
            password: hashedPassword,
            email : email
        });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Failed to register user' });
    }
}

const loginUser = async (req, res) => {
    const { username, password } = req.body;
  
    try {
        const userdata = await user.findOne({ where: { username } });
    
        if (!userdata) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    
        
        const isPasswordValid = await bcrypt.compare(password, userdata.password);
    
        if (isPasswordValid) {
            const payload = {
                id : userdata.id,
                username : userdata.username
            }
            const token = generateToken(payload); 
            res.status(200).json({ message: 'Login successful', token: `Bearer ${token}` });
        } else {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Failed to login' });
    }
};
  
module.exports = {registerUser , loginUser}