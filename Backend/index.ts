import cors from '@fastify/cors'
import Fastify from 'fastify'
import { mainBdUser } from './ApiBdUser.js'
import { ServerAtivos } from './AtivosApi.js'

const ServerMain= Fastify({logger: true})

const main = async()=>{
  await ServerMain.register(cors, {
   origin: "*",
   methods: ['GET', 'POST', 'PUT', 'DELETE']
  })
}

main()
mainBdUser(ServerMain)
ServerAtivos(ServerMain)

const Port=  Number(process.env.PORT) || 4000//5000 ou utilize qualquer uma do servidor

ServerMain.listen({ port: Port, host: '0.0.0.0' }, ()=>{
    console.log('rodando na porta: ' + Port)
})