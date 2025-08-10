'use client'
import { useEffect, useState } from "react"
import Cookies from 'js-cookie';
import axios from "axios";
import { useRouter } from 'next/navigation';

type userdata= {
    firstname: string,
    lastname: string,
    email: string
}

export default function UserInformation(){
    const [resdatauser, setdata]= useState<userdata>({firstname: '', lastname: '', email: ''})
    const router = useRouter()//rota apos deletar usuario ou sair da conta

    const userId = Cookies.get('userId')//resgata o id do cookie
    //faz uma requisição ao backend para pegar os dados do usuario
    useEffect(()=>{
        const startgetdatauser= async ()=>{
            try {
            const GetdataUser= await axios.get(`https://ankatech.onrender.com/user/${userId}`)
            setdata(GetdataUser.data)
            } catch (error) {
                console.warn(error)
            }
        }

        startgetdatauser()
    }, [])

    const deleteUser= async()=>{
        try {
            const resAplication= await axios.post(`https://ankatech.onrender.com/user/${resdatauser.email}/${userId}`)

            if(resAplication){
                Cookies.remove('userId', { path: '/' })
                router.push('/')
            }
        } catch (error) {
            console.error(error)
        }
    }

    const exitFromAcount= ()=>{
        Cookies.remove('userId', { path: '/' })
        if(!userId){
            router.push('/')
        }else{
            console.log(userId)
        }
    }
    return(
        <section className="flex flex-col py-28 gap-10 items-center">
            <div className="w-96 h-80 flex flex-col items-center justify-center gap-10 border border-[#5d5d5d] rounded-2xl">
                <h1 className="text-[#5d5d5d] text-4xl">My account</h1>
                <ul className="flex flex-col gap-3">
                    <li className="flex flex-row gap-2">
                        <p className="text-[#5d5d5d]">First Name</p>
                        <p className='text-[#969696]'>{resdatauser.firstname}</p>
                    </li>
                    <li className="flex flex-row gap-2">
                        <p className="text-[#5d5d5d]">Last Name</p>
                        <p className='text-[#969696]'>{resdatauser.lastname}</p>
                    </li>
                    <li className="flex flex-row gap-2">
                        <p className="text-[#5d5d5d]">Your Email</p>
                        <p className='text-[#969696]'>{resdatauser.email}</p>
                    </li>
                </ul>
            </div>
            <div className="flex flex-row gap-10">
             <button className="bg-black border border-none rounded-[.6rem] px-15 py-2" onClick={deleteUser}>Delete</button>
             <button className="bg-black border border-none rounded-[.6rem] px-15 py-2" onClick={exitFromAcount}>Exit</button>
            </div>
        </section>
    )
}