const express = require('express');
const router = express.Router();
const Productos = require('../controllers/productosMongo');
const productos = new Productos();

// cambiar a false para quitar permisos de admin a las peticiones y viceversa
const admin = true;

router.post('/',(req, res, next) => {
        if (admin === true){
            next();
        }else{
            res.send('Lo sentimos, no tienes permisos para la ruta /api/productos metodo "Agregar producto"');
        }
    },
    async (req, res) => {
        const respuesta = await productos.addProduct(req.body);
        res.send(respuesta);
});

router.get('/', async (req, res) => {
    const data = await productos.listAll();
    res.send(data);
});

router.get('/:id',async (req, res) => {
    if(isNaN(req.params.id)){
        res.send('ERROR: Por favor ingrese un numero!!');
    }else{
        const data = await productos.listById(req.params.id);
        res.send(data);
    }
});

router.put('/',(req, res, next) => {
        if (admin === true){
            next();
        }else{
            res.send('Lo sentimos, no tienes permisos para la ruta /api/productos metodo "Editar producto"');
        }
    },
    async (req, res) => {
        const respuesta = await productos.editProduct(req.body);
        res.send(respuesta);
});

router.delete('/:id',(req, res, next) => {
        if (admin === true){
            next();
        }else{
            res.send('Lo sentimos, no tienes permisos para la ruta /api/productos metodo "Eliminar producto"');
        }
    },
    async (req, res) => {
    if(isNaN(req.params.id)){
        res.send('ERROR: Por favor ingrese un numero!!');
    }else{
        const respuesta = await productos.deleteProduct(req.params.id);
        res.send(respuesta);
    }
});

module.exports = router;