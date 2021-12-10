import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import { listTeamDetails, updateTeam } from "../actions/teamActions";
import { TEAM_UPDATE_RESET } from "../constants/teamConstants";

const TeamEditScreen = ({ match, history }) => {
  const teamId = match.params.id;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const teamDetails = useSelector((state) => state.teamDetails);
  const { loading, error, team } = teamDetails;

  const teamUpdate = useSelector((state) => state.teamUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = teamUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: TEAM_UPDATE_RESET });
      history.push("/teams");
    } else {
      if (team.id !== teamId) {
        dispatch(listTeamDetails(teamId));
      } else {
        setDescription(description);
        setName(team.name);
      }
    }
  }, [dispatch, history, teamId, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateTeam({
        id: teamId,
        name,
        description,
      })
    );
  };

  return (
    <>
      <Link to="/teams" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Teams</h1>
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
                type="text"
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
            <Button className="my-3" type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default TeamEditScreen;
