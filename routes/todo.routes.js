const express = require("express");
const router = express.Router();
const todoControllers = require("../controllers/todo.controllers");

/**
 * @swagger
 * /api/addTask:
 *  post:
 *    summary: Waiting for a json obj in body to add it as a new task
 *    tags:
 *     - Todo
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.post("/addTask", async (req, res) => {
  try {
    const result = await todoControllers.addTask(req.body);
    res.send("New task suc1essfully added");
  } catch (e) {
    console.log(e);
  }
});

/**
 * @swagger
 * /api/tasks:
 *  get:
 *    summary: Returns all tasks from db
 *    tags:
 *     - Todo
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await todoControllers.getList();
    res.send(tasks);
  } catch (e) {
    console.log(e);
  }
});

/**
 * @swagger
 * /api/delete:
 *  get:
 *    summary: Delete a task with _id provided by json obj in body
 *    tags:
 *     - Todo
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.delete("/delete", async (req, res) => {
  try {
    const result = await todoControllers.deleteTask(req.body);
    res.send(result);
  } catch (e) {
    console.log(e);
  }
});

/**
 * @swagger
 * /api/complete:
 *  patch:
 *    summary: Set active flag to false in task with _id provided by json obj in body
 *    tags:
 *     - Todo
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.patch("/complete", async (req, res) => {
  const result = await todoControllers.completeTask(req.body);
  res.send(result);
});

module.exports = router;
