'use client'//ustilizacao de hook
import { useState } from 'react';

//tipagem de dos dados
type DataUser= {
    firstName: string,
    lastName: string
    email: string
}

export default function LoginUser(){
    const [dados, setDados] = useState<DataUser>({email: "", firstName: "", lastName: ""})//dados do usuario
    const [visibeFirstname, setFirstname]= useState('0')//visilidade alert firstName
    const [visibleLastname, setLastname]= useState('0')//visibilidade alert lastname
    const [visibleemail, setemail]= useState('0')//visibilidade alert email

    //validar firstname
    const firstNamefunction= (e: any)=>{
        const nameuser= e.target.value

        const regexuser= /^[A-Za-z]+$/
        if(!regexuser.test(nameuser)){
            setFirstname('1')
        }else{
            setDados(prev => ({ ...prev, firstName: nameuser }))
            setFirstname('0')
        }
    }

    //validar lastname
    const lastnamefuction= (e: any)=>{
        const nameuser= e.target.value

        const regexuser= /^[A-Za-z]+$/
        if(!regexuser.test(nameuser)){
            setLastname('1')

        }else{
            setDados(prev => ({ ...prev, lastName: nameuser }))
            setLastname('0')
        }
    }
    //validar email
    const emailfunction= (e: any)=>{
        const emailuser= e.target.value

        const regexuser= /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!regexuser.test(emailuser)){
            setemail('1')
        }else{
            setDados(prev => ({ ...prev, lastName: emailuser }))
            setemail('0')
        }
    }

    //enviar dados
    const ConnectServerBd= ()=>{
        
    }


    return(
        <section className="flex flex-col py-28 items-center">
            <div className="w-96 h-80 flex flex-col items-center justify-center gap-6 border border-[#5d5d5d] rounded-2xl">
                <h1 className="text-[#5d5d5d] text-4xl">welcome</h1>
                <ul className="flex flex-col gap-3">
                    <li className="flex flex-row gap-2">
                        <p className="text-[#5d5d5d]">First Name</p>
                        <div>
                            <input onChange={firstNamefunction} placeholder="First Name" className="focus:outline-none border-b-1 border-[#5d5d5d] text-[#5d5d5d]" type="text" />
                            <p className={`opacity-${visibeFirstname} text-[.8rem] text-[#969696] h-[.9rem]`}>Nome invalido</p>
                        </div>
                    </li>
                    <li className="flex flex-row gap-2">
                        <p className="text-[#5d5d5d]">Last Name</p>
                        <div>
                            <input onChange={lastnamefuction} placeholder="Last Name" className="focus:outline-none border-b-1 border-[#5d5d5d] text-[#5d5d5d]" type="text" />
                            <p className={`opacity-${visibleLastname} text-[.8rem] text-[#969696] h-[.9rem]`}>Nome invalido</p>
                        </div>
                    </li>
                    <li className="flex flex-row gap-2">
                        <p className="text-[#5d5d5d]">Your Email</p>
                        <div>
                            <input onChange={emailfunction} placeholder="Your Email" className="focus:outline-none border-b-1 border-[#5d5d5d] text-[#5d5d5d]" type="text" />
                            <p className={`opacity-${visibleemail} text-[.8rem] text-[#969696] h-[.9rem]`}>Email invalido</p>
                        </div>
                    </li>
                </ul>
                <button className="bg-black border border-none rounded-[.6rem] px-15 py-2">Send</button>
            </div>
        </section>
    )
}