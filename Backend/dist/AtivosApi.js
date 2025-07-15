import Fastify from 'fastify';
import fs from 'fs/promises';
<<<<<<< HEAD
const ServeAtivos = Fastify({ logger: true }); //Servidor e status de execulcao
ServeAtivos.get("/", async (req, res) => {
=======
import cors from '@fastify/cors';
const ServeAtivos = Fastify({ logger: true }); //Servidor e status de execulcao
await ServeAtivos.register(cors, {
    origin: "*"
});
ServeAtivos.get("/ativos", async (req, res) => {
>>>>>>> 228af65c9197710e33811b90fca8d5694cb1d4e7
    const dataItens = (await fs.readFile('./Ativos/Ativos.json')).toString(); //acessando os itens e transformando em tipo string
    const Resdata = JSON.parse(dataItens);
    res.send(Resdata);
});
<<<<<<< HEAD
const port = Number(process.env.PORT) || 3000; //3000(padrao para debug ou manutancao) ou utilize qualquer uma do servidor
=======
const port = Number(process.env.PORT) || 5000; //5000 ou utilize qualquer uma do servidor
>>>>>>> 228af65c9197710e33811b90fca8d5694cb1d4e7
ServeAtivos.listen({ port }, () => {
    console.log('rodando na porta: ' + port);
});
