import qs from 'querystring';
import url from 'url';
export default function (req, res, next) {
    // req is the Node.js http request object
    let referer = req.headers.referer
    console.log("Headers  :  ", req.headers);
    if(! referer){
        return next();
    }
    let host = url.parse(referer).host;
    let query =  qs.parse(req.url.substring(2));
    let oldState = query.state;
     query.state = Buffer.from(JSON.stringify({host, oldState})).toString('base64');
    res.writeHead(301, {Location: `https://id.bitpod.io/auth/connect/authorize?${qs.encode(query)}`});
    return res.end();
   // res.redirect('https://id.bitpod.io/auth/connect/authorize');
  }