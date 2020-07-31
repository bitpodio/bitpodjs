import qs from 'querystring';
import url from 'url';
import nuxtconfig from '../nuxt.config';
export default function (req, res, next) {
    let referer = req.headers.referer
    if(! referer){
        return next();
    }
    let host = url.parse(referer).host;
    let query =  qs.parse(req.url.substring(2));
    let oldState = query.state;
     query.state = Buffer.from(JSON.stringify({host, oldState})).toString('base64');
    res.writeHead(301, {Location: `${nuxtconfig.auth.strategies.bitpod.authorization}?${qs.encode(query)}`});
    return res.end();
  }