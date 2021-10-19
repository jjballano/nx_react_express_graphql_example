import express from 'express';
import { list, get } from '@jjballano/data/employee'

const app = express();

app.get('/employees/:id', async (req, res) => {
  res.send(await get(req.params.id));
});

app.get('/employees', async (req, res) => {
  res.send({employees: await list()});
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);

export default app;