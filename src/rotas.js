const express = require('express');
const verificarEmail = require('./filtros/duplicidade');
const { cadastrarUsuario, loginUsuario, editarUsuario, detalharUsuario } = require('./controladores/usuarios');
const listarCategorias = require('./controladores/categorias');
const validarCampos = require('./filtros/verificarCampos');
const verificaLogin = require('./filtros/verificaLogin');

const rotas = express();

rotas.use(express.json());

rotas.get("/categoria", listarCategorias);
rotas.post("/usuario", validarCampos, verificarEmail, cadastrarUsuario);
rotas.post("/login", loginUsuario);

rotas.use(verificaLogin)

rotas.get("/usuario", detalharUsuario);
rotas.put("/usuario", editarUsuario);

module.exports = rotas;