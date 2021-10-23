import {render, screen, within, waitFor} from '@testing-library/react';
import {mockServerHandler} from '../mocks/server';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './app';
import userEvent from '@testing-library/user-event';

describe('App', () => {
  it('shows the list of employees', async () => {
    mockServerHandler({name: 'Employees', response: {list:[
      {id: '1', name: 'Carlos'},
      {id: '2', name: 'Lucía'},
      {id: '3', name: 'Ines'},
    ]}})
    
    renderWithGraphql(<App></App>)
    const employees = await screen.findAllByRole('row');
    
    expect(employees).toHaveLength(3);
    
    expect(within(employees[0]).getByText("1")).toBeInTheDocument();
    expect(within(employees[0]).getByText("Carlos")).toBeInTheDocument();
  });

  it('allows to order by name', async () => {
    let variablesSent: {sortBy: string} = {sortBy: ''};
    mockServerHandler({name: 'Employees', response: {list:[
      {id: '3', name: 'Ines'},
      {id: '2', name: 'Lucía'},
      {id: '1', name: 'Ricardo'},
    ]}, getPayload: (body) => variablesSent = body.variables as {sortBy: string}})
    
    renderWithGraphql(<App></App>)
    
    userEvent.selectOptions(screen.getByRole('combobox'), 'name');

    return waitFor(() => {
      expect(variablesSent).toEqual({sortBy: 'name'});
    })
  });
})

const renderWithGraphql = (children: React.ReactChild) => {
  const queryClient = new QueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  ) 
}