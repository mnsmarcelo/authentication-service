import { MongoHelper } from 'src/infra/db';

const port = process.env.PORT || 8080;
console.log('port', port);

MongoHelper.connect(process.env.MONGODB)
  .then(async () => {
    const app = (await import('./config/app')).default;
    app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
  })
  .catch(console.error);