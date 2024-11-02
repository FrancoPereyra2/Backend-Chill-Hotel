import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

const app = express()

app.set('port', process.env.PORT || 4000)
app.listen(app.get('port'), () => {
    console.info('Estoy escuchando el puerto '+ app.get('port'))
})

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// http://localhost:4000/prueba
app.get('/prueba', (req, res)=>{
    console.log('alguien hizo una solicitud get a la ruta de prueba')
    res.send('Hola mundo desde el Backend')
})