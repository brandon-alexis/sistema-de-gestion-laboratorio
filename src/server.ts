import { app } from '@src/app.js';
import { port } from '@config/loadEnvironment.js';
import { dataSource } from '@config/loadDatabase.js';

const run = async () => {
  try {
    await dataSource.initialize();

    console.log('Database connected successfully');

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Error connecting to database:', error);
  }
};

app.listen(port, run);
