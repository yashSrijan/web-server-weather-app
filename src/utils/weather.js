const request = require('request');

module.exports = (lat, lng, callback) => {
    request({
        url : `https://api.darksky.net/forecast/d939bda84646fc2ea2b80a7eaf57bf01/${lat},${lng}`,
        json : true
    }, (error, response, body) => {
        if( !error && response.statusCode === 200) {
            callback(undefined, {
                summary : body.daily.summary
            });
        } else {
            callback('Unable to fetch weather.');
        }
    })
}