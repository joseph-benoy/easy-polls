import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Register from "./components/register/register";
import LoginPage from "./components/login/login";


function App() {
  return (
    <div className="App">
          <Router>
            <Switch>
                <Route exact path="/">
                  <LoginPage/>
                </Route>
                <Route exact path="/signup">
                  <Register/>
                </Route>
                <Route path="/dashboard/:page">
                </Route>
            </Switch>
          </Router>
    </div>
  );
}

export default App;
