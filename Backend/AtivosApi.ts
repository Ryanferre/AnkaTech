import Fastify from 'fastify'
import fs from 'fs/promises'
import cors from '@fastify/cors'

const ServeAtivos= Fastify({logger: true})//Servidor e status de execulcao
await ServeAtivos.register(cors, {
  origin: "*"
})

ServeAtivos.get("/ativos", async (req: any, res)=>{
    const dataItens= (await fs.readFile('./Ativos/Ativos.json')).toString()//acessando os itens e transformando em tipo string

    const Resdata= JSON.parse(dataItens)

    res.send(Resdata)
})

const port=  Number(process.env.PORT) || 5000//5000 ou utilize qualquer uma do servidor

ServeAtivos.listen({ port }, ()=>{
    console.log('rodando na porta: ' + port)
})
