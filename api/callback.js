import qs from 'querystring';
export default function (req, res, next) {

  let query = qs.parse(req.url.substring(2));
  if (!query.cbVerified) {
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
      query.cbVerified = true;
      query.state = oldState;
      res.writeHead(301, { Location: `https://${host}/callback?${qs.encode(query)}` });
      return res.end();
    }
  }
  return next();
}