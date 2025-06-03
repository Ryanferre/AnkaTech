import Fastify from 'fastify'
import fs from 'fs/promises'

const ServeAtivos= Fastify({logger: true})//Servidor e status de execulcao

ServeAtivos.get("/", async (req: any, res)=>{
    const dataItens= (await fs.readFile('./Ativos/Ativos.json')).toString()//acessando os itens e transformando em tipo string

    const Resdata= JSON.parse(dataItens)

    res.send(Resdata)
})

const port=  Number(process.env.PORT) || 4000//3000(padrao para debug ou manutancao) ou utilize qualquer uma do servidor

ServeAtivos.listen({ port }, ()=>{
    console.log('rodando na porta: ' + port)
})
