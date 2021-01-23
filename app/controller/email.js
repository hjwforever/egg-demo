'use strict';
const Controller = require('egg').Controller;
// const { addTask, getTask, signEmployee, getEmployee, assignEmployeeTask, getAssignTaskList } = require('./tasks')
const Task = require('./task');
const transporter = require('./emailTransporter');


class EmailController extends Controller {

  // 测试，获取任务列表
  async getEmployee() {
    const { ctx } = this;
    const { employeeId, taskId } = ctx.query;
    const assignTasks = Task.getAssignTaskList(employeeId, taskId);
    const tasks = assignTasks.map(task => Task.getTask(task.taskId));
    const email = Task.getEmployee(employeeId).email;
    const dates = tasks.map(task => task.timeline);

    ctx.body = {
      assignTasks,
      tasks,
      email,
      dates,
    };
  }

  // http://localhost:7001/send-email
  async sendEmail() {
    const { ctx } = this;
    const emails = [
      'hjwbelieve@gmail.com',
      'a981747967@163.com',
    ];
    const message = {
      from: 'hjwbelieve@foxmail.com',
      to: emails.join(','),
      img: 'https://img.alicdn.com/tfs/TB1PXMLa5_1gK0jSZFqXXcpaXXa-5000-2842.jpg',
      title: '前端艺术家沙龙 "前端职业成长" 专场',
      date: '2020-10-24',
      text: '第三届前端艺术家沙龙将于2020年10月24日以线上直播形式举办。由阿里巴巴ICBU深圳前端艺术家团队主办。本次大会我们将邀请行内知名讲师，与大家畅聊“前端职业成长”心得。',
    };

    // 方法一 直接构建发送内容
    // const sendHtml = `<div>
    //     <div style="border:1.0px soild #eeeeee; padding: 10px; max-width: 800px; margin: 0 auto;">
    //       <h1 style="text-align: center; font-size: 14px; font-weight: blod;">${message.title}</h1>
    //       <img style="margin-bottom: 10px; width: 100%;" src="${message.img}">
    //       <p> 时间：${message.date}</p>
    //       <p> 简介：${message.text}</p>
    //     </div>
    //     <div style="text-align: center; margin-top: 12px;">
    //       <p>邮件申明：此邮件由<strong>系统</strong>发送, 如有问题请联系管理员邮箱：${message.from} </p>
    //     </div>
    //   </div>`;

    // 方法二 模板引擎构建发送内容
    const sendHtml = await ctx.renderView('email/send-email.html', { message });

    const mailOptions = {
      from: message.from,
      to: message.to,
      subject: '测试邮件',
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

module.exports = EmailController;
