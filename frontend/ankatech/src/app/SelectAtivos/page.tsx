'use client'
import { useState, useEffect } from "react"
import axios from 'axios'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

type objectReceiveType= {
  name: string,
  tipo: string,
  valor: number,
  symble: string
}

export default function selectAtivos(){
    const [receiveAssets, setReceive]= useState<objectReceiveType[]>([])
    const [valorInvestido, setValor]= useState(0)
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    const nome= searchParams.get('name')
    const cpfUser= searchParams.get('cpf')

    useEffect(()=>{
        const startGetAssets= async ()=>{
            try {
            const GetAssetes= await axios.get(`http://localhost:4000/ativosclient/${id}`)
                setReceive([GetAssetes.data.ativos])
            } catch (error) {
                console.warn(error)
            }
        }

        startGetAssets()
    }, [])

    useEffect(()=>{
        const TotalValue= receiveAssets.reduce((total, valor)=> total + valor.valor, 0)
        setValor(TotalValue)
    }, [receiveAssets])
    return(
        <section className="flex flex-col py-19 items-center px-7">
            <div className="w-full h-108 flex flex-col justify-around gap-3 py-6 px-10 border border-[#5d5d5d] rounded-2xl">
                <div className="flex flex-row justify-between items-center">
                    <h1 className="text-[#5d5d5d] text-4xl">{nome}</h1>
                    <Link href={`/EditUser?id=${id}&name=${nome}&cpf=${cpfUser}`} className="bg-black border border-none rounded-[.6rem] px-5 py-2">Edit user</Link>
                </div>
                <div>
                    <ul className="grid grid-cols-2">
                        <li>
                            <p className="text-[#5d5d5d]">Ativos</p>
                        </li>
                        <li>
                            <p className="text-[#5d5d5d]">{receiveAssets.length}</p>
                        </li>
                        <li>
                            <p className="text-[#5d5d5d]">Total investido</p>
                        </li>
                        <li>
                            <p className="text-[#5d5d5d]">{valorInvestido}</p>
                        </li>
                    </ul>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-row justify-between items-center">
                        <p className="text-[#5d5d5d]">Ativos</p>
                        <Link href="/ativos" className="bg-black border border-none rounded-[.6rem] px-5 py-2">Adicionar ativo</Link>
                    </div>
                    <ul className="flex flex-col h-60 items-center w-full overflow-auto gap-3">
                        {receiveAssets.length !== 0 ? receiveAssets.map((dataclient, index)=>(
                                <li key={index} className="grid grid-cols-3 items-center w-full px-4 h-14 border border-[#5d5d5d] rounded-[.5rem]">
                                    <p className="text-[#5d5d5d]">{dataclient.name}</p>
                                    <p className="text-[#5d5d5d]">{dataclient.tipo}</p>
                                    <p className="text-[#5d5d5d]">{dataclient.valor}</p>
                                </li>                      
                            )) : <div className="w-full h-full flex flex-col justify-center items-center">
                          <p className="text-[#5d5d5d]">Cliente sem Ativos registrado</p>
                        </div>}
                    </ul>
                </div>
            </div>
        </section>
    )
}