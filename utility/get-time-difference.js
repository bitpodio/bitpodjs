export default function timeAgo(dateParam) {
  const a = new Date()
  const b = new Date(dateParam)
  let c = a.getTime() - b.getTime()
  c /= 1000
  if (c < 1) {
    return 'just now'
  } else {
    c /= 60
    if (c < 1) {
      return 'few seconds ago'
    } else {
      c /= 60
      if (c < 1) {
        return Math.floor(c * 60) + ' minutes ago'
      } else {
        c /= 24
        if (c < 1) {
          return Math.floor(c * 24) + ' hours ago'
        } else {
          return Math.floor(c) + ' days ago'
        }
      }
    }
  }
}
