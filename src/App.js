import './App.css';
import { AppRouter } from './components/appRouter';
import { NavBar } from './components/nav';
import { observer } from 'mobx-react-lite';

const App = observer(() => {
  return (
    <div>
      <NavBar />
      <AppRouter />
    </div>
  )
})

export default App;
