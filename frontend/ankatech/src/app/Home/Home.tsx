'use client'
import { useEffect, useState } from "react"
import axios from 'axios'
import Cookies from 'js-cookie'

type AtivosInfor= {
    symbol: string,
    data: any
}

type Information={
    category: string,
    headline: string,
    image: string,
    summary: string,
    url: string
}

type dataClientsType={
    id:        number,
    nome:      string,
}

export default function HomePrincipal(){
    const [InformValueDayAtivos, setInforDay]= useState< AtivosInfor []>([])
    const [userClients, setClients]= useState<dataClientsType []>([])
    const [InformDay, setInform]= useState<Information>()
    const userId = Cookies.get('userId')//resgata o id do cookie

    useEffect(()=>{
       
        const APIKEY= 'd10tdv9r01qse6ldulcgd10tdv9r01qse6lduld0'
        const SYMBOL = ['BAAPL', 'MSFT', 'GOOGL', 'AMZN']


        const GetStartInforDay= async ()=>{
            try {
                const GetValueAtivosInDay = SYMBOL.map(symbol => axios.get(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${APIKEY}`))
                const GetInfor= await axios.get(`https://finnhub.io/api/v1/news`, { params: { token: APIKEY, language: 'pt-br', limit: 1}})

                const responses = await Promise.all(GetValueAtivosInDay);
                const data = responses.map((res, index) => ({ symbol: SYMBOL[index], data: res.data}))

                setInform(GetInfor.data[0])
                setInforDay(data)
            } catch (error) {
                console.error(error)
            }
                }

        GetStartInforDay()
    }, [])

    useEffect(()=>{
        const startGetClients= async ()=>{
            try {
                const GetClientsforUser= await axios.get(`http://localhost:4000/userclient/${userId}/${null}`)
                setClients(GetClientsforUser.data[0])
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
        <section>
            <ul className="flex flex-row w-full h-max py-3 px-20 justify-between">
                {InformValueDayAtivos.map((itens)=>(
                    <li>
                        <p className="text-[#5d5d5d]">{itens.symbol}:</p>
                        <p className="text-[#f7c41f]">{itens.data.c}</p>
                    </li>
                ))}
            </ul>
            <div className="lg:grid lg:grid-cols-2 sm:flex-col lg:px-16 justify-between">
                <div className="lg:w-120 sm:w-80 flex flex-col px-4 pt-5">
                    <h1 className="text-[#f7c41f] uppercase text-[1.5em]">{InformDay?.category}</h1>
                    <div className="flex flex-col gap-2">
                        <img className="w-120" src={InformDay?.image}/>
                        <div className="flex flex-col gap-5 items-center ">
                            <h2 className="text-[#5d5d5d] text-center text-[1.3em]">{InformDay?.headline}</h2>
                            <a href={InformDay?.url}>
                                <p className="text-[#f7c41f]">{InformDay?.summary}</p>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-120 px-4 pt-5 h-max lg:h-[30em] mx-auto">
                    <h3 className="text-[#f7c41f] uppercase text-[1.5em]">Clientes</h3>
                    <ul className="flex flex-col w-full h-40 lg:h-[25em] overflow-auto border-l border-b px-4 rounded-bl-2xl border-black shadow-md gap-3">
                        {userClients.length !== 0 ? userClients.map((dataclient)=>(
                                    <li key={dataclient.id} className="grid grid-cols-3 items-center w-full px-4 h-14 border border-[#5d5d5d] rounded-[.5rem]">
                                        <p className="text-[#5d5d5d]">{dataclient.nome}</p>
                                    </li>                     
                        )) : <div className="w-full h-full flex flex-col justify-center items-center"><p className="text-[#5d5d5d]">sem clientes</p></div>}
                    </ul>
                </div>
            </div>
        </section>
    )
}