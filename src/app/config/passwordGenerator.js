var generator = require('generate-password');

class PasswordGenerator {
    generate(length) {
        return generator.generate({
            length,
            numbers: true, 
            symbols: true,
            lowercase: true,
            uppercase: true,
            strict: true,
        });
    }
}


export default new PasswordGenerator();