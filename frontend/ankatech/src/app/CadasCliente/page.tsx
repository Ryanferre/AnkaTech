"use client"
import { useState, useEffect } from "react"
import axios from 'axios';
import Cookies from 'js-cookie';
import { ValuesHook } from "../costumHook/costHook";
import { useRouter } from "next/navigation";

type datauser={
    nome: string,
    cpf: string,
    telefone: string
    userId: number
}

export default function clientcadres(){
    const [dados, setDados] = useState<datauser>({nome: '', cpf: '', telefone: '', userId: 0 })//dados do usuario
    const [visibeName, setName]= useState('0')//visilidade alert Name
    const [visibleCpf, setCpf]= useState('0')//visibilidade alert Cpf
    const [visibleTelefone, setTelefone]= useState('0')//visibilidade alert Telefone
    const userIdcookie = Cookies.get('userId')//resgata o id do cookie
    const {Getmensage, MensageInfor}= ValuesHook()

    const router = useRouter()//rota para login

    //validar name
    const firstNamefunction= (e: any)=>{
        const nameuser= e.target.value

        const regexuser= /^[A-Za-z]+$/
        if(!regexuser.test(nameuser)){
            setName('1')
        }else{
            setDados(prev => ({ ...prev, nome: nameuser }))
            setName('0')
        }
    }

    //validar cpf
    const cpffuction= (e: any)=>{
        const cpfuser= e.target.value

        const regexuser= /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/
        if(!regexuser.test(cpfuser)){
            setCpf('1')

        }else{
            setDados(prev => ({ ...prev, cpf: cpfuser }))
            setCpf('0')
        }
    }
    //validar telefone
    const Telefonefunction= (e: any)=>{
        const telefoneuser= e.target.value

        const regexuser= /^\(?\d{2}\)?\s?9?\d{4}-?\d{4}$/
        if(!regexuser.test(telefoneuser)){
            setTelefone('1')
        }else{
            setDados(prev => ({ ...prev, telefone: telefoneuser }))
            setTelefone('0')
        }
    }

    //funcao de redirecionamento
    function redirectForLogin (redirect: string){
        setTimeout(()=>{router.push(redirect)}, 3000)
    }

    //enviar dados
    const ConnectServerBd= async ()=>{

        for(let i in dados){
            const typedKey = i as keyof datauser

            if(dados[typedKey] != ''){
                try {
                    const res = await axios.post('https://ankatech.onrender.com/cadressclient', dados)
 
                    if(res.data === 'http://localhost:3000/login'){
                         Getmensage(<p className="text-black text-center">usuario nao cadastrado! <br/> Voce sera direcionado para a pagina de login</p>)
                         redirectForLogin(res.data)
                    }else if(res.data === 'erro'){
                         Getmensage(<p className="text-black">Cliente ja cadastrado!</p>)
                    }
                    else{
                        Getmensage(<p className="text-black">Cliente cadastrado com sucesso!</p>)
                    }

                } catch (erro) {
                   console.error('Erro ao cadastrar:', erro);
                   Getmensage(<p className="text-black">usuario nao cadastrado!</p>)
                }
            }else{
                Getmensage(<p className="text-black">Preencha os campos abaixo!</p>)
            }
        }
    }

    //verificacao de dados antes de colocar o id de usuario no objeto
    useEffect(()=>{
        if(dados.nome != '' && dados.cpf != '' && dados.telefone != ''){
            setDados(prev => ({ ...prev, userId: Number(userIdcookie) }))
        }
    }, [dados.nome, dados.cpf, dados.telefone])

    return(
        <section className="flex flex-col py-11 pt-32 lg:pt-0 items-center px-7">
            <div className="w-full h-85 flex flex-col justify-center gap-10 px-10 border border-[#5d5d5d] rounded-2xl">
                <p className="text-[#5d5d5d]">ATENCAO: Adicione os dados do cliente conforme presente no documento original</p>
                <ul className="grid grid-cols-2 w-70 lg:w-[30rem]">
                    <li className="w-max">
                        <p className="text-[#5d5d5d]">Name</p>
                    </li>
                    <li>
                        <input placeholder="Name" onChange={firstNamefunction} className="focus:outline-none border-b-1 w-full lg:w-90 border-[#5d5d5d] text-[#5d5d5d]" type="text" />
                        <p className="text-[.8rem] text-[#969696] h-[.9rem]" style={{opacity: `${visibeName}`}}>Nome invalido</p>
                    </li>
                    <li className="w-max">
                        <p className="text-[#5d5d5d]">cpf</p>
                    </li>
                    <li>
                        <input placeholder="Cpf" onChange={cpffuction} className="focus:outline-none border-b-1 w-full lg:w-90 border-[#5d5d5d] text-[#5d5d5d]" type="text" />
                        <p className="text-[.8rem] text-[#969696] h-[.9rem]" style={{opacity: `${visibleCpf}`}}>Cpf invalido</p>
                    </li>
                    <li className="w-max">
                        <p className="text-[#5d5d5d]">Telefone</p>
                    </li>
                    <li>
                        <input placeholder="Telefone" onChange={Telefonefunction} className="focus:outline-none border-b-1 w-full lg:w-90 border-[#5d5d5d] text-[#5d5d5d]" type="text" />
                        <p className="text-[.8rem] text-[#969696] h-[.9rem]" style={{opacity: `${visibleTelefone}`}}>Telefone invalido</p>
                    </li>
                </ul>
                <button onClick={ConnectServerBd} className="bg-black border border-none rounded-[.6rem] w-30 px-2 py-2">Send</button>
            </div>
        </section>
    )
}