import fs from 'fs';
import * as csvReader from 'fast-csv';
import path from 'path';

type Employee = {
  id: string;
  name: string;
  surname: string;
  address: string;
  phone: string;
  email: string;
  birthdate: string;
}

export const list = async (): Promise<Employee[]> => {

  return new Promise((resolve, reject) => {
    const rows: Employee[] = [];
    fs.createReadStream(path.resolve(__dirname, 'data.txt'))
    .pipe(csvReader.parse({ headers: headers => headers.map(h => h?.trim()) }))
    .on('error', (error) => reject(error))
    .on('data', (row: Employee) => {
      const newRow = {...row, birthdate: transformDate(row.birthdate)};
      rows.push(newRow);
    })
    .on('end', (rowCount: number) => {
      if (rows.length !== rowCount){
        reject('Error parsing data');
      }
      resolve(rows);
    });
  })
} 


export const get = async (id: string): Promise<Employee> => {

  return new Promise((resolve, reject) => {
    fs.createReadStream(path.resolve(__dirname, 'data.txt'))
    .pipe(csvReader.parse({ headers: headers => headers.map(h => h?.trim()) }))
    .on('error', (error) => reject(error))
    .on('data', (row: Employee) => {
      if (row.id === id){
        resolve({...row, birthdate: transformDate(row.birthdate)});
      }
    });
  })
} 


const transformDate = (date: string): string => {
  //Not the best way to do it but the faster I can implement now
  const [month, day, year] = date.split('/');
  return `${year}-${month}-${day}`
}
