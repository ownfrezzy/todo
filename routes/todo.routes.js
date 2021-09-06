const express = require("express");
const router = express.Router();
const todoControllers = require("../controllers/todo.controllers");
/**
 * @swagger
 * definitions:
 *  Task:
 *   type: object
 *   properties:
 *     name:
 *       type: string
 *       description: Task name
 *       example: Buy potatoes
 *     active:
 *       type: boolean
 *       description: Task status
 *       example: true
 *  DeleteTask:
 *   type: object
 *   properties:
 *     id:
 *       type: string
 *       description: Task id
 *       example: 612558d0fe544a137cde0c45
 */
/**
 * @swagger
 * /api/todo:
 *  get:
 *    summary: Returns all tasks from db
 *    tags:
 *     - Todo
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get("/", async (req, res) => {
  try {
    const tasks = await todoControllers.getList();
    res.send(tasks);
  } catch (e) {
    console.log(e);
  }
});

/**
 * @swagger
 * /api/todo:
 *  post:
 *    summary: Waiting for an obj in body to add it as a new task
 *    tags:
 *     - Todo
 *    parameters:
 *    - name: New task
 *      description: Task object
 *      type: object
 *      in: body
 *      required: true
 *      schema:
 *        $ref: '#/definitions/Task'
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.post("/", async (req, res) => {
  try {
    const result = await todoControllers.addTask(req.body);
    res.send(result.ops[0]);
  } catch (e) {
    console.log(e);
  }
});

/**
 * @swagger
 * /api/todo:
 *  delete:
 *    summary: Delete a task with _id provided by obj in a body
 *    tags:
 *     - Todo
 *    parameters:
 *    - name: Task id
 *      description: Object with id of the task to delete
 *      type: object
 *      in: body
 *      required: true
 *      schema:
 *        $ref: '#/definitions/DeleteTask'
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.delete("/", async (req, res) => {
  try {
    const result = await todoControllers.deleteTask(req.body);
    const tasks = await todoControllers.getList();
    res.send(tasks);
  } catch (e) {
    console.log(e);
  }
});

/**
 * @swagger
 * /api/todo:
 *  patch:
 *    summary: Change status flag to true/false in task with _id provided by obj in body
 *    tags:
 *     - Todo
 *    parameters:
 *    - name: Task id
 *      description: Object with id of the task to change status
 *      type: object
 *      in: body
 *      required: true
 *      schema:
 *        $ref: '#/definitions/DeleteTask'
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.patch("/", async (req, res) => {
  const result = await todoControllers.updateStatus(req.body);
  res.send(result);
});

router.get('/task/:id', async (req,res) => {
  const result = await todoControllers.getTaskById(req.params.id);
  res.send(result)
})

module.exports = router;
