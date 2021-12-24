import {Route, useLocation} from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import {Container, Row, Col} from "react-bootstrap";
import LoginScreen from "./screens/LoginScreen";
import DashboardScreen from "./screens/DashboardScreen";
import ProfileScreen from "./screens/ProfileScreen";
import CompetitionListScreen from "./screens/CompetitionListScreen";
import CompetitionEditScreen from "./screens/CompetitionEditScreen";
import CompetitionDetailsScreen from "./screens/CompetitionDetailsScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import TeamListScreen from "./screens/TeamListScreen";
import TeamEditScreen from "./screens/TeamEditScreen";
import ApplicationDrawer from "./components/ApplicationDrawer";

function App(props) {
    const location = useLocation();
    return (
        <>
            {/* {location.pathname !== "/" && <Header />} */}
            <Route
                render={({location}) =>
                    location.pathname !== "/" ? <Header/> : null
                }
            />

            <main className="">
                <Row className="flex-xl-nowrap gx-0">
                    {location.pathname === "/" ? null : (
                        <Col as={ApplicationDrawer} xs={12} md={3} lg={2}/>
                    )}
                    <Col xs={12} md={9} lg={10} className="p-3">
                        <Route path="/" component={LoginScreen} exact/>
                        <Route path="/teams/:id/edit" component={TeamEditScreen}/>
                        <Route path="/teams" component={TeamListScreen} exact/>
                        <Route
                            path="/competitions/:id/edit"
                            component={CompetitionEditScreen}
                        />

                        <Route
                            path="/competitions/:id/details"
                            component={CompetitionDetailsScreen}
                            exact
                        />

                        {/* <Route
              path="/competitions/:type?/:isPrivate"
              component={CompetitionListScreen}
              exact
            /> */}

                        <Route
                            path="/competitions"
                            component={CompetitionListScreen}
                            exact
                        />
                        <Route path="/dashboard" component={DashboardScreen}/>
                        <Route path="/users/:id/edit" component={UserEditScreen}/>
                        <Route path="/users" component={UserListScreen} exact/>
                        <Route path="/profile" component={ProfileScreen} exact/>
                    </Col>
                </Row>
            </main>
            <Footer/>
        </>
    );
}

export default App;
