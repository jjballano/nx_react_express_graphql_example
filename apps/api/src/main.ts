import express from 'express';
import { list } from '@jjballano/data/employee'

const app = express();

app.get('/employees', async (req, res) => {
  res.send({employees: await list()});
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);

export default app;