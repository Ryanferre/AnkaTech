"use client" //utilizacao de hook
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

//tipagem de dos dados
type DataUser= {
    firstname: string,
    lastname: string
    email: string
}

type DataLogin={
    firstname: string,
    email: string
}

export default function LoginUser(){
    const [dados, setDados] = useState<DataUser>({firstname: '', lastname: '', email: ''})//dados de cadastro do usuario
    const [datalogin, setLogin]= useState<DataLogin>({firstname: '', email: ''})
    const [visibeFirstname, setFirstname]= useState('0')//visilidade alert firstName
    const [visibleLastname, setLastname]= useState('0')//visibilidade alert lastname
    const [visibleemail, setemail]= useState('0')//visibilidade alert email
    const [alter, setAlter]= useState('Login')
    const [flexLogin, setflexLogin]= useState('hidden')
    const [flexLogout, setFlexlogout]= useState('flex')


    //validar firstname
    const firstNamefunction= (e: any)=>{
        const nameuser= e.target.value

        const regexuser= /^[A-Za-z]+$/
        if(!regexuser.test(nameuser)){
            setFirstname('1')
        }else{
            setDados(prev => ({ ...prev, firstname: nameuser }))
            setFirstname('0')
        }
    }

    //validar lastname para cadastro
    const lastnamefuction= (e: any)=>{
        const nameuser= e.target.value

        const regexuser= /^[A-Za-z]+$/
        if(!regexuser.test(nameuser)){
            setLastname('1')

        }else{
            setDados(prev => ({ ...prev, lastname: nameuser }))
            setLastname('0')
        }
    }
    //validar email para cadastro
    const emailfunction= (e: any)=>{
        const emailuser= e.target.value

        const regexuser= /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!regexuser.test(emailuser)){
            setemail('1')
        }else{
            setDados(prev => ({ ...prev, email: emailuser }))
            setemail('0')
        }
    }



    //enviar dados
    const ConnectServerBd= async ()=>{
        try {
            const res = await axios.post('http://localhost:4000/cadastro', dados);
            if(res.data){
                Cookies.set('userId', res.data.id.toString(), {
                path: '/',
            });
            }
        } catch (erro) {
            console.error('Erro ao cadastrar:', erro);
        }
    }

    //alterar entre login e logout
    const LaterInfor= ()=>{
        if(alter=="Login"){
            setAlter('Logout')
            setflexLogin('flex')
            setFlexlogout('hidden')
        }else{
            setAlter('Login')
            setflexLogin('hidden')
            setFlexlogout('flex')
        }
    }

    //validar dados de login do cliente
    //validar email para login
    const emailLoginfunction= (e: any)=>{
        const emailuser= e.target.value

        const regexuser= /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!regexuser.test(emailuser)){
            setemail('1')
        }else{
            setLogin(prev => ({ ...prev, email: emailuser }))
            setemail('0')
        }
    }

    //validar nome para login
    const firstLoginNamefunction= (e: any)=>{
        const nameuser= e.target.value

        const regexuser= /^[A-Za-z]+$/
        if(!regexuser.test(nameuser)){
            setFirstname('1')
        }else{
            setLogin(prev => ({ ...prev, firstname: nameuser }))
            setFirstname('0')
        }
    }

    //login de usuario
    const login= async ()=>{
        try {
            const res = await axios.get(`http://localhost:4000/user/${datalogin.email}`);
            if(res.data){
                Cookies.set('userId', res.data.id.toString(), {
                path: '/',
            });
            }
        } catch (erro) {
            console.error('Erro ao cadastrar:', erro);
        }
    }
    return(
        <section className="flex flex-col py-28 gap-3 items-center">
            <div className={`w-96 h-80 ${flexLogout} flex-col items-center justify-center gap-6 border border-[#5d5d5d] rounded-2xl`}>
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
                <button className="bg-black border border-none rounded-[.6rem] px-15 py-2" onClick={ConnectServerBd}>Send</button>
            </div>
            <div className={`w-96 h-80 ${flexLogin} flex-col items-center justify-center gap-6 border border-[#5d5d5d] rounded-2xl`}>
                <h1 className="text-[#5d5d5d] text-4xl">Login</h1>
                <ul className="flex flex-col gap-3">
                    <li className="flex flex-row gap-2">
                        <p className="text-[#5d5d5d]">First Name</p>
                        <div>
                            <input onChange={firstLoginNamefunction} placeholder="First Name" className="focus:outline-none border-b-1 border-[#5d5d5d] text-[#5d5d5d]" type="text" />
                            <p className={`opacity-${visibeFirstname} text-[.8rem] text-[#969696] h-[.9rem]`}>Nome invalido</p>
                        </div>
                    </li>
                    <li className="flex flex-row gap-2">
                        <p className="text-[#5d5d5d]">Your Email</p>
                        <div>
                            <input onChange={emailLoginfunction} placeholder="Your Email" className="focus:outline-none border-b-1 border-[#5d5d5d] text-[#5d5d5d]" type="text" />
                            <p className={`opacity-${visibleemail} text-[.8rem] text-[#969696] h-[.9rem]`}>Email invalido</p>
                        </div>
                    </li>
                </ul>
                <button className="bg-black border border-none rounded-[.6rem] px-15 py-2" onClick={login}>Send</button>
            </div>
            <button className="bg-black border border-none rounded-[.6rem] px-15 py-2" onClick={LaterInfor}>{alter}</button>
        </section>
    )
}