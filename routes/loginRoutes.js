import express from "express";
import { verificaJWT } from "../middleware/authMiddleware.js";
import { loginController } from "../controllers/loginController.js";
import { userController } from "../controllers/userController.js";
import { proprietarioController } from "../controllers/proprietarioController.js";
import { veiculoController } from "../controllers/veiculoController.js";

const router = express.Router();

router.post("/login", loginController.login);

router.post("/usuarios", verificaJWT, userController.create);
router.get("/usuarios", verificaJWT, userController.getAll);
router.put("/usuarios/:id", verificaJWT, userController.update);
router.delete("/usuarios/:id", verificaJWT, userController.delete);

router.post("/proprietarios", verificaJWT, proprietarioController.create);
router.get("/proprietarios", verificaJWT, proprietarioController.getAll);
router.put("/proprietarios/:id", verificaJWT, proprietarioController.update);
router.delete("/proprietarios/:id", verificaJWT, proprietarioController.delete);

router.post("/veiculos", verificaJWT, veiculoController.create);
router.get("/veiculos", verificaJWT, veiculoController.getAll);
router.put("/veiculos/:id", verificaJWT, veiculoController.update);
router.delete("/veiculos/:id", verificaJWT, veiculoController.delete);

export default router;
