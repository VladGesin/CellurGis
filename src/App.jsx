import './App.css';
import Navbarcomponent from './Components/Navbar/Navbarcomponent';
import { Switch, BrowserRouter as Router } from 'react-router-dom';
import Routes from './Components/Routes/Routes';

//Use HashRouer is Build wont work

function App() {
  return (
    <div className="App">
      <Router>
        <Navbarcomponent />
        <Switch>
          <Routes />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
