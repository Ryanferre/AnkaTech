'use client'
import { useState, useEffect } from "react"
import axios from 'axios';
import {FaCoins, FaPlus, FaChartLine} from 'react-icons/fa'
import ListClienADDAtivos from './Components/Modal'
import { ValuesHook } from "../costumHook/costHook";
import Link from "next/link";

type objectReceiveType= {
    id: number,
    nome: string, 
    tipo: string,
    symble: string, 
    valor: number
}

export type dataAtivosPropType={
    name:   string,
    tipo:   string,
    symble: string,
    valor:  number
}

export default function ativosAvailable(){
    const [receiveAssets, setReceive]= useState<objectReceiveType[]>([])
    const [inforItenADD, setInfor]= useState<dataAtivosPropType>({name: '', tipo:'', symble: '', valor: 0})
    const {getsHiddenorFlex}= ValuesHook()
    
    //pega todos os ativos
    useEffect(()=>{
        const startGetAssets= async ()=>{
            try {
            const GetAssetes= await axios.get("https://ankatech.onrender.com/ativos")
                setReceive(GetAssetes.data)

                console.log(GetAssetes)
            } catch (error) {
                console.warn(error)
            }
        }

        startGetAssets()
    }, [])

    //capturar informacoes do item
    const ativoADD= (nameAtivo: string, Tipo: string, symble: string, valor: number)=>{
        setInfor({name: nameAtivo, tipo: Tipo, symble: symble, valor: valor})
        getsHiddenorFlex('flex')
    }
    return(
        <section className="flex flex-col py-19 items-center px-7">
            <div className="w-full h-108 overflow-auto flex flex-col items-center justify-around gap-6 py-6 border border-[#5d5d5d] rounded-2xl">
                <h1 className="text-[#5d5d5d] text-4xl">Ativos</h1>
                <ul className="flex flex-col h-full items-center w-full px-4 lg:px-10 gap-3">
                    {receiveAssets.length != 0 ? receiveAssets.map((objectReceive, index)=>(
                            <li className="grid grid-cols-5 items-center w-full px-1 lg:px-4 h-14 border border-[#5d5d5d] rounded-[.5rem]" key={index}>
                                <p className="text-[#5d5d5d] text-[.8rem]">{objectReceive.nome}</p>
                                <p className="text-[#5d5d5d] text-[.8rem]">{objectReceive.tipo}</p>
                                <div className="flex flex-row w-max items-center gap-3">
                                    <FaCoins color={"#f7c41f"} />
                                    <p className="text-[#5d5d5d] text-[.8rem]">{objectReceive.valor}</p>
                                </div>
                                <button className="w-max" onClick={()=> ativoADD(objectReceive.nome, objectReceive.tipo, objectReceive.symble, objectReceive.valor)}><FaPlus color={"#f7c41f"} className="w-max" /></button>
                                <Link href={`/graphic?namecripto=${objectReceive.symble}&type=${objectReceive.tipo}`}><FaChartLine color={"#f7c41f"} className="w-max" /></Link>
                            </li>
                    )) : <img src="https://i.postimg.cc/mr00zrYQ/Fake-3-D-vector-coin-1.gif" />}
                </ul>
            </div>
            <ListClienADDAtivos item={inforItenADD} />
        </section>
    )
}