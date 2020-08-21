/** Importando dependências necessárias para rodar a minha API */
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT =process.env.PORT || 3000
const database = require('./SRC/config/database')
const filmesController = require('./SRC/app/controllers/filmes.controller')

/**Importando rotas da aplicação*/

const FilmesRoutes = require('./SRC/app/routes/filmes.routes')

/**Configurando o body parser */
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.text())
app.use(bodyParser.json())
/**app.use (bodyParser.json()) */
app.use(bodyParser.json({type: 'application/json'}))

/**COnfigurando o CORS */
app.use(cors())

/**Configurando cabeçalhos de reponse padrão */
app.use((req, res, next) => {
    res.header('Acess-Control-Allow-Origin', "*")
    res.header("Acess-Control-Allow-Header", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})
/** Configurando o endpoint / para respoonder um JSON com uma mensagem */
app.get('/', (req, res) => {
    res.send({ message: `API ouvindo na porta ${PORT}`})
})

app.use('/filmes', FilmesRoutes)

/**Configurando o endpoint * que é retornado quando uma url requisitada não existe */
app.use('*', (req, res) => {
    res.send({message: 'API não encontrada!' })
})

/** Iniciando o Servidor da API na porta configurada na variável de ambiente ou 3000 */
app.listen(PORT, () => console.log(`API ouvindo na porta ${PORT}`))