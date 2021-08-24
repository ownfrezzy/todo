const express = require("express");
const router = express.Router();
const todoControllers = require("../controllers/todo.controllers");

router.post("/addTask", async (req, res) => {
  try {
    const result = await todoControllers.addTask(req.body);
    res.send("New task successfully added");
  } catch (e) {
    console.log(e);
  }
});

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await todoControllers.getList();
    res.send(tasks);
  } catch (e) {
    console.log(e);
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const result = await todoControllers.deleteTask(req.body);
    res.send(result);
  } catch (e) {
    console.log(e);
  }
});

router.patch("/complete", async (req, res) => {
  const result = await todoControllers.completeTask(req.body);
  res.send(result);
});

module.exports = router;
