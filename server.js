const express = require('express');
const path = require('path');
const { listenerCount } = require('process');

const app = express();

app.use(express.static(__dirname + '/dist/PMSA'));
app.get('/*', function(req, res){
    res.sendFile(path.join(__dirname+ '/dist/PMSA/index.html'));
});

app.listen(process.env.PORT || 8080);