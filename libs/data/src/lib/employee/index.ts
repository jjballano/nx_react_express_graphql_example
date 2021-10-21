import { gql } from 'apollo-server-express';
import { employees, add, reset } from './db';

type Employee = {
  id: string;
  name: string;
  surname: string;
  address: string;
  phone: string;
  email: string;
  birthdate: string;
}

const list = async (): Promise<Employee[]> => {
  //In the "real world", this would be a repository with some "select xxx from employees";
  return employees();
}

const get = async (_, {id}: {id: string}): Promise<Employee> => {
  //In the "real world", this would be a repository with some "select xxx from employees where id = $1";
  return employees().then((list) => {
    return list.find(e => e.id === id);
  })
} 

const create = async (_, {employee}: {employee: Omit<Employee, 'id'>}): Promise<string> => {
  return add({...employee});
}

export {reset}

export const typeDefs = gql`
  type Employee {
    id: String
    name: String
    surname: String
    address: String
    phone: String
    email: String
    birthdate: String
  }

  type Query {
    list: [Employee]
    find(id: String): Employee
  }

  input NewEmployee {
    name: String
    surname: String
    address: String
    phone: String
    email: String
    birthdate: String
  }

  type Mutation {
    create(employee: NewEmployee): ID 
  }
`;

export const resolvers = {
  Query: {
    list: list,
    find: get
  },
  Mutation: {
    create: create
  }
};
