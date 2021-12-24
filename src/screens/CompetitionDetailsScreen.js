import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Container, Row, Col, Card} from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {Link} from "react-router-dom";
import CompetitionUsers from "../components/CompetitionUsers";
import {listCompetitionDetails} from "../actions/competitionActions";

const CompetitionDetailsScreen = ({match}) => {
    const competitionId = match.params.id;
    const dispatch = useDispatch();

    const competitionDetails = useSelector((state) => state.competitionDetails);
    const {loading, error, competition} = competitionDetails;
    console.log(competition)
    useEffect(async () => {
        await dispatch(listCompetitionDetails(competitionId));
    }, [])


    return (<>
        <Row>
            <Col>
                <Link to="/competitions" className="btn btn-light my-3">
                    Go Back
                </Link>
                <Container>
                    <Card>
                        <Card.Header as="h4" style={{textTransform: "uppercase"}}>COMPETITION DETAILS -
                            TYPE {competition.type == 0 ? 'User' : 'Team'}</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <strong>Name: {competition.name}</strong>
                            </Card.Text>
                            <Card.Text>
                                <strong>Description:</strong> {competition.description}
                            </Card.Text>
                            <Card.Text>
                                <strong>Created At: </strong> {competition.created_at}
                            </Card.Text>
                            <Card.Text>
                                <strong>Start Date</strong>: {competition.start_date}
                            </Card.Text>
                            <Card.Text>
                                <strong>End Date</strong>: {competition.end_date}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Container>
            </Col>
        </Row>
        <Row>
            <Col>
                <Container className="my-4">
                    <h3>Competition Users</h3>
                    {Object.keys(competition) >= 0 ? <Loader/> : error ?
                        <Message variant='danger'>{error}</Message> : competition.type == '0' ? (
                            <CompetitionUsers competitions={competitionDetails}
                                              firstName={competition.users.map(item => item.first_name)}
                                              lastName={competition.users.map(item => item.last_name)}
                            />) : <Col>
                            <CompetitionUsers competitions={competitionDetails}
                                              firstName={competition.users.map(item => item.first_name)}
                                              lastName={competition.users.map(item => item.last_name)}
                            />
                        </Col>}
                </Container>
            </Col>
        </Row>
    </>);
};

export default CompetitionDetailsScreen;
