import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import {
  listCompetitionDetails,
  updateCompetition,
} from "../actions/competitionActions";
import { COMPETITION_UPDATE_RESET } from "../constants/competitionConstants";

const CompetitionEditScreen = ({ match, history }) => {
  const competitionId = match.params.id;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const competitionDetails = useSelector((state) => state.competitionDetails);
  const { loading, error, competition } = competitionDetails;

  const competitionUpdate = useSelector((state) => state.competitionUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = competitionUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: COMPETITION_UPDATE_RESET });
      history.push("/competitions");
    } else {
      if (competition.id === competitionId) {
        dispatch(listCompetitionDetails(competitionId));
      } else {
        setName(competition.name);
        setDescription(competition.description);
      }
    }
  }, [dispatch, history, competitionId, competition, successUpdate]);

  // useEffect(() => {
  //   if (successUpdate) {
  //     dispatch({ type: COMPETITION_UPDATE_RESET });
  //     history.push("/competitions");
  //   } else {
  //     if (!competition.name || competition.id !== competitionId) {
  //       dispatch(listCompetitionDetails(competitionId));
  //     } else {
  //       setName(competition.name);
  //       setDescription(competition.description);
  //     }
  //   }
  // }, [dispatch, history, competitionId, competition, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateCompetition({
        id: competitionId,
        name,
        description,
      })
    );
  };

  return (
    <>
      <Link to="/competitions" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edid Competition</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default CompetitionEditScreen;
