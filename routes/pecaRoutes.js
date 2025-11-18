import express from 'express';
import { PecaController } from '../controllers/pecaController.js';

const router = express.Router();

router.get('/', PecaController.listar);
router.get('/buscar', PecaController.buscarPorNome);
router.get('/:id', PecaController.buscarPorId);
router.post('/', PecaController.criar);
router.put('/:id', PecaController.atualizar);
router.delete('/:id', PecaController.deletar);


export default router;
