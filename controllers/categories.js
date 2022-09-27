const {Category} = require('../models');

const getAllCategories = async (res) => {
    console.log("controlador");
    const rta = await Category.findAll({
        attributes: ['id', 'name'] 
    });

    res.send(rta);
}

const deleteCategory = async (req, res) => {
    const {id} = req.params;

    const categoryExist = await Category.findOne({attributes: ['id', 'name', 'description'], where: {id: id}});

    if(categoryExist){
        await Category.destroy({where: {id: id}});
        res.send(categoryExist);
    }else{
        res.send('category id does not exist.');
    }
}

const updateCategory = async (req, res) =>{
    const {id} = req.params;
    const {name, description} = req.body;

    const categoryExist = await Category.findOne({attributes: ['id'], where: {id: id}});

    if(categoryExist){
        await Category.update({name: name, description: description}, {where: {id: id}});
        const categoryUpdated = await Category.findOne({attributes: ['id', 'name', 'description'], where: {id: id}});
        res.send(categoryUpdated);
    }else{
        res.send('category id does not exist.');
    }
}
    
const addCategory = async (req, res) => {
    const {name, description} = req.body;

    if(name && typeof(name) === 'string'){
        const result = await Category.create({name: name, description: description});
        res.status(201).send(result);
    }else{
        res.send('Please indicate the name of the category.');
    }
}

module.exports = {
    getAllCategories,
    updateCategory,
    addCategory,
    deleteCategory
}