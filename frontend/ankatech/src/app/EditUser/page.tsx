'use client'
import { useEffect, useState } from "react"
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { FaCheck,FaEdit } from 'react-icons/fa'
import ConfirmDataUser from "./Compo/Modal"
import { ValuesHook } from "../costumHook/costHook"
import { useRouter } from 'next/navigation'

type dataClientsType={
    id:        number,
    nome:      string,
    cpf:       string,
    telefone:  string
}

export default function EditUser(){
    const [inforUser, setInfor]= useState<dataClientsType>()
    const searchParams = useSearchParams()
    const idUser = searchParams.get('id')
    const nome= searchParams.get('name')
    const cpfUser= searchParams.get('cpf')
    const {Getmensage}= ValuesHook()

    //reflexao de modificacoes nos inputs
    const [modCpf, setModCpf]= useState<string | undefined>()
    const [modPhone, setModPhone]= useState<string | undefined>()

    //habilitar inputs
    const [desableCpf, setDesableCpf]= useState(false)
    const [desableTelefone, setDesableTelefone]= useState(false)

    //funções para verificar se os dados cpf ou telefone foram modificados
    const GetDataCpf= (e: any)=>{

        const valueInput= e.target.value
        setModCpf(valueInput)
    }

    const GetDataTelefone= (e: any)=>{

        const valueInput= e.target.value
        setModPhone(valueInput)

    }

    useEffect(()=>{
        const startGetClients= async ()=>{
            try {
                const GetInforforClients= await axios.get(`http://localhost:4000/userclient/${idUser}/${inforUser?.cpf}`)
                setInfor(GetInforforClients.data)
            } catch (error) {
                console.warn(error)
            }
        }

        startGetClients()
    }, [])

    //enviar dados para o back

    useEffect(()=>{
        const cpf= inforUser?.cpf
        const Phone= inforUser?.telefone
        setModCpf(cpf)
        setModPhone(Phone)
    }, [inforUser])

    //Ativa o modal para confirmar as informacoes
    const {getsHiddenorFlexDataUser}= ValuesHook()
    const sendDataUser= ()=>{
        getsHiddenorFlexDataUser('flex')
    }

    //armazenar cpf para um possivel DELETE no banco de dados
    const [deletewithcpf, setcpf]= useState('')

    //funcao para comparar o valor recebido no input "cpf" e o cpf do cliente
    const compareCpf= (e: any)=>{
        const valueInput= e.target.value
        if(valueInput == cpfUser){
            setcpf(valueInput)
        }else{
            Getmensage([<p className="text-[#5d5d5d]">Digite o mesmo cpf!</p>])
        }
    }
    //deletar o cliente
    const router = useRouter()
    const DeleteInbd= async ()=>{
        try {
            const TransferDataUserdelete= await axios.post(`http://localhost:4000/deleteCliente/${idUser}/${deletewithcpf}`)
            router.push('/clientes')
        } catch (error) {
            console.warn(error)
        }
    }

    return(
        <section className="flex flex-col py-19 items-center px-7">
            <div className="w-full flex flex-col justify-around gap-3 py-7 px-10 border border-[#5d5d5d] rounded-2xl">
                <div>
                    <h1 className="text-[#5d5d5d] text-4xl">{nome}</h1>
                </div>
                <div className="flex flex-col gap-8">
                    <ul className="lg:grid lg:grid-cols-2 gap-4">
                        <li className="w-max">
                            <p className="text-[#5d5d5d]">Cpf</p>
                        </li>
                        <li className="flex flex-row items-center justify-between lg:justify-baseline gap-4">
                            <input onClick={()=> setDesableCpf(true)} onChange={(e)=> GetDataCpf(e)} className={`bg-white text-[#5d5d5d] lg:w-35 px-1 py-1 border-b-1 border[#5d5d5d] outline-none`} type="text" value={modCpf} readOnly={!desableCpf}/>
                            <button>{desableCpf ? <FaCheck color={"#f7c41f"}/> : <FaEdit color={"#f7c41f"}/>}</button>
                        </li>
                        <li className="w-max">
                            <p className="text-[#5d5d5d]">Telefone</p>
                        </li>
                        <li className="flex flex-row items-center justify-between lg:justify-baseline gap-4">
                            <input onClick={()=> setDesableTelefone(true)} onChange={(e)=> GetDataTelefone(e)} className={`bg-white text-[#5d5d5d] lg:w-35 px-1 py-1 border-b-1 border[#5d5d5d] outline-none`} type="text" value={modPhone} readOnly={!desableTelefone}/>
                            <button>{desableTelefone ? <FaCheck color={"#f7c41f"}/> : <FaEdit color={"#f7c41f"}/>}</button>
                        </li>
                    </ul>
                    <button onClick={sendDataUser} className="bg-black border border-none rounded-[.6rem] w-max px-2 lg:px-5 py-2">Enviar Dados</button>
                    <div className="flex flex-row justify-between items-center">
                        <p className="text-[#5d5d5d]">Gerenciar ativos do cliente</p>
                        <Link className="bg-black border border-none rounded-[.6rem] px-4 lg:px-5 py-2 lg:py-2" href={`/EditAtivosUser/?id=${idUser}`}>Gerenciar</Link>
                    </div>
                </div>

                <div className="border-1 rounded-2xl px-4 py-4 border-black">
                    <p className="text-[#5d5d5d]">ATENCAO: Para deletar, digite o cpf no campo abaixo ({cpfUser})</p>
                    <div className="flex flex-row justify-between gap-4">
                        <input onClick={()=> setDesableCpf(true)} onChange={(e)=> compareCpf(e)} className={`bg-white text-[#5d5d5d] w-35 px-1 py-1 border-b-1 border[#5d5d5d] outline-none`} type="text" value={modCpf} readOnly={!desableCpf}/>
                        <button onClick={DeleteInbd} className="bg-black border border-none rounded-[.6rem] px-4 lg:px-5 py-2 lg:py-2">Deletar</button>
                    </div>
                </div>
            </div>
            <ConfirmDataUser id={inforUser?.id} Cpf={modCpf} Telefone={modPhone} />
        </section>
    )
}