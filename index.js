const express = require('express')
const uuid = require('uuid')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

const usuarios = []

const checkIdUsuario = (request, response, next) => {
    const { id } = request.params
    const index = usuarios.findIndex(usuario => usuario.id === id)

    if (index < 0) {
        return response.status(404).json({ Error: "❌ Usuário não cadastrado!" })
    }

    request.usuarioIndex = index
    request.usuarioId = id

    next()
}

app.get('/usuarios', (request, response) => {
    return response.send(usuarios)
})

app.post('/usuarios', (request, response) => {
    const { nome, idade } = request.body
    const usuario = { id: uuid.v4(), nome, idade }

    usuarios.push(usuario)
    return response.status(201).send(usuario)
})

app.put('/usuarios/:id', checkIdUsuario, (request, response) => {
    const { nome, idade } = request.body
    const index = request.usuarioIndex
    const id = request.usuarioId

    const atualizacaoUsuario = { id, nome, idade }

    usuarios[index] = atualizacaoUsuario

    return response.send(atualizacaoUsuario)
})

app.delete('/usuarios/:id', checkIdUsuario, (request, response) => {
    const index = request.usuarioIndex

    usuarios.splice(index, 1)

    return response.status(204).json()
})

app.listen(3001, () => {
    console.log("✅ Servidor online")
})