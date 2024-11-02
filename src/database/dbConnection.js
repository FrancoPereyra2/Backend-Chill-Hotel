import mongoose from "mongoose";

const mongoDB = process.env.MONGO_URI

mongoose.connect(mongoDB)

const conexion = mongoose.connection

conexion.once('open', ()=>{
    console.info('BD Conectada')
})