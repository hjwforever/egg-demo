'use strict';
const Controller = require('egg').Controller;
const Task = require('./task');
const { transporter } = require('./email');
class TasksController extends Controller {
  // 指派任务给员工， GET ， 接受参数 employeeId, taskId
  async assignTask() {
    const { ctx } = this;
    const { employeeId, taskId } = ctx.query;
    console.log(ctx.query);
    const result = await Task.assignEmployeeTask({ employeeId, taskId });

    // 发送邮件
    this.sendTaskEmail;

    ctx.body = result;
  }

  // 给员工发送任务信息
  async sendTaskEmail() {
    const { ctx } = this;
    const { employeeId, taskId } = ctx.query;

    const assignTasks = Task.getAssignTaskList(employeeId, taskId);
    const tasks = assignTasks.map(task => Task.getTask(task.taskId));
    const email = Task.getEmployee(employeeId).email;
    const dates = tasks.map(task => task.timeline);

    const message = {
      from: 'hjwbelieve@foxmail.com',
      to: email,
      img: 'https://img.alicdn.com/tfs/TB1PXMLa5_1gK0jSZFqXXcpaXXa-5000-2842.jpg',
      title: '任务指派邮件提醒',
      date: dates[0],
      text: tasks[0].task,
    };

    // 模板引擎构建发送内容
    const sendHtml = await ctx.renderView('email/send-email.html', { message });

    const mailOptions = {
      from: message.from,
      to: message.to,
      subject: '任务指派邮件提醒',
      // 以html格式显示， 可以显示图片，连接，字体颜色等
      html: sendHtml,
    };

    // 发送邮件
    try {
      const result = await transporter.sendMail(mailOptions);
      ctx.logger.info('===send email result===', result);
    } catch (error) {
      ctx.body = error;
      return;
    }
    ctx.body = sendHtml;
  }
}


module.exports = TasksController;
