import fastify from 'fastify';
import { GuestsRoute } from './routes/guests.route';

export const app = fastify();

app.register(GuestsRoute, {
  prefix: '/guests'
});