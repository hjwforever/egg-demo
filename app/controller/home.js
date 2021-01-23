'use strict';
// const mm = require('egg-mock');
// const assert = require('assert');
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const params = ctx.query;
    ctx.body = `<p>hi, ${params.name || 'egg'} !</p>`;
  }

  async home() {
    const { ctx } = this;
    const params = ctx.query;
    const result = {
      name: params.name || 'egg',
      title: 'EggServerDemo',
    };

    await ctx.render('home.html', result);
  }

  // news() {
  //   it('should schedule work fine', async () => {
  //     const app = mm.app();
  //     await app.ready();
  //     await app.runSchedule('news');
  //     assert(app.cache);

  //     const { ctx } = this;
  //     const params = ctx.query;
  //     ctx.body = `<p>hi, ${params.name || 'egg'} !</p>`;
  //   });
  // }
}


module.exports = HomeController;
