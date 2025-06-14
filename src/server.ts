import { app } from './app';
import 'dotenv/config';
import cors from '@fastify/cors';

app.register(cors, {
  origin: 'http://127.0.0.1:5500',
  methods: ['PATCH', 'POST', 'GET'],
});

app.listen({
  port: Number(process.env.PORT) ?? 3000
}, () => console.log(`HTTP Server Running in port ${process.env.PORT ?? 3000}`));