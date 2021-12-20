import { Route, useLocation } from "react-router-dom";
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
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/" && <Header />}

      <main className="py-3">
        <Container>
          <Route path="/" component={LoginScreen} exact />
          <Route path="/teams/:id/edit" component={TeamEditScreen} />
          <Route path="/teams" component={TeamListScreen} exact />
          <Route
            path="/competitions/:id/edit"
            component={CompetitionEditScreen}
            exact
          />

          <Route
            path="/competitions/:type/:isPrivate?"
            component={CompetitionListScreen}
          />

          <Route path="/competitions" component={CompetitionListScreen} exact />
          <Route path="/dashboard" component={DashboardScreen} />
          <Route path="/users/:id/edit" component={UserEditScreen} />
          <Route path="/users" component={UserListScreen} exact />
          <Route path="/profile" component={ProfileScreen} exact />
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
