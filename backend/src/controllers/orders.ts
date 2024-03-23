import { Request, Response } from 'express';

export class Orders {
  static async getByID(req: Request, res: Response) {
    try {
      const { id } = req.params;

      return res.status(400).json({ id });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ Error: error });
    }
  }
}
