import { database } from '@/database';
import { GuestsModel } from '@/model/guests.model';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

export async function GuestsRoute (app: FastifyInstance) {
  app.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const body = request.body as GuestsModel['model'];

      await database('guests').insert({ ...body });

      reply.status(201).send();
    } catch {
      throw new Error('Error');
    }
  });

  app.patch('/accept-invite/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    const id = (request.params as { id: string }).id;
    try {
      await database('guests')
        .select()
        .where('id', id)
        .first()
        .update({
          accepted: true
        });
    } catch {
      reply.status(404).send(`Guest ${id} not found`);
    }
  });

  app.get('/no-accepted', async (_, reply: FastifyReply) => {
    const response =
      await database('guests')
        .select()
        .where('accepted', false);

    reply.send({
      data: response,
      total: response.length
    });
  });

  app.get('/accepted', async (_, reply: FastifyReply) => {
    const response =
      await database('guests')
        .select()
        .where('accepted', true);

    reply.send({
      data: response,
      total: response.length
    });
  });
}