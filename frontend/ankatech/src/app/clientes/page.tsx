'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';

type dataClientsType={
    id:        number,
    nome:      string,
    cpf:       string,
    telefone:  string,
    total: number
}

interface dataActiveInObject{
    name: string,
    symble: string,
    tipo: string,
    valor: number
}

type TypeActive= {
    ativos: Array<dataActiveInObject>,
    clientId: number,
    id: number
}

type dataAtivosClassType={
     ObUser: dataClientsType;
     ObAtivos: TypeActive;
     somOfLAstPrice: number | null; //armazena a soma dos ultimos prico anunciado na bolsa de vaores
     Total: number; //aramazena o valor total somado pela API
     Estatistic: number | null//armazena a estastistica de valor
}

const Carteira= ()=>{
    const [userClients, setClients]= useState<dataClientsType []>([])
    const [startModif, setstart]= useState(0)//ultimo preco anunciado
    const [AtivosofCliente, setAtivos]= useState<any []>([])//ativos do cliente
    const userId = Cookies.get('userId')//resgata o id do cookie

    //objeto que armazena 2 objetos(User e ativos),estatistica 

    class JoinInformation{
        ObUser: dataClientsType;
        ObAtivos: dataAtivosClassType;
        Total: number;
        somOfLAstPrice: number | null;
        Estatistic: number | null
        constructor(ObUser: dataClientsType, ObAtivos: dataAtivosClassType, Total: number , Estatistic: number | null, somOfLAstPrice: number | null){
            this.ObUser= ObUser;
            this.ObAtivos= ObAtivos;
            this.Total= Total;
            this.somOfLAstPrice= somOfLAstPrice;
            this.Estatistic= Estatistic;
        }
    }
    
    //pegar todos os cliente
    useEffect(()=>{
        const startGetClients= async ()=>{
            try {
                const GetClientsforUser= await axios.get(`https://ankatech.onrender.com/userclient/${userId}/${null}`)
                setClients(GetClientsforUser.data[0])

                console.log(GetClientsforUser.data[0])
            } catch (error) {
                console.warn(error)
            }
        }

        startGetClients()
    }, [])

    //pegar ativos na api externa
    async function getAcoesInApi(type: string, typename: string){

            let encodeName;
            if(typename== "GC=F"){
                encodeName= encodeURIComponent(typename)
                try {
                const getinserver= await axios.get(`hhttps://ankatech.onrender.com/getdatagraphic/${encodeName}/${type}`)

                return getinserver.data
                } catch (error) {
                    return error
                }
            }else{
               try {
                const getinserver= await axios.get(`https://ankatech.onrender.com/getdatagraphic/${typename}/${type}`)

                

                return getinserver.data
                } catch (error) {
                    console.log(error)
                } 
            }
    }


    //pegar ativos do cliente
    useEffect(()=>{
        const startGetAssets= async ()=>{

            const getDataUser= userClients.map(async (element: any | null)=>{
                 try {
                    const GetAssetes= await axios.get(`https://ankatech.onrender.com/ativosclient/${element.id}/${true}`)

                    return GetAssetes
                } catch (error) {
                        console.warn(error)
                    }
            })
         
         const joinResult= Promise.all(getDataUser)

          joinResult.then((res)=>{
            console.log(res)
            for(let i =0; i < res.length && userClients.length; i++){

                const isolateKeyActive= res[i]?.data?.active//Valor total somando pela API

                const stanObject= new JoinInformation(userClients[i], res[i]?.data?.datauser, isolateKeyActive, null, null)
                setAtivos(prev => [...prev, stanObject])
                setstart(1)
            }
          })
        }
        startGetAssets()
    }, [userClients])

    useEffect(()=>{
        const rebuildingObjectJoin= async ()=>{

            const copia = [...AtivosofCliente]

            //array com os objetos que representa cada usuario
            for (let i = 0; i < AtivosofCliente.length; i++) {

                let Allsom= 0
                let Includ: { [symble: string]: number }= {}

                //se pelo menos um desses ativos nao for null, ou seja se o array de ativos existir
                if (AtivosofCliente[i].ObAtivos.ativos != null) {
                    const ativos = AtivosofCliente[i].ObAtivos.ativos//capture o array

                    ativos.forEach((ativo: any) => { Includ[ativo.symble] = (Includ[ativo.symble] || 0) + 1;})

                    //percorra o array
                    for(const symble in Includ){
                        try {
                            const TypeAction= ativos.find((a: any) => a.symble === symble)?.tipo
                            const res = await getAcoesInApi(TypeAction, symble)
                            const JoinAll= res.flat()//junta todos os arrays, caso a api retorne os precos dividido em dois ou mais arrays

                            const Format= JoinAll.length - 1//acessar o ultimo indice com o preco

                            const Quant= Includ[symble]

                            console.log(Quant)
                            
                            Allsom += JoinAll[Format]?.price * Quant //acessa o preco atual de cada acao e multiplica com o tamanho do array que armazena as acoes

                            console.log("Preço retornado: ",JoinAll[Format]?.price)

                          } catch (error) {
                            console.log(error)
                          }
                      await new Promise(resolve => setTimeout(resolve, 1000))
                    }
                    const diff = Allsom - AtivosofCliente[i].Total//lucro


                    copia[i].Estatistic = (diff / copia[i].Total) * 100;
                    copia[i].somOfLAstPrice = Allsom;
                }
            }
            setAtivos(copia)
        }
        rebuildingObjectJoin()
    }, [startModif])

    useEffect(()=>{
        console.log(AtivosofCliente)
    }, [AtivosofCliente])
    return(
        <section className="px-7">
            <div className="w-full lex flex-col items-center px-4 lg:px-7 py-8 gap-17 border border-[#5d5d5d] rounded-2xl">
                <ul className="flex flex-row justify-between px-40 border-b-1 mb-5 border-black">
                    <li><p className="text-[#5d5d5d] w-max">Nome</p></li>
                    <li><p className="text-[#5d5d5d] w-max">Investimento</p></li>
                    <li><p className="text-[#5d5d5d] w-max">Valor atual</p></li>
                    <li><p className="text-[#5d5d5d] w-max">Magem de lucro</p></li>
                </ul>
                <ul className="flex flex-col w-full h-[20rem] overflow-scroll py-4 px-3 lg:px-4 border-l border-b rounded-bl-2xl border-black shadow-md gap-3">
                    {AtivosofCliente.length !== 0 ? AtivosofCliente.map((dataclient)=>(
                          <li className="flex flex-row justify-around items-center w-full px-4 h-14 border border-[#5d5d5d] rounded-[.5rem]">
                            <p className="text-[#5d5d5d] w-max">{dataclient.ObUser.nome}</p>
                            <p className="text-[#5d5d5d] w-max">R$ {dataclient.Total}</p>
                            <p className="text-[#5d5d5d] w-max">R$ {typeof dataclient.somOfLAstPrice === "number" ? `${dataclient.somOfLAstPrice.toFixed(2)}` : "N/A"}</p>
                            <p className={`${dataclient.Estatistic > 0 ? "text-green-600" : "text-red-500"} w-max`}>% {typeof dataclient.Estatistic === "number" ? `${dataclient.Estatistic.toFixed(2)}%` : "N/A"}</p>
                          </li>                     
                    )) : <div className="w-full h-full flex flex-col justify-center items-center">
                          <p className="text-[#5d5d5d]">Adicione clientes</p>
                        </div>}
                </ul>
            </div>
        </section>
    )
}

export default Carteira