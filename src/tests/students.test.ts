import request from 'supertest';
import { app } from '@src/app.js';

const url = 'http://localhost:5000/api/students';

describe('GET students', () => {
  test('should return 200', async () => {
    const response = await request(app).get(url);

    expect(response.status).toBe(200);
  });
});

test('app is defined', () => {
  expect(app).toBeDefined();
});
