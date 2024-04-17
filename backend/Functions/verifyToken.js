const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, secretKey);
        req.user = verified;

        // Check role
        const { role } = verified;
        if (role === 'Organization') {
            // The authenticated entity is an organization
            req.user.role = 'Organization';
        } else if (role === 'Distributions admin') {
            // The authenticated entity is a distributions admin
            req.user.role = 'Distributions admin';
        } else if (role === 'Beneficiaries admin') {
            // The authenticated entity is a beneficiaries admin
            req.user.role = 'Beneficiaries admin';
        } else if (role === 'not admin') {
            // The authenticated entity is not an admin
            req.user.role = 'not admin';
        }

        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
};


module.exports = verifyToken;