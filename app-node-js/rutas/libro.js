const {Router} = require ('express');
const router = Router();
const Libro = require('../modelos/Libro');

// GET http://localhost:4000/libro/listar
router.get('/listar', async function(req, res) {
    try {
        const libro = await Libro.find();
        res.send(libro);
    } catch (error) {
       console.log(error);
       res.status(500).send('Ocurrio un error en el servidor');
    }
});


// POST http://localhost:4000/libro/guardar
router.post('/guardar', async function(req, res){

    try{
        let libro = new EstadoEquipo();
        libro.isbn = req.body.isbn;
        libro.titulo = req.body.titulo;
        libro.autor = req.body.autor;
        libro.editorial = req.body.editorial;
        libro.n_paginas = req.body.n_paginas;
        libro.formato = req.body.formato;
        libro.categoria = req.body.categoria;

        libro = await libro.save();

        res.send(libro);
    }catch(error){
        console.log(error)
        res.send('Ocurrio un error');
    }
});


// PUT http://localhost:4000/libro/editar/id
router.put('/editar/:libroId', async function(req, res){

    try{
        console.log('Objeto recibido', req.body, req.params.libroId);

        libro = await Libro.findById(req.params.libroId);

        if(!libro){
            return res.send("El libro ingresado no existe");
        }
        
        const libro = await Libro.findOne({nombre: req.body.titulo, 
        _id: {$ne: libro._id}});

        if(libro){
            return res.send('El libro ingresado ya existe')
        }

        libro.isbn = req.body.isbn;
        libro.titulo = req.body.titulo;
        libro.autor = req.body.autor;
        libro.editorial = req.body.editorial;
        libro.n_paginas = req.body.n_paginas;
        libro.formato = req.body.formato;
        libro.categoria = req.body.categoria;
        // guardamos
        libro = await libro.save();
        res.send(libro);
        } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error en servidor');
        }
});

// GET http://localhost:4000/libro/id
router.get('/:libroId', async function (req, res) {
    try {
      const libro = await Libro.findById(req.params.libroId);
      if (!libro) {
        return res.status(404).send("El libro no existe");
      }
      res.send(libro);
    } catch (error) {
      console.log(error);
      res.status(500).send("Ocurrio un error al consultar libro por Id");
    }
  });


module.exports = router;