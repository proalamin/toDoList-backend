var jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    let Token = req.headers["token-key"];

    jwt.verify(Token, "Sk3456456", (err, decoded) => {
        if (err) {
            res.status(401).json({ status: 'Unauthorized ' });
        }
        else {
            let userName = decoded['data']['userName'];
            req.headers.userName = userName;

            next();
        }
    })
}