const knex = require('../conexao/conexaopg');
const jwt = require('jsonwebtoken')
const senhaJwt = require('../senhaJwt');

const verificaLogin = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ mensagem: "Usuário não autorizado." })
    }

    const token = authorization.replace('Bearer ', '').trim();

    try {
        const { id } = jwt.verify(token, senhaJwt)

        const usuarioExiste = await knex("usuarios").where({ id }).first();

        if (!usuarioExiste) {
            return res.status(404).json({ mensagem: "Usuário não encontrado." });
        }

        const { senha: _, ...usuario } = usuarioExiste;

        req.usuario = usuario;

        next()
    } catch (error) {
        console.log("erro no verificalogin", error.message)
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
}

module.exports = verificaLogin