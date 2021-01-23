'use strict';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.home);
  router.get('/send-email', controller.email.sendEmail);
  router.get('/task-email', controller.tasks.sendTaskEmail); // 给员工发送任务提醒邮件， 参数列表为employeeId=1&taskId=1
  router.get('/assign-task', controller.tasks.assignTask); // 指派任务给某个员工,  参数列表为employeeId=1&taskId=2
  router.get('/get', controller.email.getEmployee);  // 测试，获取任务列表， 参数列表为employeeId=1&taskId=1
  // router.get('/news', controller.home.news);
};
