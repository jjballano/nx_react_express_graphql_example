import app from './main';
import request from 'supertest';

describe('Employees API', () => {

  it('returns the list of employees', async () => {
    const res = await request(app).get('/employees');
    const {employees} = res.body;

    expect(res.statusCode).toEqual(200);

    expect(employees).toHaveLength(30);
    expect(employees[0]).toEqual({
      id: '1',
      name: 'Della',
      surname: 'Cox',
      address: '4945 Lucky Duck Drive',
      phone: '412-862-8457',
      email: 'DellaDCox@superrito.com',
      birthdate: '1985-10-12'
    });
  });
})