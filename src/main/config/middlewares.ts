import { Express } from 'express';

import { cors, bodyParser, contentType } from 'src/main/middlewares';

export default (app: Express): void => {
  app.use(cors);
  app.use(bodyParser);
  app.use(contentType);
};