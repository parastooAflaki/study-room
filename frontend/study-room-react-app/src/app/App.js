import "./App.css";
import "./sharedstyles/Typography.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AuthPage from "../pages/authentication/AuthPage";
import HomePage from "../pages/home/HomePage";
import { useContext } from "react";
import { AuthProvider } from "../context/authcontext/Contexts";
import SnackBar from "../components/snackbars/SnackBar";
import { closeSnackBar } from "../context/notifcontext/Actions";
import { NotifProvider, NotifContext } from "../context/notifcontext/Contexts";
function App() {
  return (
    <div className="theme-light-skynight app">
      <NotifProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </NotifProvider>
    </div>
  );
}
const AppRoutes = () => {
  const [notifState, notifDispatch] = useContext(NotifContext);

  return (
    <>
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
      <SnackBar
        open={notifState.snackOpen}
        message={notifState.snackMessage}
        mode={notifState.snackMode}
        onClose={() => closeSnackBar(notifDispatch)}
      />
    </>
  );
};

export default App;
