import Fastify from 'fastify'
import { FastifyRequest} from 'fastify'
import { PrismaClient } from '@prisma/client';
import cors from '@fastify/cors'

const prisma = new PrismaClient();
const ApiBdUser= Fastify({logger: true})
await ApiBdUser.register(cors, {
  origin: "*"
})

//cadastrar o uruario no banco dados
ApiBdUser.post('/cadastro', async(req: any, reply: any)=>{
    const {firstname, lastname, email}= req.body as { firstname: string, lastname: string, email: string}
    console.log('Body recebido:', req.body);

    const Createuser= await prisma.user.create({data: {firstname, lastname, email}})

    if(Createuser){
        console.log(Createuser.id)
    }else{
        console.log('erro de conexao')
    }

    reply.send(Createuser)
})

interface Params {
  id: string // ou number, dependendo do seu ID
}
//enviar os dados do usuario para o front
ApiBdUser.get("/user/:id", async(req: FastifyRequest<{ Params: Params }>, res)=>{
    const { id } = req.params

    const userId = Number(id)
    try {
        const dataUser= await prisma.user.findUnique({where: { id: userId }})
        res.send(dataUser)
    } catch (error) {
        res.send(error)
    }
})

const port= Number(process.env.PORT) || 4000

ApiBdUser.listen({port}, ()=>{
    console.log(`usando a porta ${port}`)
})