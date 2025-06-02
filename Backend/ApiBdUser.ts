import Fastify from 'fastify'
import { PrismaClient } from '@prisma/client';
import cors from '@fastify/cors'

const prisma = new PrismaClient();
const ApiBdUser= Fastify({logger: true})
await ApiBdUser.register(cors, {
  origin: "*"
})

ApiBdUser.post('/cadastro', async(req: any, reply: any)=>{
    const {firstname, lastname, email}= req.body as { firstname: string, lastname: string, email: string}
    console.log('Body recebido:', req.body);

    const Createuser= await prisma.user.create({data: {firstname, lastname, email}})

    if(Createuser){
        console.log("CreateUser" + Createuser)
    }else{
        console.log('erro de conexao')
    }

    reply.send(Createuser)
})

const port= Number(process.env.PORT) || 3000

ApiBdUser.listen({port}, ()=>{
    console.log(`usando a porta ${port}`)
})