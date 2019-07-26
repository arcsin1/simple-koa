let AppKoa = require('./new');
let app = new AppKoa();

app.use((req, res) => {
    res.writeHead(200);
    res.end('hello world new appKoa');
});

app.listen(3000, () => {
    console.log('listening on 3000');
});