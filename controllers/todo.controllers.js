const todoService = require("../services/todo.services");

class todoController {
  async addTask(data) {
    const result = await todoService.addTask(data);
    return result;
  }
  async deleteTask(body) {
    const result = await todoService.deleteTask(body);
    return result;
  }
  async getList() {
    const tasks = await todoService.getList();
    return tasks;
  }
  async completeTask(body) {
    const result = await todoService.completeTask(body);
    return result;
  }
}

module.exports = new todoController();
