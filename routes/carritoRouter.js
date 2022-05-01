const express = require('express');
const router = express.Router();
const Carrito = require('../controllers/carritoFirebase');
const carrito = new Carrito();

router.post('/', async (req, res) => {
    const respuesta = await carrito.addCar();
    res.json(respuesta);
});

router.delete('/:id', async (req, res) => {
    if(isNaN(req.params.id)){
        res.send('ERROR: Por favor ingrese un numero!!');
    }else{
        const respuesta = await carrito.deleteCar(req.params.id);
        res.send(respuesta);
    }
});

router.get('/:id', async (req, res) => {
    if(isNaN(req.params.id)){
        res.send('ERROR: Por favor ingrese un numero!!');
    }else{
        const data = await carrito.getCar(req.params.id);
        res.send(data);
    }
});

router.post('/:idCar/:idProduct', async (req, res) => {
    const idCar = parseInt(req.params.idCar);
    const idProduct = parseInt(req.params.idProduct);
    const respuesta = await carrito.addProductCar(idCar,idProduct);
    res.send(respuesta);
});

router.delete('/:idCar/:idProduct', async (req, res) => {
    const idCar = parseInt(req.params.idCar);
    const idProduct = parseInt(req.params.idProduct);
    const respuesta = await carrito.deleteProductCar(idCar,idProduct);
    res.send(respuesta);
});

module.exports = router;