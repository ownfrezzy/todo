const mongoose = require("mongoose");
const db = mongoose.connection;
const { ObjectId } = require("mongodb");

class todoServices {
  addTask(data) {
    return new Promise((res, rej) => {
      const tasks = db.collection("todo");
      res(tasks.insertOne(data));
    });
  }
  getList() {
    return new Promise((res, rej) => {
      const tasks = db
        .collection("todo")
        .find()
        .toArray((err, result) => {
          if (err) throw err;
          res(result);
        });
    });
  }

  deleteTask(body) {
    return new Promise((res, rej) => {
      const todo = db.collection("todo").deleteOne({ name: body.name });
      res("deleted");
    });
  }
  completeTask(body) {
    return new Promise((res, rej) => {
      const todo = db.collection("todo");
      todo.updateOne({ name: body.name }, { $set: { active: false } });
      res("Successfully updated");
    });
  }
}

module.exports = new todoServices();
