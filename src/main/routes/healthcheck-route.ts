import { Router, Response, Request } from 'express';

export default (router: Router): void => {
  router.get('/v1/status', (req: Request, res: Response) => {
    res.status(200).json('WebService');
  });
};
