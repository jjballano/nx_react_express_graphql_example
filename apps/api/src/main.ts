import express from 'express';
import { list, get } from '@jjballano/data/employee'

const app = express();

//Routes could go to its own file, but in this case there will be only a few of them, so I'll leave them here
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