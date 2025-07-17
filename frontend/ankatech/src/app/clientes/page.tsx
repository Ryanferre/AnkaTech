'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Link from 'next/link';

type dataClientsType={
    id:        number,
    nome:      string,
    cpf:       string,
    telefone:  string
}
export default function clientList(){
    const [userClients, setClients]= useState<dataClientsType []>([])
    const userId = Cookies.get('userId')//resgata o id do cookie

    useEffect(()=>{
        const startGetClients= async ()=>{
            try {
                const GetClientsforUser= await axios.get(`http://localhost:4000/userclient/${userId}/${null}`)
                setClients([GetClientsforUser.data])

                console.log(GetClientsforUser.data)
            } catch (error) {
                console.warn(error)
            }
        }

        startGetClients()
    }, [])

    useEffect(()=>{
        console.log(userClients)
    }, [userClients])
    return(
        <section className="flex flex-col py-11 pt-32 lg:pt-0 items-center px-4 lg:px-7">
            <div className="w-full lex flex-col items-center px-3 lg:px-7 py-8 gap-17 border border-[#5d5d5d] rounded-2xl">
                <div className="flex flex-row w-full items-center justify-between py-2 border-b border-[#5d5d5d]">
                    <h1 className="text-[#5d5d5d] text-2xl">Clientes</h1>
                    <Link href="/CadasCliente" className="bg-black border border-none rounded-[.6rem] px-5 lg:px-15 py-2">Adicionar cliente</Link>
                </div>
                <ul className="flex flex-col w-full h-[20rem] px-2 pt-5 lg:px-4 border-l border-b rounded-bl-2xl border-black shadow-md gap-3">
                    {userClients.length !== 0 ? userClients.map((dataclient)=>(
                       <Link href={`/SelectAtivos?id=${dataclient.id}&name=${dataclient.nome}`} key={dataclient.id}>
                          <li className="flex flex-row justify-around items-center w-full px-4 h-14 border border-[#5d5d5d] rounded-[.5rem]">
                            <p className="text-[#5d5d5d] w-max">{dataclient.nome}</p>
                            <p className="text-[#5d5d5d] w-max">{dataclient.cpf}</p>
                            <p className="text-[#5d5d5d] w-max">{dataclient.telefone}</p>
                          </li>  
                       </Link>                      
                    )) : <div className="w-full h-full flex flex-col justify-center items-center">
                          <p className="text-[#5d5d5d]">Adicione clientes</p>
                        </div>}
                </ul>
            </div>
        </section>
    )
}