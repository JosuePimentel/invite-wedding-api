import { app } from './app';
import 'dotenv/config';
import cors from '@fastify/cors';

app.register(cors, {
  origin: '*',
  methods: ['PATCH', 'POST', 'GET'],
});

app.listen({
  host: 'RENDER' in process.env ? '0.0.0.0' : 'localhost',
  port: Number(process.env.PORT) ?? 3000
}, () => console.log(`HTTP Server Running in port ${process.env.PORT ?? 3000}`));