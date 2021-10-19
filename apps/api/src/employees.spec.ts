import app from './main';
import request from 'supertest';

describe('Employees API', () => {

  it('returns welcome message', async () => {
    const res = await request(app).get('/api');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({message: 'Welcome to api!'});
  });
})