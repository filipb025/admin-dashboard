import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import LoginScreen from "./screens/LoginScreen";
import DashboardScreen from "./screens/DashboardScreen";
import ProfileScreen from "./screens/ProfileScreen";
import CompetitionListScreen from "./screens/CompetitionListScreen";
import CompetitionEditScreen from "./screens/CompetitionEditScreen";

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route
            path="/competitions/:id/edit"
            component={CompetitionEditScreen}
          />
          <Route path="/competitions" component={CompetitionListScreen} />
          <Route path="/dashboard" component={DashboardScreen} />
          <Route path="/profile" component={ProfileScreen} exact />
          <Route path="/" component={LoginScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
