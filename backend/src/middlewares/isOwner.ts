import { NextFunction, Request, Response } from 'express';
import { get } from 'lodash';

export const isOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, 'identity._id') as unknown as string;

    if (!currentUserId)
      return res
        .status(400)
        .json({ Error: 'You have not permissions to do that' });
    if (currentUserId.toString() !== id)
      return res
        .status(400)
        .json({ Error: 'You have not permissions to do that' });

    next();
  } catch (error) {
    return res
      .status(400)
      .json({ Error: 'You have not permissions to do that' });
  }
};
