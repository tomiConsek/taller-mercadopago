const express = require('express');
const router = express.Router();

const indexController = require("../controllers/indexController");

/* GET home page. */
router.get('/', indexController.home);

/* GET detail page */
router.get('/detail', indexController.detail);

/* Post /comprar */
router.post('/comprar', indexController.comprar)

/* Checkout pagos */
router.get('/callback', indexController.callback);

/* notificaciones */
router.post('/notifications', indexController.notifications);

module.exports = router;
