export default function (ctx) {
  if (ctx.route.fullPath === `${ctx.$config.basePublicPath}/apps/help-center`) {
    ctx.redirect(
      301,
      `${ctx.$config.basePublicPath}/apps/help-center/introduction/quick-start`
    )
  }
}