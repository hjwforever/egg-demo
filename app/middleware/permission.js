// eslint-disable-next-line strict
module.exports = options => {
  return async function permission(ctx, next) {
    await next();
    const params = ctx.query;
    const blackList = options.blackList || [];
    ctx.logger.info('blackList', blackList);
    ctx.logger.info('options', options);
    if (blackList.indexOf(params.name) > -1) {
      ctx.body = {
        code: 403,
        success: false,
        msg: '无权限',
      };
      ctx.status = 403;
    }
  };
};
