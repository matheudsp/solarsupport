import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors';
import cors from 'cors';

import { router } from './routes'

const app = express();
app.use(express.json());
app.use(cors());

app.use(router);



app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if(err instanceof Error){
    //Se for uma instancia do tipo error
    return res.status(400).json({
      error: err.message
    })
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error.'
  })

})

//PRODUCTION SERVER
app.listen({
  host:'0.0.0.0',
  port: process.env.PORT ? Number(process.env.PORT) : 3333
}, () => console.log('HTTP Server Running!'))


//DEVELOPMENT SERVER
// app.listen(3333, () => console.log('Backend On-line!'))



