import Fastify from 'fastify'
import { FastifyRequest} from 'fastify'
import { PrismaClient } from '@prisma/client';
import { Prisma } from '@prisma/client';
import cors from '@fastify/cors'

const prisma = new PrismaClient();
const ApiBdUser= Fastify({logger: true})
await ApiBdUser.register(cors, {
  origin: "*"
})

//cadastrar o uruario no banco dados
ApiBdUser.post('/cadastro', async(req: any, res: any)=>{
    const {firstname, lastname, email}= req.body as { firstname: string, lastname: string, email: string}

    try {
        const Createuser= await prisma.user.create({data: {firstname, lastname, email}})
        res.send(Createuser)
    } catch (error) {
        res.send(error)
    }
})

interface Params {
  id: string
}
interface Body {
  firstname: string;
  email: string;
}
//enviar os dados do usuario para o front
ApiBdUser.get("/user/:id", async(req: FastifyRequest<{ Params: Params, body: Body }>, res)=>{
    const {id}= req.params

    if(!isNaN(Number(id))){
        const userId= Number(id)
        try {
           const dataUser= await prisma.user.findUnique({where: { id: userId }})
           res.send(dataUser)
        } catch (error) {
            res.send(error)
        } 
    }else{
        try {
           const dataUser= await prisma.user.findUnique({where: { email: id }})
           res.send(dataUser)
        } catch (error) {
            res.send(error)
        }
    }
})

//cadastrar cliente
ApiBdUser.post("/cadressclient", async(req, res)=>{
        const {nome, cpf, telefone, userId}= req.body as {nome: string, cpf: string, telefone: string, userId: number}

        console.log(req.body)
        const createclient= await prisma.clienteuser.create({data: {nome, cpf, telefone, userId}})

        if(createclient){
            res.send(createclient)
        }else{
            res.send('erro de criacao')
        }

})

//pegar clientes no banco de dados
ApiBdUser.get("/userclient/:id", async (req: FastifyRequest<{ Params: Params }>, res)=>{
    const {id}= req.params

    const userId= Number(id)
    //verificar se o id e igual ao da tabela. Se sim a api entende que e para pegar um cliente em especifico
    const idUserIsTrueOurFalse= await prisma.clienteuser.findUnique({where: {id: Number(id)},})
    if(idUserIsTrueOurFalse != null){
        res.send(idUserIsTrueOurFalse)
    }else{
        try {
            const dataUser= await prisma.clienteuser.findMany({where: { userId: userId }})
            res.send([dataUser])
        } catch (error) {
            res.send(error)
        }
    }
})

//alterar dados do cliente
ApiBdUser.post("/sendData/:id", async (req: FastifyRequest<{ Params: Params }>, res)=>{
    const {id}= req.params
    const {Cpf, telefone}= req.body as {Cpf: string, telefone: string}
    const CompareData= await prisma.clienteuser.findUnique({where:{id: Number(id)}})

    console.log(req.body)

    if(CompareData?.cpf !== Cpf && CompareData?.telefone === telefone){
        const UpdateOnlyCpf= await prisma.clienteuser.update({where: {id: Number(id)}, data:{cpf: Cpf}})
        res.send(UpdateOnlyCpf)
    } 
    else if(CompareData?.telefone !== telefone && CompareData?.cpf === Cpf){
        const UpdateOnlyTelefone= await prisma.clienteuser.update({where: {id: Number(id)}, data:{telefone: telefone}})
        res.send(UpdateOnlyTelefone)
    } 
    else if(CompareData?.cpf !== Cpf && CompareData?.telefone !== telefone){
        const UpdateCpf= await prisma.clienteuser.update({where: {id: Number(id)}, data:{cpf: Cpf}})
        const UpdateTelefone= await prisma.clienteuser.update({where: {id: Number(id)}, data:{telefone: telefone}})
        res.send([UpdateCpf, UpdateTelefone])
    }else{
        res.send('nao foi possivel atualizar os dados')
    }
})

//buscar tabela de ativos do cliente
ApiBdUser.get("/ativosclient/:id", async(req: FastifyRequest<{ Params: Params }>, res)=>{
    const {id}= req.params

    const ClientId= Number(id)

    try {
        const dataAtivos= await prisma.ativoscripto.findFirst({where: {clientId: ClientId}})
        res.send(dataAtivos)
    } catch (error) {
        res.send(error)
    }
})
//adicionar ativos ao banco de dados ou modifica-los
ApiBdUser.post("/adicionarAtivos/:id", async(req: FastifyRequest<{ Params: Params }>, res)=>{
    try{
        const {id}= req.params
        const {name, tipo, valor}= req.body as {name: string, tipo: string, valor: number}

        const clientId= Number(id)
        const ativosofclient= await prisma.ativoscripto.findMany({where: {clientId: clientId}})

        if(ativosofclient.length > 0){

            //puxar json do banco de dados
            const AtivosOfClientFormatJson= await prisma.ativoscripto.findFirst({where: {clientId}})

            console.log(AtivosOfClientFormatJson)
            const ativosAntigos = Array.isArray(AtivosOfClientFormatJson?.ativos) ? AtivosOfClientFormatJson?.ativos : [];


            const itensInBd = [...ativosAntigos, { name, tipo, valor }];

            //buscar tabela com o mesmo id do cliente
            const updateJsonAtivos= await prisma.ativoscripto.update({where: {clientId}, data:{ativos: itensInBd as Prisma.JsonArray}})
            res.send(updateJsonAtivos)
        }else{//caso uma tabela de ativos nao foi criada, cria uma com os dados que recebeu da requisicao
            const createclient= await prisma.ativoscripto.create({data: {ativos: { name, tipo, valor }, clientId}})
            res.send(createclient)
        }
    } catch (error){
        console.log(error)
    }
})

//remorer ativos
ApiBdUser.post("/removeAtivos/:id", async(req: FastifyRequest<{ Params: Params }>, res)=>{
    const {id}= req.params
    const clientId= Number(id)

    console.log(req.body)
    try {
        const updateJsonAtivos= await prisma.ativoscripto.update({where: {clientId}, data:{ativos: req.body as Prisma.JsonArray}})

        res.send(updateJsonAtivos)
    } catch (error) {
        res.send(error)
    }

})
const port= Number(process.env.PORT) || 4000
ApiBdUser.listen({port}, ()=>{
    console.log(`usando a porta ${port}`)
})