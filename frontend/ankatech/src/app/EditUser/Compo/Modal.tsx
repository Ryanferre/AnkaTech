'use client'
import { ValuesHook } from "@/app/costumHook/costHook"
import axios from "axios"

type PropConfirm={
    id: number | undefined,
    Cpf: string | undefined,
    Telefone: string | undefined
}
export default function ConfirmDataUser({Cpf, Telefone, id}: PropConfirm){
    const {ModalConfirmDataUser, getsHiddenorFlexDataUser}= ValuesHook()

    //enviar dados para o back
    const sendDataUser= ()=>{

        const StartSendDataserver= async()=>{
            try{
                const sendData= await axios.post(`https://ankatech.onrender.com/sendData/${id}`, {Cpf, Telefone})

                console.log(sendData.data)
            }catch(error){
                console.warn(error)
            }
        }

        StartSendDataserver()
    }
    return(
        <section onClick={()=> getsHiddenorFlexDataUser('hidden')} className={`${ModalConfirmDataUser} flex-col w-full h-143 bg-black/50 absolute items-center justify-center`}>
            <div onClick={(e)=> e.stopPropagation()} className="w-130 bg-white h-100 flex flex-col items-center justify-center px-7 py-8 gap-17 border border-[#5d5d5d] rounded-2xl">
                <h1 className="text-[#5d5d5d] text-[2em]">Confirme os dados</h1>
                <ul className="grid grid-cols-2 gap-4">
                    <li>
                        <p className="text-[#5d5d5d]">Cpf</p>
                    </li>
                    <li>
                        <p className="text-[#5d5d5d]">{Cpf}</p>
                    </li>
                    <li>
                        <p className="text-[#5d5d5d]">Telefone</p>
                    </li>
                    <li>
                        <p className="text-[#5d5d5d]">{Telefone}</p>
                    </li>
                </ul>
                <button onClick={sendDataUser} className="bg-black border border-none rounded-[.6rem] w-max px-5 py-2">Confirmar</button>
            </div>
        </section>
    )
}