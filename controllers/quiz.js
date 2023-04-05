
const db = require("../models");
const quiz = require("../models/quiz");
const multer = require('multer');
const Quiz = db.quizzes; 
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
            
            // Membuat objek untuk menyimpan data quiz
            const quizData = {
                
                quiz : req.body.quiz,
                a : req.body.a,
                b : req.body.b,
                c: req.body.c,
                d : req.body.d,
                key : req.body.key,
                categoryID : req.body.categoryID,
                image : imageUrl
            }
    
            const data = await Quiz.create(quizData);
            res.json({ 
                message: "quiz created successfully",
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
        const quizzes = await Quiz.findAll() 
        res.json({
            message: "Quizzez retrieved succesfully",
            data: quizzes,
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
        const quiz = await Quiz.findByPk(id, {rejectOnEmpty: true}) 
        quiz.update(req.body, { 
            where:{id}
        })
        res.json({
            message: "data  berhasil dirubah",
            data: quiz,
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
        const quiz = await Quiz.findByPk(id, {rejectOnEmpty: true})

        quiz.destroy() 

        res.json({
            message: "quiz deleted succesfully",
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
        const quiz = await Quiz.findByPk(id, {rejectOnEmpty: true}) 
        res.json({
            message: `Quizzes retrieved succesfully woth id=${id}.`,
            data: quiz, 
        })
    } catch (error) {
        res.status(500).json({
            message: error.message || "some error occured while retrieving quiz", 
            data : null,
        });
    }
};


exports.getByCategoryId = async(req,res) => {
    const id = req.params.id 
    const quizzes = await Quiz.findAll({ 
        where : {
            categoryID: id 
        }
    })
        res.json({
            message: `Quizzes retrieved succesfully woth id=${id}.`,
            data: quizzes, 
        });
}