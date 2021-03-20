import { Router } from 'express';
import CategoriaController from './controllers/CategoriaController';
import CadastroController from './controllers/CadastroController';
import BandaController from './controllers/BandaController';
import CantorController from './controllers/CantorController';
import EmpresaController from './controllers/EmpresaController';
import AgendaController from './controllers/AgendaController';
import LinkvideoController from './controllers/LinkvideoController';
import RedesocialController from './controllers/RedesocialController';
import ReleaseController from './controllers/ReleaseController';
import UsuarioController from './controllers/UsuarioController';

import verificaAutenticacao from './middlewares/verificaAutenticacao';

const routes = Router();

routes.get('/categoria', CategoriaController.index);
routes.get('/cadastroEdita/:id', CadastroController.show);
routes.get('/cadastroListaLocais/', CadastroController.listaLocais);
routes.get('/cadastroListaLocais/:idcategoria', CadastroController.listaLocaisCategoria);

routes.use(verificaAutenticacao);

routes.post('/categoria', CategoriaController.create);
routes.get('/categoria/:id', CategoriaController.show);
routes.put('/categoria/:id', CategoriaController.update);
routes.delete('/categoria/:id', CategoriaController.delete);

routes.post('/usuario', UsuarioController.create);
routes.get('/usuario', UsuarioController.index);
routes.get('/usuario/:idusuario', UsuarioController.show);
routes.delete('/usuario/:id', CadastroController.delete);

routes.post('/cadastro', CadastroController.create);
routes.get('/cadastro/:idusuario', CadastroController.index);
routes.put('/cadastroCordenadas/', CadastroController.salvarCordenadas);
routes.delete('/cadastro/:id', CadastroController.delete);

routes.post('/banda', BandaController.create);
routes.get('/banda/:idcadastro', BandaController.show);
routes.put('/banda/', BandaController.update);

routes.post('/cantor', CantorController.create);
routes.get('/cantor/:idcadastro', CantorController.show);
routes.put('/cantor/:id', CantorController.update);

routes.post('/agenda', AgendaController.create);
routes.get('/agenda/:idcadastro', AgendaController.show);

routes.post('/empresa', EmpresaController.create);
routes.get('/empresa/:id', EmpresaController.show);
routes.put('/empresa/:id', EmpresaController.update);

routes.post('/linkvideo', LinkvideoController.create);
routes.get('/linkvideo/:idcadastro', LinkvideoController.show);

routes.post('/redesocial', RedesocialController.create);
routes.get('/redesocial/:idcadastro', RedesocialController.show);

routes.post('/release', ReleaseController.create);
routes.get('/release/:idcadastro', ReleaseController.show);

export default routes;