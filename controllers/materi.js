
const db = require("../models");
const materi = require("../models/materi");
const Materi = db.materi; 
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images');
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const name = Date.now().toString();
        cb(null, name + ext);
    }
});

const upload = multer({ storage: storage }).single('image');


exports.create = async(req,res) => {

    try { 
        upload(req, res, async function(err) {
            if (err) {
                return res.status(500).json({
                    message: err.message,
                    data: null
                });
            }
            
            const image = req.file;
            const path = image.path;
            const imagePath = path.replace(/\\/g, '/');
            const imageUrl = `${req.protocol}://${req.get('host')}/${imagePath}`;
            
            // Membuat objek untuk menyimpan data materi
            const materiData = {
                materi : req.body.materi,
                point_materi : req.body.point_materi,
                categoryID : req.body.categoryID,
                image : imageUrl
            }
    
            const data = await Materi.create(materiData);
            res.json({ 
                message: "Materi created successfully",
                data: data, 
            });
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "data eror" , 
            data : null,
        });
    } 
}


exports.getAll = async(req,res) => { 

    try {
        const data = await Materi.findAll() 
        res.json({
            message: "Materi retrieved succesfully",
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
        const data = await Materi.findByPk(id, {rejectOnEmpty: true}) 
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
        const data = await Materi.findByPk(id, {rejectOnEmpty: true})

        data.destroy() 

        res.json({
            message: "materi deleted succesfully",
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
        const data = await Materi.findByPk(id, {rejectOnEmpty: true}) 
        res.json({
            message: `Materi retrieved succesfully woth id=${id}.`,
            data: data, 
        })
    } catch (error) {
        res.status(500).json({
            message: error.message || "some error occured while retrieving Materi", 
            data : null,
        });
    }
};

exports.findKategoriId = async(req,res) => {
    const id = req.params.id
    try {
        const data = await Materi.findAll({ where: { kategoriId: id } });
        res.json({
            message: `Materi retrieved succesfully woth id=${id}.`,
            data: data, 
        })
    } catch (error) {
        res.status(500).json({
            message: error.message || "some error occured while retrieving Materi", 
            data : null,
        });
    }
};

