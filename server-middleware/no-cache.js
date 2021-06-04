export default function (req, res, next) {
  const noCacheUrls = ['/apps/event/eventboard', '/get-started']
  if (noCacheUrls.includes(req.url)) {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
    res.setHeader('Pragma', 'no-cache')
    res.setHeader('Expires', '0')
  }
  next()
}
