import { database } from '@/database';
import { GuestsModel } from '@/model/guests.model';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

export async function GuestsRoute (app: FastifyInstance) {
  app.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const body = request.body as GuestsModel['model'];
      body.guests = `[${body.guests}, 'X ${body.name}']`;

      await database('guests').insert({ ...body });

      reply.status(201).send();
    } catch {
      throw new Error('Error');
    }
  });

  app.post('/accept-invite/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    const id = (request.params as { id: string }).id;
    const body = request.body as { guests: string };

    try {
      await database('guests')
        .select()
        .where('id', id)
        .first()
        .update({
          guests: JSON.stringify(body.guests),
          accepted: true
        });
    } catch {
      reply.status(404).send(`Guest ${id} not found`);
    }
  });

  app.get('/no-accepted', async (_, reply: FastifyReply) => {
    const response = await database('guests').select();

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

  app.delete('/', async () => {
    try {
      await database('guests').select().delete();
    } catch {
      throw new Error('Error');
    }
  });

  app.patch('/:id', async (req: FastifyRequest, rep: FastifyReply) => {
    const body = req.body as GuestsModel['patch'];
    const id = (req.params as {id: string}).id;
    try {
      await database('guests').select().where('id', id).first().update(body);
      rep.send();
    } catch {
      throw new Error('Error');
    }
  });

  app.delete('/:id', async (req: FastifyRequest, rep: FastifyReply) => {
    const id = (req.params as {id: string}).id;
    try {
      await database('guests').select().where('id', id).first().delete();
      rep.status(204).send();
    } catch {
      throw new Error('Error');
    }
  });

  app.get('/info-guests', async () => {
    const data = await database('guests').select('guests', 'accepted') as GuestsModel['model'][];
    const all_guests = data.map(guest => guest.guests?.slice(1, guest.guests.length-1).split(',').join(',')).map(g => g!.replace(/^\\?"|\\?"$/g, '').split(',').map(g => g.trim())).join(',').split(',').map(g => g.replace('\"', '')).filter(g => g.length);
    const accepted_guests = data.filter(g => g.accepted);
    const guests_go = accepted_guests.map(guest => guest.guests?.slice(1, guest.guests.length-1).split(',').join(',')).map(g => g!.replace(/^\\?"|\\?"$/g, '').split(',').map(g => g.trim())).join(',').split(',').map(g => g.replace('\"', '')).filter(g => g.length).filter(g => g[0] === 'V');
    const guests_not_go = accepted_guests.map(guest => guest.guests?.slice(1, guest.guests.length-1).split(',').join(',')).map(g => g!.replace(/^\\?"|\\?"$/g, '').split(',').map(g => g.trim())).join(',').split(',').map(g => g.replace('\"', '')).filter(g => g.length).filter(g => g[0] === 'X');
    return {
      all_guests: { all_guests, quantity: all_guests.length },
      guests_go: { guests_go, quantity: guests_go.length },
      guests_not_go: { guests_not_go, quantity: guests_not_go.length },
      total_family: data.length, 
      total_family_accepted: accepted_guests.length
    };
  });
}