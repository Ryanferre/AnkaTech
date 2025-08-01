import fs from 'fs/promises';
export function ServerAtivos(Server) {
    Server.get("/ativos", async (req, res) => {
        const dataItens = (await fs.readFile('./Ativos/Ativos.json')).toString(); //acessando os itens e transformando em tipo string
        const Resdata = JSON.parse(dataItens);
        res.send(Resdata);
    });
    Server.get("/getdatagraphic/:typeName/:type", async (req, res) => {
        const { typeName, type } = req.params;
        console.log(typeName, type);
        switch (type) {
            case 'Ação':
                try {
                    const getinApi = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${typeName}.SA`);
                    if (!getinApi.ok) {
                        const errorText = await getinApi.text();
                        console.log(errorText);
                        return res.status(500).send({
                            error: 'Erro ao buscar dados externos',
                            status: getinApi.status,
                            detail: errorText
                        });
                    }
                    else {
                        const responseinjson = await getinApi.json();
                        const resulte = responseinjson.chart.result[0];
                        const timestamps = resulte?.timestamp || [];
                        const closes = resulte.indicators.quote[0].close;
                        const data = timestamps.map((ts, index) => ({
                            time: new Date(ts * 1000).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
                            price: closes[index]
                        }));
                        res.send(data);
                    }
                }
                catch (error) {
                    res.send(error);
                }
            case 'Cripto':
                try {
                    const getinApi = await fetch(`https://min-api.cryptocompare.com/data/v2/histohour?fsym=${typeName}&tsym=USD&limit=27`);
                    const responseinjson = await getinApi.json();
                    const data = responseinjson.Data.Data.map(candle => ({
                        time: new Date(candle.time * 1000).toLocaleTimeString('pt-BR', {
                            hour: '2-digit',
                            minute: '2-digit'
                        }),
                        price: Number(candle.close.toFixed(2))
                    }));
                    res.send(data);
                }
                catch (error) {
                    res.send(error);
                }
            case 'commodity':
                try {
                    const decodeName = decodeURIComponent(typeName);
                    const getinApi = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${decodeName}?range=1d&interval=5m`);
                    console.log(getinApi);
                    const responseinjson = await getinApi.json();
                    const resulte = responseinjson.chart.result[0];
                    const timestamps = resulte?.timestamp || [];
                    const closes = resulte.indicators.quote[0].close;
                    const data = timestamps.map((ts, index) => ({
                        time: new Date(ts * 1000).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
                        price: closes[index]
                    }));
                    console.log(data);
                    res.send(data);
                }
                catch (error) {
                    res.send(error);
                }
                break;
            default:
                break;
        }
    });
}
