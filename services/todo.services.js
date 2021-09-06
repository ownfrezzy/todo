const mongoose = require("mongoose");
const db = mongoose.connection;
const { ObjectId } = require("mongodb");

class todoServices {
  addTask(data) {
    return new Promise(async (res, rej) => {
      const tasks = await db.collection("todo").insertOne(data);
      // const task = await db.collection('todo').findOne({name: data.name})
      res(tasks);
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
      const todo = db.collection("todo").deleteOne({ _id: ObjectId(body.id) });
      res('Successfully deleted');
    });
  }
  updateStatus(body) {
    return new Promise(async (res, rej) => {
      const todo = db.collection("todo");
      const task = await todo.findOne({ _id: ObjectId(body.id) });
      todo.updateOne(
        { _id: ObjectId(body.id) },
        { $set: { active: !task.active } }
      );
      const newTask = {...task, active: !task.active};
/*       for (let key in task) {
        key == 'active' ? newTask[key] = !task[key] : newTask[key] = task[key]
      } */
      res(newTask);
    });
  }
  getTaskById(body) {
    return new Promise((res, rej) => {
      const todo = db.collection("todo");
      todo.find({ _id: ObjectId(body) }).toArray((err, result) => {
        if (err) throw err;
        else {
          res(result);
        }
      });
    });
  }
}

module.exports = new todoServices();
