import * as express from 'express';
import path = require('path');

var port: number = process.env.PORT || 3000;
var app = express();

app.use('/app', express.static(path.resolve(__dirname, 'app')));
app.use('/libs', express.static(path.resolve(__dirname, 'libs')));

app.get('/', function(req : express.Request, res: express.Response) {
    res.type('text/plain'); // set content-type
    res.send('i am a beautiful butterfly'); // send text response
});

var server = app.listen(port, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('This express app is listening on port:' + port);
});