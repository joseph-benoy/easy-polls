import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Register from "./components/register/register";
import LoginPage from "./components/login/login";
import Dashboard from './components/dash/dashboard';
import Vote from './components/vote/vote';

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
                <Route path="/dashboard/polls/:page">
                    <Dashboard/>
                </Route>
                <Route path="/dashboard">
                    <Dashboard/>
                </Route>
                <Route path="/vote/:id">
                    <Vote/>
                </Route>
            </Switch>
          </Router>
    </div>
  );
}

export default App;
