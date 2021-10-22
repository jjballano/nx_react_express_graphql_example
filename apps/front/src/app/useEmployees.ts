import {
  useQuery,
} from "react-query";
import { request, gql } from "graphql-request";

const endpoint = "http://localhost:3333/graphql";

function useEmployees() {
  return useQuery<{id: string, name: string}[]>("employees", async () => {
    const {list} = await request(
      endpoint,
      gql`
      query Employees {
        list {
          id
          name
        }
      }
      `
      );
    return list;
  });
}

export default useEmployees;