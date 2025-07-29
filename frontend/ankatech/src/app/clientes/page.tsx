'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import { promises } from "dns";

type dataClientsType={
    id:        number,
    nome:      string,
    cpf:       string,
    telefone:  string,
    total: number
}

type dataAtivosPropType={
    name:   string,
    tipo:   string,
    symble: string,
    valor:  number
}

type acoesofclient= {
    valor: string
}

const Carteira= ()=>{
    const [userClients, setClients]= useState<dataClientsType []>([])
    const [LastPrice, setLast]= useState(0)//ultimo preco anunciado
    const [AtivosofCliente, setAtivos]= useState<acoesofclient []>([])//ativos do cliente
    const userId = Cookies.get('userId')//resgata o id do cookie

    //objeto que armazena 2 objetos(User e ativos),estatistica 

    class JoinInformation{
        ObUser: object;
        ObAtivos: object;
        Estatistic: number
        constructor(ObUser: object, ObAtivos: object, Estatistic: number){
            this.ObUser= ObUser;
            this.ObAtivos= ObAtivos;
            this.Estatistic= Estatistic
        }
    }
    
    //pegar todos os cliente
    useEffect(()=>{
        const startGetClients= async ()=>{
            try {
                const GetClientsforUser= await axios.get(`http://localhost:4000/userclient/${userId}/${null}`)
                setClients(GetClientsforUser.data[0])

                console.log(GetClientsforUser.data[0])
            } catch (error) {
                console.warn(error)
            }
        }

        startGetClients()
    }, [])

    //pegar ativos na api externa
    async function getAcoesInApi(type: string, typemane: string){

            let encodeName;
            if(typemane== "GC=F"){
                encodeName= encodeURIComponent(typemane)
                try {
                const getinserver= await axios.get(`http://localhost:5000/getdatagraphic/${encodeName}/${type}`)

                return getinserver.data
                } catch (error) {
                    return error
                }
            }else{
               try {
                const getinserver= await axios.get(`http://localhost:5000/getdatagraphic/${typemane}/${type}`)

                

                console.log(getinserver.data)
                } catch (error) {
                    console.log(error)
                } 
            }
    }


    //pegar ativos do cliente
    useEffect(()=>{
        const startGetAssets= async ()=>{

            const getDataUser= userClients.map(async (element: dataClientsType)=>{
                 try {
                    const GetAssetes= await axios.get(`http://localhost:4000/ativosclient/${element.id}/${true}`)

                    console.log(GetAssetes)
                        
                } catch (error) {
                        console.warn(error)
                    }
            })
          const Arr= Promise.all(getDataUser)

          console.log(Arr)
        }
        startGetAssets()
    }, [userClients])
    return(
        <section className="px-7">
            <div className="w-full lex flex-col items-center px-4 lg:px-7 py-8 gap-17 border border-[#5d5d5d] rounded-2xl">
                <ul className="flex flex-col w-full h-[20rem] overflow-scroll py-4 px-3 lg:px-4 border-l border-b rounded-bl-2xl border-black shadow-md gap-3">
                    {userClients.length !== 0 ? userClients.map((dataclient)=>(
                          <li className="flex flex-row justify-around items-center w-full px-4 h-14 border border-[#5d5d5d] rounded-[.5rem]">
                            <p className="text-[#5d5d5d] w-max">{dataclient.nome}</p>
                            <p className="text-[#5d5d5d] w-max">{dataclient.total}</p>
                            <p className="text-[#5d5d5d] w-max">{dataclient.telefone}</p>
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