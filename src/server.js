import express from 'express';
import runCommand from './run-command';

const app = express();

app.post('/run/:command', async function (req, res) {
  try {
    console.log(`Running command ${req.params.command} with variables:\n${JSON.stringify(req.query, null, 2)}`);
    res.send(await runCommand(req.params.command, req.query));
  } catch (err) {
    console.error(err)
    res.statusCode = 500;
    res.send(err);
  }
  res.end();
});

export default app;
