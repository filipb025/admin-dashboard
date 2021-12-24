import "react-bootstrap-drawer/lib/style.css";
import React, {useState} from "react";
import {Collapse, Nav} from "react-bootstrap";
import {Drawer} from "react-bootstrap-drawer";
import {LinkContainer} from "react-router-bootstrap";

const ApplicationDrawer = (props) => {
    const [open, setOpen] = useState(false);

    const handleToggle = () => setOpen(!open);
    return (
        <Drawer {...props}>
            <Drawer.Toggle onClick={handleToggle}/>

            <Collapse in={open}>
                <Drawer.Overflow>
                    <Drawer.ToC>
                        <Drawer.Nav>
                            <LinkContainer to="/dashboard">
                                <Nav.Link>Dashboard</Nav.Link>
                            </LinkContainer>
                        </Drawer.Nav>
                        <LinkContainer to="/teams">
                            <Nav.Link>Teams</Nav.Link>
                        </LinkContainer>
                        <Drawer.Nav>
                            <LinkContainer to="/users">
                                <Nav.Link>Users</Nav.Link>
                            </LinkContainer>
                        </Drawer.Nav>
                        <Drawer.Nav>
                            <LinkContainer to="/competitions">
                                <Nav.Link>Competitions</Nav.Link>
                            </LinkContainer>
                        </Drawer.Nav>
                    </Drawer.ToC>
                </Drawer.Overflow>
            </Collapse>
        </Drawer>
    );
};

export default ApplicationDrawer;
