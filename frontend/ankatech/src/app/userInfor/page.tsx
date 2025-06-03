'use client'
import { useEffect, useState } from "react"
import Cookies from 'js-cookie';
import axios from "axios";

type userdata= {
    firstname: string,
    lastname: string,
    email: string
}

export default function UserInformation(){
    const [resdatauser, setdata]= useState<userdata>({firstname: '', lastname: '', email: ''})

    const userId = Cookies.get('userId')//resgata o id do cookie
    //faz uma requisição ao backend para pegar os dados do usuario
    useEffect(()=>{
        const startgetdatauser= async ()=>{
            try {
            const GetdataUser= await axios.get(`http://localhost:4000/user/${userId}`)
            setdata(GetdataUser.data)
            } catch (error) {
                console.warn(error)
            }
        }

        startgetdatauser()
    }, [])

    useEffect(()=>{
        console.log(resdatauser)
    }, [resdatauser])
    return(
        <section className="flex flex-col py-28 items-center">
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
        </section>
    )
}