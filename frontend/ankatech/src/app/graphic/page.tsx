'use client'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import axios from 'axios'
import Assistent from '../Componentes/Assistente/assistente'
import { type } from 'node:os'

type dataGraphic= {
    time: string,
    price: number
}

type inforDataMaxAndMin= {
    timeMax: string,
    priceMin: number,
    timeMin: string,
    priceMax: number,
    typeName: string
}


const GraphicCripto= ()=>{
    const searchParams = useSearchParams()
    const [DataGraphic, sentData]= useState<dataGraphic []> ([])
    const nameActive= searchParams.get('namecripto')
    const typeName= searchParams.get('type')
    const [topBottomPrice, setBottomTop]= useState<inforDataMaxAndMin>({timeMax: '', priceMax: 0, timeMin: '', priceMin: 0, typeName: ''})

    useEffect(()=>{

        const getDataforGraphic= async ()=>{

            let encodeName;

            if(nameActive == "GC=F"){
                encodeName= encodeURIComponent(nameActive)
                try {
                const getinserver= await axios.get(`http://localhost:5000/getdatagraphic/${encodeName}/${typeName}`)

                sentData(getinserver.data)

                console.log(getinserver.data)
                } catch (error) {
                    console.log(error)
                }
            }else{
               try {
                const getinserver= await axios.get(`http://localhost:5000/getdatagraphic/${nameActive}/${typeName}`)

                sentData(getinserver.data)

                console.log(getinserver.data)
                } catch (error) {
                    console.log(error)
                } 
            }
        }
        getDataforGraphic()
    }, [])

    useEffect(()=>{
        const maxItem= Math.max(...DataGraphic.map(item => item.price))
        const minItem= Math.min(...DataGraphic.filter(item => item.price != null).map(item => item.price))

        let maxTime= ''
        let mintime= ''

        
        for(let i=0; i < DataGraphic.length; i++){
            if(maxItem == DataGraphic[i].price){
                maxTime= DataGraphic[i].time
            }
        }

        for(let i=0; i < DataGraphic.length; i++){
            if(minItem == DataGraphic[i].price || DataGraphic[i].price == null){
                mintime= DataGraphic[i].time
            }
        }

        if(maxItem != -Infinity && mintime != ""){
            setBottomTop(prev=> ({...prev, timeMax: maxTime, timeMin: mintime, priceMax: maxItem, priceMin: minItem}))
        }
    }, [DataGraphic])

    
    return(
        <section className='w-full h-full px-6 flex flex-col gap-8'>
            <h1 className="text-[#f7c41f] uppercase text-[1.5em]">{nameActive}</h1>
            <div>
                <ResponsiveContainer width="100%" height={300}>
                 <LineChart data={DataGraphic}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={['auto', 'auto']} />
                    <Tooltip />
                    <Line type="monotone" dataKey="price" stroke="#f7c41f" strokeWidth={2} dot={false} />
                </LineChart>
                </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2">
                <label className="flex flex-row h-max items-center gap-4">
                    <img src="https://i.postimg.cc/ZR30jFxg/eixo.png" />
                    <div>
                        <p className="text-[#5d5d5d] text-[1em]">Y: Price</p>
                        <p className="text-[#5d5d5d] text-[1em]">X: Time</p>
                    </div>
                </label>
                <label className="flex flex-row h-max items-center gap-4">
                    <span className="inline-block w-2.5 h-2.5 bg-[#f7c41f] rounded-full"></span>
                    <p className="text-[#5d5d5d] text-[1em]">Preço de fechamento</p>
                </label>
            </div>
            <div className="grid grid-cols-2">
                <label>
                    <p className="text-[#5d5d5d] text-[1em]">Alta: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(topBottomPrice?.priceMax)}</p>
                    <p className="text-[#5d5d5d] text-[1em]">Horario: {topBottomPrice?.timeMax}</p>
                </label>
                <label>
                    <p className="text-[#5d5d5d] text-[1em]">Baixa: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(topBottomPrice?.priceMin)}</p>
                    <p className="text-[#5d5d5d] text-[1em]">Horario: {topBottomPrice?.timeMin}</p>
                </label>
            </div>
            <Assistent assitenteInfor={topBottomPrice} assistenteComand="Você é um assistente de uma empresa que apresenta gráficos. Responda com um texto objetivo e direto, iniciando com 'O gráfico revela que' Finalize o texto com 'Deseja que eu faca uma analise detalhada do grafico e diga se e um bom momento para investir'. Não mencione que é uma resposta. O texto deve ter no máximo 80 caracteres." existsButton={true} dataGraphi={DataGraphic} tipeIformation={`${nameActive} `} newDayHome={null}/>
        </section>
    )
}

export default GraphicCripto