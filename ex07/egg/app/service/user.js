const {Service} = require('egg');

class UserService extends Service {
    async getAll() {
        return { name: 'tom' }
    }
}

module.exports = UserService