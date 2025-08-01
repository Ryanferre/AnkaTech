'use client'
import { useEffect, useState } from "react"
import { useSearchParams } from 'next/navigation'
import axios from "axios"
import {FaCoins, FaTrash} from 'react-icons/fa'

type objectReceiveType= {
    id: number,
    nome: string, 
    tipo: string, 
    valor: number
}

export default function EditativoUser(){
    const [receiveAssets, setReceive]= useState<objectReceiveType[]>([])
    const searchParams = useSearchParams()
    const idUser = searchParams.get('id')
    const [checked, setChecked] = useState(false)

    useEffect(()=>{
            const startGetAssets= async ()=>{
                try {
                const GetAssetes= await axios.get(`http://localhost:4000/ativosclient/${idUser}/${false}`)
                    setReceive(GetAssetes.data.ativos)
                } catch (error) {
                    console.warn(error)
                }
            }
    
            startGetAssets()
        }, [])

    const RemoveAtivo= (indexRemove: number)=>{
        const ArrModeifield= receiveAssets.filter((_, i)=> i != indexRemove)

        setReceive(ArrModeifield)
    }

    //confirmacao de exclusao
    const RemoveAtivos= ()=>{
        const startpushAtivos= async ()=>{
            try {
                const PostAtivosOfUser= await axios.post(`http://localhost:4000/removeAtivos/${idUser}`, receiveAssets)

                setReceive(PostAtivosOfUser.data.ativos)
            } catch (error) {
                console.warn(error)
            }
        }

        if(checked){
            startpushAtivos()
        }
    }

    return(
        <section>
            <ul className="flex flex-col h-130 overflow-auto items-center w-full px-10 gap-3">
                {receiveAssets.length > 0 ? receiveAssets.map((objectReceive, index)=>(
                     <li key={objectReceive?.id} className="grid grid-cols-4 items-center w-full px-4 h-14 border border-[#5d5d5d] rounded-[.5rem]">
                         <p className="text-[#5d5d5d]">{objectReceive.nome}</p>
                         <p className="text-[#5d5d5d]">{objectReceive.tipo}</p>
                         <div className="flex flex-row w-max items-center gap-3">
                           <FaCoins color={"#f7c41f"} />
                           <p className="text-[#5d5d5d]">{objectReceive.valor}</p>
                         </div>
                            <button onClick={()=> RemoveAtivo(index)}><FaTrash color={"#f7c41f"} /></button>
                     </li>)) : 
                     <div className="h-full flex flex-col justify-center items-center">
                        <p className="text-[#5d5d5d]">Cliente sem ativos registrado</p>
                     </div>
                     }
            </ul>
            <div className="flex flex-row justify-between items-center px-10 py-5">
                <label className="inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="hidden" checked={checked} onChange={() => setChecked(!checked)} />
                      <span className="w-3 h-3 rounded-full border-1 border-black flex items-center justify-center">
                        {checked && <span className="w-3 h-3 bg-black rounded-full"></span>}
                      </span>
                      <p className="ml-2 text-[#5d5d5d]">Aceito a remocao</p>
                </label>
                <button onClick={RemoveAtivos} className="bg-black border border-none rounded-[.6rem] w-max px-5 py-2">Remover</button>
            </div>
        </section>
    )
}