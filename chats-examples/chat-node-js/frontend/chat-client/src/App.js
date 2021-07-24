import logo from './logo.svg';
import './App.css';
import AuthPage from './pages/auth'
import ChatPage from './pages/chat'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/auth">
          <AuthPage />
        </Route>
        <Route path="/chat">
          <ChatPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
