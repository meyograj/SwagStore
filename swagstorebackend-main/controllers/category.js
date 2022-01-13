const Category = require("../models/category");

exports.getCategoryById = (req,res,next,id) => {
    Category.findById(id).exec((err,cate) => {
        if(err){
            return res.status(400).json({
                error: "category is not present in the DB"
            })
        }
        req.category = cate;
        next();
    });
};

exports.createCategory = (req,res) => {
    const category = new Category(req.body);
    category.save((err,category) => {
        if(err){
            return res.status(400).json({
                error: "not able to create Category in DB"
            })
        }
        res.json({category});
    })
}

exports.getCategory = (req,res) => {
    return res.json(req.category);
}

exports.getAllCategory = (req,res) => {
    Category.find().exec((err,categories) => {
        if(err || !categories){
            return res.status(400).json({
                error: "No category found"
            })
        }
        res.json(categories);
    })
}

exports.updateCategory = (req,res) => {
    const category = req.category;
    // console.log(req.body);
    category.name = req.body.name;

    category.save((err,updatedCategory) => {
        if(err){
            return res.status(400).json({
                error: "Not able to update the category"
            })
        }
        res.json(updatedCategory);
    });
};


exports.removeCategory = (req,res) => {
    const category = req.category;

    category.remove((err,category) => {
        if(err){
            return res.status(400).json({
                error: "Failed to Delete this actegory"
            })
        }
        res.json({
            message: "category is succesfully deleted"
        })
    })
}