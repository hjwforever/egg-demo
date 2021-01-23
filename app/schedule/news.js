// eslint-disable-next-line strict
const Subscription = require('egg').Subscription;

// https://oapi.dingtalk.com/robot/send?access_token=4dd7bf9c236b3fc9f5d40c785b165e217ab95e2d13bb0a612c1213d2556774ba
class News extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      interval: '30m', // 30分钟间隔
      // 每3小时准点执行一次
      // corn: '0 0 */3 * * *'
      // *    *    *    *    *    *
      // ┬    ┬    ┬    ┬    ┬    ┬
      // │    │    │    │    │    |
      // │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
      // │    │    │    │    └───── month (1 - 12)
      // │    │    │    └────────── day of month (1 - 31)
      // │    │    └─────────────── hour (0 - 23)
      // │    └──────────────────── minute (0 - 59)
      // └───────────────────────── second (0 - 59, optional)
      type: 'worker', // 指定一个 worker 执行
    };
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    const { ctx } = this;
    // 获取新闻头条
    const headNews = [{
      title: '钉钉开放平台技术沙龙（北京站）',
      text: `钉钉开放平台将于2020年10月13日（星期二）在北京市朝阳区宏泰东街阿里望京A座 20F-02九华山庄会议室举办钉钉开发者技术沙龙，
             欢迎报名参加：https://ding.fanqier.cn/f/r3rh72kf
             会议议程：... 
             一人报名仅一人生效，多人参会请每个人分别报名。
             感谢您的参与！`,
      messageUrl: 'https://www.dingtalk.com/',
      picUrl: 'https://vdposter.bdstatic.com/32890b6a5ff9661655096dc55efb62d3.jpeg?x-bce-process=image/resize,m_fill,w_242,h_182/format,f_jpg/quality,Q_100',
    }];

    // 获取新闻列表
    // const messages = [
    //   ...headNews,
    //   {
    //     title: '新闻标题2',
    //     text: '新闻内容2',
    //     messageUrl: '新闻链接2',
    //     picUrl: '图片链接2',
    //   },
    //   {
    //     title: '新闻标题3',
    //     text: '新闻内容3',
    //     messageUrl: '新闻链接3',
    //     picUrl: '图片链接3',
    //   },
    // ];

    const res = await ctx.curl('https://oapi.dingtalk.com/robot/send?access_token=4dd7bf9c236b3fc9f5d40c785b165e217ab95e2d13bb0a612c1213d2556774ba', {
      // dataType: 'json',
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      data:
      // {
      //   'msgType': 'feedCard',
      //   'feedCard': {
      //     'links': messages,
      //   },
      // },
      {
        msgtype: 'actionCard',
        actionCard: {
          title: `我【今日头条】 ${headNews[0].title}`,
          text: `![screenshot](${headNews[0].picUrl})
          \n # ${headNews[0].title}
          \n ${headNews[0].text}`,
          btnOrientation: '1',
          btns: [
            {
              title: '阅读全文',
              actionURL: `${headNews[0].messageUrl}`,
            },
            // {
            //   title: '内容不错',
            //   actionURL: `${headNews[0].messageUrl}`,
            // },
            // {
            //   title: '不感兴趣',
            //   actionURL: `${headNews[0].messageUrl}`,
            // },
          ],
        },
      },

    });
    this.ctx.app.cache = res.data;
    console.log(res.data);
  }
}

module.exports = News;
