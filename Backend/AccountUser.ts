import Fastify from 'fastify'
import fs from 'fs/promises'

const ApiAccountUser= Fastify({logger: true})//Servidor e status de execulcao

ApiAccountUser.post("/User", async(require, res)=>{
    
})