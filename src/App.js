import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import LoginScreen from "./screens/LoginScreen";
import DashboardScreen from "./screens/DashboardScreen";
function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/dashboard" component={DashboardScreen} />
          <Route path="/" component={LoginScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
