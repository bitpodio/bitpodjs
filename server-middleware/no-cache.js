export default function (req, res, next) {
  if (
    req.url === '/apps/event/eventboard' ||
    req.url.includes('/apps/help-center/')
  ) {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
    res.setHeader('Pragma', 'no-cache')
    res.setHeader('Expires', '0')
  }
  next()
}
