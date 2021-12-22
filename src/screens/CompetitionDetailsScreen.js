import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import CompetitionUsers from "../components/CompetitionUsers";
import { listCompetitionDetails } from "../actions/competitionActions";

const CompetitionDetailsScreen = ({ match }) => {
  const dispatch = useDispatch();
  useEffect(async () => {
    await dispatch(listCompetitionDetails(competitionId));
  }, []);
  const competitionId = match.params.id;

  const competitionDetails = useSelector((state) => state.competitionDetails);
  const { loading, error, competition } = competitionDetails;
  console.log(competition);

  return (
    <>
      <Row>
        <Col>
          <Link to="/competitions" className="btn btn-light my-3">
            Go Back
          </Link>
          <Container>
            <Card>
              <Card.Header as="h4">COMPETITION DETAILS</Card.Header>
              <Card.Body>
                <Card.Text>
                  <strong>Name: {competition.name}</strong>
                </Card.Text>
                <Card.Text>
                  <strong>Description:</strong> Lorem Ipsum is simply dummy text
                  of the printing and typesetting industry. Lorem Ipsum has been
                  the industry's standard dummy text ever since the 1500s, when
                  an unknown printer took a galley of type and scrambled it to
                  make a type specimen book. It has survived not only five
                  centuries, but also the leap into electronic typesetting,
                  remaining essentially unchanged. It was popularised in the
                  1960s with the release of Letraset sheets containing Lorem
                  Ipsum passages, and more recently with desktop publishing
                  software like Aldus PageMaker including versions of Lorem
                  Ipsum.
                </Card.Text>
                <Card.Text>
                  <strong>Created At: </strong>
                </Card.Text>
                <Card.Text>
                  <strong>Start Date</strong>: 01-01-2022
                </Card.Text>
                <Card.Text>
                  <strong>End Date</strong>: 01-01-2023
                </Card.Text>
              </Card.Body>
            </Card>
          </Container>
        </Col>
      </Row>
      <Row>
        <Col>
          <Container className="my-4">
            <CompetitionUsers />
          </Container>
        </Col>
      </Row>
    </>
  );
};

export default CompetitionDetailsScreen;
