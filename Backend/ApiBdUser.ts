import { FastifyRequest} from 'fastify'
import { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { send } from 'process';
const prisma = new PrismaClient();


export function mainBdUser(ApiBdUser: FastifyInstance){
//cadastrar o uruario no banco dados
ApiBdUser.post('/cadastro', async(req: any, res: any)=>{
    const {firstname, lastname, email}= req.body as { firstname: string, lastname: string, email: string}

    try {
        const Createuser= await prisma.user.create({data: {firstname, lastname, email}})
        res.send([Createuser, email])
    } catch (error) {
        res.send(error)
    }
})

//deletar usuario
ApiBdUser.post('/DeletUser/:email/:id', async(req: any, res: any)=>{
    const {email, id}= req.params as {email: string, id: string}

    const reverType= Number(id)

    try {
        const deleteIn= await prisma.user.delete({where: {id: reverType, email: email}})

        res.send(deleteIn)
    } catch (error) {
        res.send(error)
    }
})

interface Params {
  id: string,
  cpfUser: string,
  getTotalActive: string
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

async function cadresClientInBd (nome: string, cpf: string, telefone: string, userId: number){
            try {
                const createclient= await prisma.clienteuser.create({data: {nome, cpf, telefone, userId}})
                
                 if(createclient){
                    return createclient
                 }
            } catch (error) {
                return 'erro'
            }
}

//cadastrar cliente
ApiBdUser.post("/cadressclient", async(req, res)=>{
        const {nome, cpf, telefone, userId, email}= req.body as {nome: string, cpf: string, telefone: string, userId: number, email: string}

        if(email){
            try {
                const getEmilUser= await prisma.user.findUnique({where: {email: email}})
                if(getEmilUser){
                   const resCadres= await cadresClientInBd(nome, cpf, telefone, userId)
                   res.send(resCadres)
                }
            }catch(error){
             res.send('http://localhost:3000/login')
            }
        }else{
            res.send('http://localhost:3000/login')
        }

})

//pegar clientes no banco de dados
ApiBdUser.get("/userclient/:id/:cpfUser", async (req: FastifyRequest<{ Params: Params }>, res)=>{
    const {id}= req.params
    const {cpfUser}= req.params

    const userId= Number(id)

    const revertTipeCpf= JSON.parse(cpfUser)

    //verificar se o id e igual ao da tabela. Se sim a api entende que e para pegar um cliente em especifico
    if(revertTipeCpf != null){
        const idUserIsTrueOurFalse= await prisma.clienteuser.findUnique({where: {id: Number(id), cpf: cpfUser}})
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

//deletar o cliente do banco de dados
ApiBdUser.post("/deleteCliente/:id/:cpfUser", async (req: FastifyRequest<{ Params: Params }>, res)=>{
    const {id}= req.params
    const {cpfUser}= req.params

    console.log(cpfUser)

    try {
        const deleteClienteFromUser= await prisma.clienteuser.delete({where: {id: Number(id), cpf: cpfUser}})

        res.send(deleteClienteFromUser)
    } catch (error) {
        res.send('Erro ao deletar o cliente!')
    }
})

type dataAtivosPropType = {name: string, tipo: string, symble: number, valor: number}

class TableUserWithAtivos {
    datauser: object | null;
    active: number;

    constructor(datauser: object | null, active: number){
        this.datauser= datauser,
        this.active= active
    }
}

//buscar tabela de ativos do cliente
ApiBdUser.get("/ativosclient/:id/:getTotalActive", async(req: FastifyRequest<{ Params: Params }>, res)=>{
    const {id, getTotalActive}= req.params

    const ClientId= Number(id)
    try {
        let dataAtivos= await prisma.ativoscripto.findFirst({where: {clientId: ClientId}})

        if(getTotalActive === "true" && typeof dataAtivos !== typeof Object){
            let acessArray= dataAtivos?.ativos as dataAtivosPropType []

            if(acessArray != null){
                const totalInportfolio= acessArray.reduce((add: number, numberOn: dataAtivosPropType)=> add + numberOn.valor, 0)
                const JoinInObject= new TableUserWithAtivos(dataAtivos, totalInportfolio)
            
               res.send(JoinInObject)
            }else{

              dataAtivos= {id: 0, ativos: [], clientId: 0}

              const JoinInObject= new TableUserWithAtivos(dataAtivos, 0)
            
              res.send(JoinInObject)
            }

        }else{
            res.send(dataAtivos)
        }
    } catch (error) {
        res.send(error)

        console.log(error)
    }
})
//adicionar ativos ao banco de dados ou modifica-los
ApiBdUser.post("/adicionarAtivos/:id", async(req: FastifyRequest<{ Params: Params }>, res)=>{
    try{
        const {id}= req.params
        const {name, tipo, valor, symble}= req.body as {name: string, tipo: string, symble: number, valor: number}

        const clientId= Number(id)
        const ativosofclient= await prisma.ativoscripto.findMany({where: {clientId: clientId}})

        if(ativosofclient.length > 0){

            //puxar json do banco de dados
            const AtivosOfClientFormatJson= await prisma.ativoscripto.findFirst({where: {clientId}})

            console.log(AtivosOfClientFormatJson)
            const ativosAntigos = Array.isArray(AtivosOfClientFormatJson?.ativos) ? AtivosOfClientFormatJson?.ativos : [];


            const itensInBd = [...ativosAntigos, { name, tipo, symble, valor }];

            //buscar tabela com o mesmo id do cliente
            const updateJsonAtivos= await prisma.ativoscripto.update({where: {clientId}, data:{ativos: itensInBd as Prisma.JsonArray}})
            res.send(updateJsonAtivos)
        }else{//caso uma tabela de ativos nao foi criada, cria uma com os dados que recebeu da requisicao
            const createclient= await prisma.ativoscripto.create({data: {ativos: { name, tipo, symble, valor }, clientId}})
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
}