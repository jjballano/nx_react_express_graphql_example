import styled from 'styled-components';
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { request, gql } from "graphql-request";
import useEmployees from './useEmployees';

const StyledApp = styled.div`
  
`;

export function App() {
  const queryClient = useQueryClient();
  const { status, data, error, isFetching, refetch } = useEmployees();
  return (
    <StyledApp>
      <header className="flex">
        <h1>Welcome to front!</h1>
      </header>
      <main>
        <table>
          <tbody>
          {data?.map((employee) => {
            return <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
            </tr>
          })}
          </tbody>
        </table>    
      </main>
    </StyledApp>
  );
}

export default App;
