// eslint-disable-next-line strict
const Subscription = require('egg').Subscription;
const { getAllAssignTaskList } = require('../controller/task');
class Tasks extends Subscription {
  static get schedule() {
    return {
      interval: '24h', // 24 小时间隔
      type: 'worker', // 指定一个 worker 执行
    };
  }

  async subscribe() {
    const { ctx } = this;

    const taskList = getAllAssignTaskList();
    console.log('taskList', taskList);

    const res = await ctx.curl(process.env.webhookKey, {
      // dataType: 'json',
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      data:
      {
        msgtype: 'actionCard',
        actionCard: {
          title: '每日任务指派提醒',
          text: `列表如下：\n
           ${taskList.forEach(element => {
    `员工: ${element.name}\n 
     任务: ${element.task}\n
     截止日期: ${element.timeline}`;
  })}`,
          btnOrientation: '1',
          btns: [
            {
              title: '查看详情',
              actionURL: 'https://www.dingtalk.com/',
            },
          ],
        },
      },

    });
    this.ctx.app.cache = res.data;
    console.log(res.data);
  }
}

module.exports = Tasks;
