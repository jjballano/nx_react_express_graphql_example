import styled from 'styled-components';
import { useState } from 'react';
import Employees from './employees';

const StyledApp = styled.div`
  
`;

const App = () => {
  const [order, setOrder] = useState("id");

  return (
    <StyledApp>
      <header className="flex">
        <h1>Welcome to front!</h1>
      </header>
      <main>
        <select onChange={(selected) => setOrder(selected.target.value)}>
          <option value="id">Id</option>
          <option value="name">Name</option>
        </select>
        <Employees sortBy={order}></Employees>   
      </main>
    </StyledApp>
  );
}

export default App;
