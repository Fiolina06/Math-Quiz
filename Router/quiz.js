const quizController = require ('../controllers/quiz'); //untuk menghubungkan route dengan controller 
const router = require('express').Router();

router.post('/', quizController.create);
router.get('/', quizController.getAll);
router.get('/:id', quizController.findOne);
router.put('/:id', quizController.update);
router.delete('/:id', quizController.delete);
router.get('/kategori/:id', quizController.getByCategoryId);


module.exports = router; 