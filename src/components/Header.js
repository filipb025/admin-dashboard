import React from "react";
import {LinkContainer} from "react-router-bootstrap";
import {Navbar, Nav} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {logout} from "../actions/userActions";

const Header = () => {
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const {userInfo} = userLogin;
    console.log(userInfo)

    const logoutHandler = () => {
        dispatch(logout());
    };

    return (
        <header>
            <Navbar
                bg="dark"
                variant="dark"
                expand="lg"
                collapseOnSelect
                className="px-3"
            >
                <LinkContainer to="/dashboard">
                    <Navbar.Brand>Admin Dashboard</Navbar.Brand>
                </LinkContainer>
                <Nav className="ms-auto px-5">
                    {userInfo ? (
                        <>
                            <LinkContainer to={`/users/${userInfo.userId}/edit`}>
                                <Nav.Link>Profile</Nav.Link>
                            </LinkContainer>
                            <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
                        </>
                    ) : (
                        <Redirect to="/"/>
                    )}
                </Nav>
            </Navbar>
        </header>
    );
};

export default Header;
