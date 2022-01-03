const {todo} = require('../../models')
const Sequelize = require('sequelize');
const Fn = Sequelize.fn;
const Col = Sequelize.col;
exports.addTodo = async(req,res) => {
    try {
        const newTodo = await todo.create({
            name: req.body.name,
            due: req.body.due,
            status: "not-done"
        })
        let data = await todo.findOne({
            where: {
                id: newTodo.id
            }
        })
        res.send(200,{
            status: "success",
            data:data
        })
    } catch (error) {
        console.log(error)
    }
}
exports.update = async(req, res) => {
    const id = req.params.id;
   try {
    const newData = await todo.update(req.body,{
        where: {
            id,
        }
    });
    const data = await todo.findOne({
        where:{
            id: id,
        }
    });
    res.send(200, {
        status:"success",
        data:data
    })
   } catch (error) {
       console.log(error)
   }
    
}
exports.getAll = async(req, res) => {
    try {
        const data = await todo.findAll({
            // order:[['due', 'DESC']]
            attributes: [
                "id",
                "name",
                "due",
                "status",
                [ Fn('DATE', Col('due')), 'date'],
                [ Fn('TIME', Col('due')), 'time']]
            ,
        })
        res.send({
            data:data
        })
    } catch (error) {
        console.log(error)
    }
}
exports.getDetail = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await todo.findOne({
            where: {
                id
            }
        })
        res.send(200, {
            data: data
        })
    } catch (error) {
        res.send(500,{
            message: error
        })
        console.log(error)
    }
}
exports.deleteTodo = async(req, res) => {
    const id = req.params.id;
    try {
        console.log(id)
        await todo.destroy({
            where: {
                id
            }
        })
        res.send(200,{
            status:"success"
        })
    } catch (error) {
        res.send(500,{
            status:"failed"
        })
        console.log(error)
    }
}