import qs from 'querystring';
export default function (req, res, next) {
  // req is the Node.js http request object
  console.log(req.url)

  //  let state = /[?&]+state=(\w+)[&]?/gi.exec(req.url)[1];
  let query = qs.parse(req.url.substring(2));
  if (!query.CBVerified) {
    let { state } = query;
    let stateObject;
    if (state) {
      let decodedState = Buffer.from(state, 'base64').toString("ascii");
      try {
        stateObject = JSON.parse(decodedState);
      } catch (err) {
        console.error("state is not a valid json");
        console.error("State : ", decodedState);
        return next();
      }
      let {host, oldState} = stateObject;
      query.CBVerified = true;
      query.state = oldState;
      console.log("redirecting to ",`https://${host}/callback?${qs.encode(query)}`);
      res.writeHead(301, { Location: `https://${host}/callback?${qs.encode(query)}` });
      return res.end();
    }
  }
  return next();
}