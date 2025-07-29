'use client'
import axios from 'axios'
import { useState, useEffect } from "react"
import Cookies from 'js-cookie'
import { dataAtivosPropType } from '../page'
import { ValuesHook } from '@/app/costumHook/costHook'

type dataClientsType={
    id:        number,
    nome:      string,
}

type PropTypeImport={
    item: dataAtivosPropType
}

export default function ListClienADDAtivos({item}: PropTypeImport){
    const [userClients, setClients]= useState<dataClientsType []>([])
    const userId = Cookies.get('userId')//resgata o id do cookie
    const {ModalofListuser, getsHiddenorFlex}= ValuesHook()

    //pegando clientes referente ao usuario
    useEffect(()=>{
        const startGetClients= async ()=>{
            try {
                const GetClientsforUser= await axios.get(`http://localhost:4000/userclient/${userId}/null`)
                setClients(GetClientsforUser.data[0])
                console.log(GetClientsforUser.data[0])
            } catch (error) {
                console.warn(error)
            }
        }

        startGetClients()
    }, [])

    //adicionar ativo
    const ADDAtivos= (e: number)=>{
        const startpushAtivos= async ()=>{
            try {
                const PostAtivosOfUser= await axios.post(`http://localhost:4000/adicionarAtivos/${e}`, item)
            } catch (error) {
                console.warn(error)
            }
        }

        startpushAtivos()
    }

    //retirar modal
    const noneModal= ()=>{
        getsHiddenorFlex('hidden')
    }

    return(
        <section onClick={noneModal} className={`${ModalofListuser} flex-col w-full h-130 bg-black/50 absolute items-center justify-center`}>
            <div className="w-90 bg-white h-[20-rem] flex flex-col items-center px-7 py-8 gap-17 border border-[#5d5d5d] rounded-2xl">
                <ul onClick={(e)=> e.stopPropagation()} className="flex flex-col w-full h-[20rem]">
                    {userClients.length !== 0 ? userClients.map((dataclient)=>(
                        <button key={dataclient.id} onClick={()=> ADDAtivos(dataclient.id)}>
                          <li className="grid grid-cols-3 items-center w-full px-4 h-14 border border-[#5d5d5d] rounded-[.5rem]">
                            <p className="text-[#5d5d5d]">{dataclient.nome}</p>
                          </li>
                        </button>                       
                    )) : <div className="w-full h-full flex flex-col justify-center items-center">
                          <p className="text-[#5d5d5d]">Adicione clientes</p>
                        </div>}
                </ul>
            </div>
        </section>
    )
}