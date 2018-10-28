var bcrypt = require('bcrypt');


const hash = (textplain) => {  
    const saltRounds = 10; // 加密强度 10
    return new Promise((resolve) => {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(textplain, salt, function(err, hash) {
                // Store hash in your password DB.
                resolve(hash)
            });
        });
    })
    
}

module.exports = {
    hash
}