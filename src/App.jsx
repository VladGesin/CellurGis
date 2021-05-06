import "./App.css";
import Navbarcomponent from "./Components/Navbar/Navbarcomponent";
import { Switch, BrowserRouter as Router } from "react-router-dom";
import Routes from "./Components/Routes/Routes";
import { Provider } from "react-redux";
import store from "./Redux/store";

//Use HashRouer is Build wont work

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Navbarcomponent />
          <Switch>
            <Routes />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
