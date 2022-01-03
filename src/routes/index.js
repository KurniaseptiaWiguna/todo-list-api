const express = require('express');
const {home} = require('../controllers/home')
const {addTodo, update, getAll, deleteTodo, getDetail} = require('../controllers/todo')
const router = express.Router();

router.get("/", home);
router.post("/add",addTodo);
router.get("/all", getAll);
router.get("/detail/:id", getDetail);
router.patch("/update/:id",update);
router.delete("/delete/:id", deleteTodo)
module.exports = router;