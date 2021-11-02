import { Response, Request } from 'express';
import { GetLast3MessagesServices } from '../services/GetLast3MessagesServices';

class GetLast3MessagesController {
  async handle(request: Request, response: Response) {
    const service = new GetLast3MessagesServices();
    try {
      const result = await service.execute();
      return response.json(result);
    } catch (err) {
      return response.json({ error: err.message });
    }
  }
}

export { GetLast3MessagesController };