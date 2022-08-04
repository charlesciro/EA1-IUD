const {Router} = require ('express');
const router = Router();
const Ejemplar = require('../modelos/Ejemplar');

// GET http://localhost:4000/ejemplar/listar
router.get('/listar', async function(req, res) {
    try {
        const ejemplares = await Ejemplar.find();
        res.send(ejemplares);
    } catch (error) {
       console.log(error);
       res.status(500).send('Ocurrio un error en servidor');
    }
});

// POST http://localhost:4000/ejemplar/guardar
router.post('/guardar', async function(req, res){

    try{
        console.log(req.body);
        
        const validarExistenciaEjemplar = await Ejemplar.findOne({nombre: req.body.id});
        
        if(validarExistenciaEjemplar){
            return res.send('La marca ingresada ya existe');
        }


        let ejemplar = new Ejemplar();
        ejemplar.id = req.body.id;
        ejemplar.n_edicion = req.body.n_edicion;
        ejemplar.libro = req.body.libro;
 

        libro = await libro.save();

        res.send(libro);
    }catch(error){
        console.log(error)
        res.send('Ocurrio un error');
    }

    
    
});

// PUT http://localhost:4000/ejemplar/editar/id
router.put('/editar/:ejemplarId', async function(req, res){

    try{
        console.log('Objeto recibido', req.body, req.params.ejemplarId);

        let ejemplar = await Ejemplar.findById(req.params.ejemplarId);

        if(!ejemplar){
            return res.send("El ejemplar ingresado no existe");
        }
        
        const existeEjemplar = await Ejemplar.findOne({nombre: req.body.id, 
        _id: {$ne: ejemplar._id}});

        if(existeEjemplar){
            return res.send('El ejemplar ya existe')
        }

        ejemplar.id = req.body.id;
        ejemplar.n_edicion = req.body.n_edicion;
        ejemplar.libro = req.body.libro._id;

        // guardamos
        ejemplar = await ejemplar.save();
        res.send(ejemplar);
        } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error en servidor');
        }
});

// GET http://localhost:4000/ejemplar/id
router.get('/:ejemplarId', async function (req, res) {
    try {
      const ejemplar = await Ejemplar.findById(req.params.ejemplarId);
      if (!ejemplar) {
        return res.status(404).send("El ejemplar no existe");
      }
      res.send(ejemplar);
    } catch (error) {
      console.log(error);
      res.status(500).send("Ocurrio un error al consultar ejemplar por Id");
    }
  });

module.exports = router;