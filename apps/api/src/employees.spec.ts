import {server} from './main';
import {gql} from 'apollo-server-express';

describe('Employees API', () => {
  it('returns the list of employees', async () => {
    const employees = (await server.executeOperation({
      query: gql`
        query Employees {
          list {
            id
            name
          }
        }
      `
    })).data.list;
    
    expect(employees).toHaveLength(30);
    expect(employees[0]).toEqual({
      id: '1',
      name: 'Della'
    });
  });

  it('returns an employee by id', async () => {
    const employee = (await server.executeOperation({
      query: gql`
        query Employees {
          find(id: "7") {
            id
            name
          }
        }
      `
    })).data.find;

    expect(employee).toEqual({
      id: '7',
      name: 'Ruth',
    });
  });
})