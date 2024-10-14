import { Dropdown } from 'react-bootstrap';
import './App.css';
import { AppRouter } from './components/appRouter';
import { NavBar } from './components/nav';
import { observer } from 'mobx-react-lite';
import { styled } from 'styled-components';

const App = observer(() => {
  return (
    <div style={{minHeight:'100vh'}}>
      <NavBar />
      <AppRouter style={{minHeight:'100vh'}}/>
    </div>
  )
})

export default App;
