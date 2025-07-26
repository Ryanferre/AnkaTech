'use client'
import { useState, useEffect } from "react"
import axios from "axios"

type inAbout= {
    assitenteInfor: inforDataMaxAndMin | null,
    assistenteComand: string,
    dataGraphi: ArrayInfor[] | null,
    existsButton: boolean,
    tipeIformation: string | null,
    newDayHome: string | null
}

type inforDataMaxAndMin= {
    timeMax: string,
    priceMin: number,
    timeMin: string,
    priceMax: number,
    typeName: string
}

interface ArrayInfor{
    time: string;
    price: number;
}
const Assistent= ({assitenteInfor, assistenteComand, existsButton, dataGraphi, tipeIformation, newDayHome}: inAbout)=>{
    const [visibleMensage, setVisible]= useState('flex')
    const [visibleButton, setVisibleButton]= useState('hidden')
    const [inforAboutIA, setInfor]= useState('hidden')
    const [resAssisComand, setComand]= useState('')
    const [resAssisInfor, setAssistInfor]= useState<string | ArrayInfor[] | null>('')

    const KeyIA= process.env.NEXT_PUBLIC_API_IAAssistentkey

    useEffect(()=>{
            const GetIA= ()=>{
                if(resAssisComand && resAssisInfor){
                    const options = {
                    method: 'POST',
                    url: 'https://openrouter.ai/api/v1/chat/completions',
                    headers: {
                        'Authorization': `Bearer ${KeyIA}`,
                        'Content-Type': 'application/json'
                    },
                    data: {
                        model: 'meta-llama/llama-3-8b-instruct',
                        messages: [
                        { role: "system", content: resAssisInfor},
                        { role: "user", content: resAssisComand}
                        ]
                    }
                    }
    
                    axios.request(options)
                    .then(response => {
                        setInfor(response.data.choices[0].message.content);
                    })
                    .catch(error => {
                        console.error("Erro na requisição:", error.response?.data || error.message);
                    })
                }

            }
    
            GetIA()
        }, [resAssisComand, resAssisInfor])

        const visibleOurNotMensage= ()=>{
            if(visibleMensage == 'flex'){
               setVisible('hidden')
            }else{
                setVisible('flex')
            }
        }

        useEffect(()=>{
            if(existsButton){
                setVisibleButton('flex')
            }else{
                setVisibleButton('hidden')
            }
        }, [])

        useEffect(()=>{
            console.log(dataGraphi)
            if(assistenteComand != null && assitenteInfor != null && newDayHome == null){
                setAssistInfor(`Escreva um texto sobre: ${assitenteInfor.typeName} ${tipeIformation}. Dados: preço mais alto: ${assitenteInfor.priceMax}, mais baixo: ${assitenteInfor?.priceMin}, horário do pico: ${assitenteInfor?.timeMax}, horário da mínima: ${assitenteInfor?.timeMin}.`)
                setComand(assistenteComand)
            }else{
                setAssistInfor(newDayHome)
                setComand(assistenteComand)
            }
            
        }, [assistenteComand, newDayHome, assitenteInfor])

        const showAnaliseGraphic= ()=>{
            setAssistInfor(`Você vai analisar os seguintes dados de variação de preço ao longo do tempo: ${JSON.stringify(dataGraphi)}.
                            Identifique claramente se há tendência de alta, queda ou estabilidade com base na progressão dos valores. 
                            Explique o comportamento do gráfico, mencione picos, quedas e estabilidade, se houver.
                            No fim, diga de forma clara e direta se é ou não um bom momento para investir, e justifique com base nos dados.
                            Não inclua perguntas. Responda com uma análise técnica e convincente, como um especialista faria.`);


            setComand(`Analise os dados a seguir: ${JSON.stringify(dataGraphi)}.
                       Diga se é um bom momento para investir com base em análise técnica do gráfico.
                       Seja direto, claro e persuasivo. Apresente uma conclusão objetiva e bem fundamentada, como: "Sim, é um bom momento para investir porque..." ou "Não é um bom momento para investir porque...".
                       Não use perguntas. Não diga que é uma resposta. Evite linguagem genérica ou indecisa.`);

            setVisibleButton('hidden')
        }
    return(
        <section className="absolute right-0 flex mr-5 flex-col lg:flex-row bg-white bottom-10 w-max h-max">
            <img onClick={visibleOurNotMensage} className="w-20 h-15" src="https://i.postimg.cc/pVsnQ1dS/mentoring.gif"/>
            <div className="flex flex-col gap-2">
                <p className={`${visibleMensage} text-[#5d5d5d] h-50 overflow-x-scroll w-90 text-[1em] border-1 border[#5d5d5d] rounded-[.5em] p-[.2em]`}>{inforAboutIA}</p>
                <button onClick={showAnaliseGraphic} className={`${visibleButton} bg-black border border-none rounded-[.3rem] px-3 py-0 w-max`}>Sim</button>
            </div>
        </section>
    )
}

export default Assistent