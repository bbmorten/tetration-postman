//Generate a UTC Timestamp with the Tetration expected format that can be used in the request header
function pad(n) {
     return (n < 10) ? '0' + n : n;
}

var now = new Date();
var month = now.getUTCMonth() + 1
var timestamp = now.getUTCFullYear()+'-'+pad(month)+'-'+pad(now.getUTCDate())+'T'+pad(now.getUTCHours())+':'+pad(now.getUTCMinutes())+':'+pad(now.getUTCSeconds())+'+0000';

postman.setGlobalVariable("timestamp",timestamp);

//Calculate the body checksum if it is a POST or PUT request
var checksum = '';

if (request.method == 'POST' || request.method == 'PUT') {
    checksum = CryptoJS.SHA256(request.data)
    checksum = CryptoJS.enc.Hex.stringify(checksum)
}

postman.setGlobalVariable("tetchecksum", checksum);

//Calculate the Digest which is generated based on the timestamp, checksum, additional header parameters, and the secret key
var signer = request.method + '\n/openapi/v1/' + request.url.split('/openapi/v1/')[1] + '\n' + checksum + '\napplication/json\n' + timestamp + '\n';

var digestauth = CryptoJS.HmacSHA256(signer, environment["API_SECRET"]);
digestauth = CryptoJS.enc.Base64.stringify(digestauth);

postman.setGlobalVariable("digestauth", digestauth);
