var xml2js = require('xml2js');

exports.xmlBodyParser = function(req, res, next) {
    console.log(req._body);
    if (req._body) return next();
    req.body = req.body || {};

    // ignore GET
    if ('GET' == req.method || 'HEAD' == req.method) return next();

    // check Content-Type
    console.log(req.get('content-type'));
    if ('text/xml' != req.get('content-type')) return next();

    // flag as parsed
    req._body = true;

    // parse
    var buf = '';
    req.setEncoding('utf8');
    req.on('data', function(chunk) {
        buf += chunk;
    });
    req.on('end', function() {
        var parseString = xml2js.parseString;
        parseString(buf, function(err, json) {
            if (err) {
                err.status = 400;
                next(err);
            } else {
                req.body = json;
                console(json);
                next();
            }
        });
    });
};