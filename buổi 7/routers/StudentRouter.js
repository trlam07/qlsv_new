const express = require('express');
const StudentController = require('../controllers/StudentController');
const router = express.Router();
router.get('/', StudentController.index);
router.get('/create', StudentController.create);
router.post('/store', StudentController.store);
router.get('/edit/:id', StudentController.edit);
router.post('/update', StudentController.update);
module.exports = router;