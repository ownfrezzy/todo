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
      const todo = db.collection("todo").deleteOne({ _id: ObjectId(body.id) });
      res("deleted");
    });
  }

  updateStatus(body) {
    return new Promise((res, rej) => {
      const todo = db.collection("todo");
      todo.find({ _id: ObjectId(body.id) }).toArray((err, result) => {
        if (err) throw err;
        else {
          result.map((x) => {
            x.active
              ? todo.updateOne(
                  { _id: ObjectId(body.id) },
                  { $set: { active: false } }
                )
              : todo.updateOne(
                  { _id: ObjectId(body.id) },
                  { $set: { active: true } }
                );
          });
        }
      });
      res("Succesfully updated");
    });
  }
}

module.exports = new todoServices();
