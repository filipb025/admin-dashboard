import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import { listCompetitionDetails } from "../actions/competitionActions";

const CompetitionEditScreen = ({ match, history }) => {
  const competitionId = match.params.id;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const competitionDetails = useSelector((state) => state.competitionDetails);
  const { loading, error, competition } = competitionDetails;

  useEffect(() => {
    if (competition.id !== competitionId) {
      dispatch(listCompetitionDetails(competitionId));
    } else {
      setName(competition.name);
      setDescription(competition.description);
    }
  }, [dispatch, history, competitionId, competition]);

  const submitHandler = (e) => {
    e.preventDefault();
    // update comp
  };

  return (
    <>
      <Link to="/competitions" className="btn btn-light my-3">
        Go Back
      </Link>
      <Row>
        <Col md={4}>SIDEMENU</Col>
        <Col md={8}>
          <h2>Edit Competition Info</h2>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button className="my-3" type="submit" variant="primary">
                Update
              </Button>
            </Form>
          )}
        </Col>
      </Row>
    </>
  );
};

export default CompetitionEditScreen;
