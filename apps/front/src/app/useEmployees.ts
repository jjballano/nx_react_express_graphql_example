import {
  useQuery,
} from "react-query";
import { request, gql } from "graphql-request";

const endpoint = "http://localhost:3333/graphql";

function useEmployees(sortBy = "id") {
  return useQuery<{id: string, name: string}[]>(`employees_${sortBy}`, async () => {
    const {list} = await request(
      endpoint,
      gql`
      query Employees($sortBy: String!) {
        list(sortBy: $sortBy) {
          id
          name
        }
      }
      `, {
        sortBy
      }
      );
    return list;
  });
}

export default useEmployees;