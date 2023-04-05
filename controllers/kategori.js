
const db = require("../models");
const kategori = require("../models/kategori");
const Kategori = db.kategori; 


exports.create = async(req,res) => {

    try { 
        const data = await Kategori.create(req.body) 
        res.json({ 
            message: "Kategori created succesfully",
            data: data, 
        })
    } catch (error) {
        res.status(500).json({
            message: error.message || "data eror" , 
            data : null,
        });
    } 
}


exports.getAll = async(req,res) => { 

    try {
        const data = await Kategori.findAll() 
        res.json({
            message: "Kategori retrieved succesfully",
            data: data ,
        })
    } catch (error) {
        res.status(500).json({
            message: error.message , 
            data : null,
        });
    }
};


exports.update = async(req,res) => { 
    const id = req.params.id 
    try {
        const data = await Kategori.findByPk(id, {rejectOnEmpty: true}) 
        data.update(req.body, { 
            where:{id}
        })
        res.json({
            message: "data  berhasil dirubah",
            data: data,
        })
    } catch (error) {
        res.status(500).json({
            message: error.message|| "some error occured while retrieving quiz", 
            data : null,
        });
    }
}


exports.delete = async(req,res) => {
    const id = req.params.id
    try {
        const data = await Kategori.findByPk(id, {rejectOnEmpty: true})

        data.destroy() 

        res.json({
            message: "Kategori deleted succesfully",
        })
    } catch (error) {
        res.status(500).json({
            message: error.message || "some error occured while retrieving quiz", 
            data : null,
        });
    }
}


exports.findOne = async(req,res) => {
    const id = req.params.id
    try {
        const data = await Kategori.findByPk(id, {rejectOnEmpty: true}) 
        res.json({
            message: `Kategori retrieved succesfully woth id=${id}.`,
            data: data, 
        })
    } catch (error) {
        res.status(500).json({
            message: error.message || "some error occured while retrieving Kategori", 
            data : null,
        });
    }
};
