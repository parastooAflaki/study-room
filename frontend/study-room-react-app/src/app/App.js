import "./App.css";
import "./sharedstyles/Typography.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AuthPage from "../pages/authentication/AuthPage";
import HomePage from "../pages/home/HomePage";
import { AuthProvider } from "../context/Contexts";

function App() {
  return (
    <div className="theme-light-skynight app">
      <AuthProvider>
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
      </AuthProvider>
    </div>
  );
}

export default App;
