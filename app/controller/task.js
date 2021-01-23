'use strict';
// 假设有如下员工列表
const employeeList = [{
  name: '张三',
  id: 1,
  email: 'hjwbelieve@gmail.com',
}, {
  name: '李四',
  id: 2,
  email: '10000@qq.com',
}];

// 假设有如下任务列表
const taskList = [{
  id: 1,
  task: '认真生活',
  timeline: '2021-12-30',
}, {
  id: 2,
  task: '快乐工作',
  timeline: '2021-02-30',
}];

const assignTaskList = [{
  employeeId: 1,
  taskId: 1,
  timeline: taskList[1].timeline,
}];

const signEmployee = async employee => {
  await employeeList.push({
    name: employee.name,
    id: employee.id,
    email: employee.email,
  });
};

const getEmployee = employeeId => {
  try {
    return employeeList[employeeId - 1];
  } catch (error) {
    return error;
  }
};

const addTask = async task => {
  await taskList.push({
    task: task.task,
    id: task.id,
    timeline: task.timeline,
  });
};

const getTask = taskId => {
  try {
    return taskList[taskId - 1];
  } catch (error) {
    return error;
  }
};

const assignEmployeeTask = ({ employeeId = Number, taskId = Number }) => {
  // if (employeeList[employeeId] && assignTaskList[taskId])
  try {
    assignTaskList.push({
      employeeId,
      taskId,
      timeline: taskList[taskId - 1].timeline,
    });
    console.log('assignTaskList更新', assignTaskList);
    return `成功指派 ${taskId} 号任务给员工 ${getEmployee(employeeId).name}`;
  } catch (error) {
    console.log('error', error);
    return error;
  }
};

const getAssignTaskList = (employeeId, taskId) => {
  try {
    return assignTaskList.filter(task => (task.employeeId === employeeId && task.taskId === taskId)
      || (task.employeeId.toString() === employeeId && task.taskId.toString() === taskId));
  } catch (error) {
    return error;
  }
};

const getAllAssignTaskList = () => {
  return assignTaskList.map(task => {
    employeeList[task.employeeId - 1].name;
    taskList[task.taskId - 1].task;
    taskList[task.taskId - 1].timeline;
  });
};

module.exports = {
  signEmployee,
  getEmployee,
  addTask,
  getTask,
  assignEmployeeTask,
  getAssignTaskList,
  getAllAssignTaskList,
};
