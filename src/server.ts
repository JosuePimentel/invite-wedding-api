import { app } from './app';
import 'dotenv/config';

app.listen({
  port: Number(process.env.PORT) ?? 3000
}, () => console.log(`HTTP Server Running in port ${process.env.PORT ?? 3000}`));