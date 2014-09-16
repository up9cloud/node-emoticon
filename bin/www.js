#!/usr/bin/env node
var debug = require('debug')('node-emoticon');
var app = require('../app');

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    debug('Express server mode: ' + app.get('env'));
    debug('Express server listening on port ' + server.address().port);
});
