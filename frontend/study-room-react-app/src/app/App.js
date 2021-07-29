import "./App.css";
import "./sharedstyles/Typography.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AuthPage from "../pages/authentication/AuthPage";
import HomePage from "../pages/home/HomePage";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/auth">
          <AuthPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
