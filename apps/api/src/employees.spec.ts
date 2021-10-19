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

  it('returns an employee by id', async () => {
    const res = await request(app).get('/employees/7');
    const employee = res.body;

    expect(res.statusCode).toEqual(200);

    expect(employee).toEqual({
      id: '7',
      name: 'Ruth',
      surname: 'Story',
      address: '3474 White Oak Drive',
      phone: '816-761-4637',
      email: 'RuthPStory@dayrep.com',
      birthdate: '1963-11-28'
    });
  });
})