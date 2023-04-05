const materiController = require ('../controllers/materi'); //untuk menghubungkan route dengan controller 
const router = require('express').Router();

router.post('/', materiController.create);
router.get('/', materiController.getAll);
router.get('/kategori/:id', materiController.findKategoriId);
router.get('/:id', materiController.findOne);
router.put('/:id', materiController.update);
router.delete('/:id', materiController.delete);

module.exports = router; 