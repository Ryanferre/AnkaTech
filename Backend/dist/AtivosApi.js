import Fastify from 'fastify';
import fs from 'fs/promises';
const ServeAtivos = Fastify({ logger: true }); //Servdidor e status de execulcao
ServeAtivos.get("/", async (req, res) => {
    const dataItens = (await fs.readFile('./Ativos/Ativos.json')).toString(); //acessando os itens e transformando em tipo string
    const Resdata = JSON.parse(dataItens);
    res.send(Resdata);
});
const port = Number(process.env.PORT) || 3000;
ServeAtivos.listen({ port }, () => {
    console.log('rodando na porta: ' + port);
});
