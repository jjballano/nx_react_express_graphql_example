import useEmployees from './useEmployees';

type Props = {
  sortBy: string;
}

const Employees = ({sortBy = 'id'}: Props) => {
  const { data } = useEmployees(sortBy);
  return <table>
    <tbody>
    {data?.map((employee) => {
      return <tr key={employee.id}>
        <td>{employee.id}</td>
        <td>{employee.name}</td>
      </tr>
    })}
    </tbody>
</table>  
}

export default Employees;