import { app } from '@src/app.js';
import { port } from '@config/loadEnvironment.js';
import { dataSource } from '@config/loadDatabase.js';

const run = async () => {
  await dataSource
    .initialize()
    .then(() => {
      console.log('Database connected successfully');
    })
    .catch((error: any) =>
      console.error(`Error connecting to database...`, error.message),
    );

  console.log(`Server running on port ${port}`);
};

app.listen(port, run);
