import Fastify from 'fastify'
import fs from 'fs/promises'
import cors from '@fastify/cors'

const ServeAtivos= Fastify({logger: true})//Servidor e status de execulcao
await ServeAtivos.register(cors, {
  origin: "*"
})

ServeAtivos.get("/ativos", async (req: any, res)=>{
    const dataItens= (await fs.readFile('./Ativos/Ativos.json')).toString()//acessando os itens e transformando em tipo string

    const Resdata= JSON.parse(dataItens)

    res.send(Resdata)
})

ServeAtivos.get("/getdatagraphic/:typeName/:type", async (req: any, res)=>{
  const {typeName, type}= req.params

  console.log(typeName, type)
  switch (type) {
    case 'Ação':
      try {
        const getinApi= await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${typeName}.SA`)


         const responseinjson= await getinApi.json() as {chart: {result: {timestamp: number[], indicators: {quote: [{ close: number[] }]}}[]}}

                const resulte = responseinjson.chart.result[0]
                const timestamps = resulte?.timestamp || []
                const closes = resulte.indicators.quote[0].close

                const data = timestamps.map((ts: number, index: number) => ({
                time: new Date(ts * 1000).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
                price: closes[index]
            })) as [{time: string, price:number}]

         res.send(data)
        } catch (error) {
          res.send(error)
        }

        case 'Cripto':
         try {
          const getinApi= await fetch(`https://min-api.cryptocompare.com/data/v2/histohour?fsym=${typeName}&tsym=USD&limit=27`)


          const responseinjson= await getinApi.json() as {Response: string, Data: {Aggregated: boolean, TimeFrom: number, TimeTo: number, Data: [{time: number, higth: number, low: number, open: number, volumefrom: number, volumeto: number, close: number, conversionType: string, conversioSymbol: string}]}}

                  const data = responseinjson.Data.Data.map(candle => ({
                              time: new Date(candle.time * 1000).toLocaleTimeString('pt-BR', {
                                hour: '2-digit',
                                minute: '2-digit'
                              }),
                              price: Number(candle.close.toFixed(2))
                            }));

                            res.send(data)
              
          } catch (error) {
            res.send(error)
          }
      
      case 'commodity':
        try {
         const decodeName= decodeURIComponent(typeName)
         const getinApi= await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${decodeName}?range=1d&interval=5m`)

         console.log(getinApi)

         const responseinjson= await getinApi.json() as {chart: {result: {timestamp: number[], indicators: {quote: [{ close: number[] }]}}[]}}

                const resulte = responseinjson.chart.result[0]
                const timestamps = resulte?.timestamp || []
                const closes = resulte.indicators.quote[0].close

                const data = timestamps.map((ts: number, index: number) => ({
                time: new Date(ts * 1000).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
                price: closes[index]
            })) as [{time: string, price:number}]

         console.log(data)

         res.send(data)
        } catch (error) {
          res.send(error)
        }
      break;
  
    default:
      break;
  }
})

const Port=  Number(process.env.PORT) || 5000//5000 ou utilize qualquer uma do servidor

ServeAtivos.listen({ port: Port, host: '0.0.0.0' }, ()=>{
    console.log('rodando na porta: ' + Port)
})
