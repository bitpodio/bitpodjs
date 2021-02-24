export default function (ctx) {
  if (ctx.route.fullPath === '/apps/help-center') {
    ctx.redirect(301, `/apps/help-center/introduction/quick-start`)
  }
}
