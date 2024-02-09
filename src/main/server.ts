import { MongoHelper } from 'src/infra/db';
import { getSecretValue } from 'src/infra/aws/getSecretValue';

const port = process.env.PORT || 8080;
const mongo = process.env.MONGODB;

getSecretValue(mongo).then((res) => {
  MongoHelper.connect(res[mongo])
  .then(async () => {
    const app = (await import('./config/app')).default;
    app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
  })
  .catch(console.error);
});
