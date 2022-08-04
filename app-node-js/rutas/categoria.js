const {Router} = require ('express');
const router = Router();
const Categoria = require('../modelos/Categoria');

// GET http://localhost:4000/categoria/listar
router.get('/listar', async function(req, res) {
    try {
        const categoria = await Categoria.find();
        res.send(categoria);
    } catch (error) {
       console.log(error);
       res.status(500).send('Ocurrio un error en el servidor');
    }
});

// POST http://localhost:4000/categoria/guardar
router.post('/guardar', async function(req, res){

    try{
        let categoria = new Categoria();
        categoria.nombre = req.body.nombre;
        categoria.id = req.body.id;

        categoria = await categoria.save();

        res.send(categoria);
    }catch(error){
        console.log(error)
        res.send('Ocurrio un error al guardar la categoria');
    }
    
});

// PUT http://localhost:4000/categoria/editar/id
router.put('/editar/:categoriaId', async function(req, res){

    try{
        console.log('Objeto recibido', req.body, req.params.categoriaId);

        let categoria = await Categoria.findById(req.params.categoriaId);

        if(!categoria){
            return res.send("La categoria ingresada no existe");
        }
        
        const existeCategoria = await Categoria.findOne({nombre: req.body.nombre, 
        _id: {$ne: categoria._id}});

        if(categoria){
            return res.send('La categoria ingresada ya existe')
        }

        categoria.nombre = req.body.nombre;
        categoria.id = req.body.id
        // guardamos
        categoria = await categoria.save();
        res.send(categoria);
        } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error en el servidor');
        }
});

// GET http://localhost:4000/tipoEquipo/id
router.get('/:categoriaId', async function (req, res) {
    try {
      const categoria = await Categoria.findById(req.params.categoriaId);
      if (!categoria) {
        return res.status(404).send("La categoria no existe");
      }
      res.send(categoria);
    } catch (error) {
      console.log(error);
      res.status(500).send("Ocurrio un error al consultar la categoria por Id");
    }
  });

module.exports = router;