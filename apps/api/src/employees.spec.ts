import {server} from './main';
import {gql} from 'apollo-server-express';
import { reset } from '@jjballano/data/employee'


describe('Employees API', () => {

  afterEach(() => 
    reset()
  )
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

  it('adds new employee', async () => {
    await server.executeOperation({
      query: gql`
      mutation CreateEmployee {
        create(employee: {
          name: "Carlos"
          surname: "García"
          address: "Paseo Castellana"
          birthdate: "12/22/1985"
          phone: "123456789"
          email: "the@email.com"
        })
      }
      `
    });

    //I'd go to check to the database directly in a real scenario
    const employees = (await server.executeOperation({
      query: gql`
        query Employees {
          list {
            name
            surname
          }
        }
      `
    })).data.list as unknown[];
    
    expect(employees).toHaveLength(31);

    expect(employees[employees.length - 1]).toEqual({
      name: "Carlos",
      surname: "García"
    })
  });
})