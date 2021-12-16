import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import { listTeamDetails, updateTeam } from "../actions/teamActions";
import {
  TEAM_UPDATE_RESET,
  TEAM_UPDATE_REQUEST,
} from "../constants/teamConstants";
import axios from "axios";
const TeamEditScreen = ({ match, history }) => {
  const teamId = match.params.id;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);

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
    }
    dispatch(listTeamDetails(teamId));
    setName(team.name);
    setDescription(team.description);
  }, [dispatch, history, teamId, successUpdate]);

  const uploadFileHandler = () => async (e, getState) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.auth.token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/team", formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateTeam({
        id: teamId,
        name,
        description,
        logo: image,
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
            <Form.Group>
              <Form.Label>Image</Form.Label>

              <Form.Control
                type="file"
                name="file"
                custom
                id="image"
                label="Choose File"
                onChange={uploadFileHandler}
              ></Form.Control>
              {uploading && <Loader />}
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
