// request.js
let url = require('url');

module.exports = {

    get query() {
        return url.parse(this.req.url, true).query;
    },
    // get headers() {
    //     return this.req.headers;
    // },
    // 后面还有很多需要写

};