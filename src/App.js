import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import LoginScreen from "./screens/LoginScreen";
import DashboardScreen from "./screens/DashboardScreen";
import ProfileScreen from "./screens/ProfileScreen";
import CompetitionListScreen from "./screens/CompetitionListScreen";
import CompetitionEditScreen from "./screens/CompetitionEditScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import TeamListScreen from "./screens/TeamListScreen";
import TeamEditScreen from "./screens/TeamEditScreen";

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
          <Route path="/teams/:id/edit" component={TeamEditScreen} />
          <Route path="/teams" component={TeamListScreen} exact />

          <Route
            path="/competitions/:type/:isPrivate"
            component={CompetitionListScreen}
            exact
          />
          <Route
            path="/competitions/:type"
            component={CompetitionListScreen}
            exact
          />
          <Route
            path="/competitions/:isPrivate"
            component={CompetitionListScreen}
            exact
          />
          <Route path="/competitions" component={CompetitionListScreen} exact />
          <Route path="/dashboard" component={DashboardScreen} />
          <Route path="/users/:id/edit" component={UserEditScreen} />
          <Route path="/users" component={UserListScreen} exact />
          <Route path="/profile" component={ProfileScreen} exact />
          <Route path="/" component={LoginScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
