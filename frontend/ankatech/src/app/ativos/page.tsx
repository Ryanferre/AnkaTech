'use client'
import { useState, useEffect } from "react"
import axios from 'axios';
import {FaCoins, FaPlus} from 'react-icons/fa'
import ListClienADDAtivos from './Components/Modal'
import { ValuesHook } from "../costumHook/costHook";

type objectReceiveType= {
    id: number,
    nome: string, 
    tipo: string, 
    valor: number
}

export type dataAtivosPropType={
    name:   string,
    tipo:   string,
    valor:  number
}

export default function ativosAvailable(){
    const [receiveAssets, setReceive]= useState<objectReceiveType[]>([])
    const [inforItenADD, setInfor]= useState<dataAtivosPropType>({name: '', tipo:'', valor: 0})
    const {getsHiddenorFlex}= ValuesHook()
    
    //pega todos os ativos
    useEffect(()=>{
        const startGetAssets= async ()=>{
            try {
            const GetAssetes= await axios.get("http://localhost:5000/ativos")
                setReceive(GetAssetes.data)
            } catch (error) {
                console.warn(error)
            }
        }

        startGetAssets()
    }, [])

    //capturar informacoes do item
    const ativoADD= (nameAtivo: string, Tipo: string, valor: number)=>{
        setInfor({name: nameAtivo, tipo: Tipo, valor: valor})
        getsHiddenorFlex('flex')
    }
    return(
        <section className="flex flex-col py-19 items-center px-7">
            <div className="w-full h-108 overflow-auto flex flex-col items-center justify-around gap-6 py-6 border border-[#5d5d5d] rounded-2xl">
                <h1 className="text-[#5d5d5d] text-4xl">Ativos</h1>
                <ul className="flex flex-col h-full items-center w-full px-10 gap-3">
                    {receiveAssets.map((objectReceive)=>(
                            <li className="grid grid-cols-4 items-center w-full px-4 h-14 border border-[#5d5d5d] rounded-[.5rem]" key={objectReceive.id}>
                                <p className="text-[#5d5d5d]">{objectReceive.nome}</p>
                                <p className="text-[#5d5d5d]">{objectReceive.tipo}</p>
                                <div className="flex flex-row w-max items-center gap-3">
                                    <FaCoins color={"#f7c41f"} />
                                    <p className="text-[#5d5d5d]">{objectReceive.valor}</p>
                                </div>
                                <button onClick={()=> ativoADD(objectReceive.nome, objectReceive.tipo, objectReceive.valor)}><FaPlus color={"#f7c41f"} /></button>
                            </li>
                    ))}
                </ul>
            </div>
            <ListClienADDAtivos item={inforItenADD} />
        </section>
    )
}