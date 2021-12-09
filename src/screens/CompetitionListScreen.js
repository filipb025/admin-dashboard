import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  listCompetitions,
  deleteCompetition,
  createCompetition,
} from "../actions/competitionActions";
import { COMPETITION_CREATE_RESET } from "../constants/competitionConstants";

const CompetitionListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const competitionList = useSelector((state) => state.competitionList);
  const { loading, error, competitions } = competitionList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const competitionDelete = useSelector((state) => state.competitionDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = competitionDelete;

  const competitionCreate = useSelector((state) => state.competitionCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    competition: createdCompetition,
  } = competitionCreate;

  useEffect(() => {
    dispatch({ type: COMPETITION_CREATE_RESET });

    // if (userInfo) {
    //   dispatch(listCompetitions());
    // } else {
    //   history.push("/");
    // }

    if (!userInfo) {
      history.push("/");
    }

    if (successCreate) {
      history.push(`/competitions/${createdCompetition.id}/edit`);
    } else {
      dispatch(listCompetitions());
    }
  }, [
    dispatch,
    history,
    successDelete,
    successCreate,
    createdCompetition,
    userInfo,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteCompetition(id));
    }
  };

  const createCompetitionHandler = () => {
    dispatch(createCompetition());
  };

  return (
    <>
      <Row className="align-items-center">
        <Col className="text-right">
          <h1>Competitions</h1>
          <Button className="my-3" onClick={createCompetitionHandler}>
            <i className="fas fa-plus"></i> Create Competition
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}

      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table
          striped
          bordered
          hover
          responsive
          className="table-sm text-center"
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>User</th>
              <th>Teams</th>
              <th>Type</th>
              <th>Private</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {competitions.map((competition) => (
              <tr key={competition.id}>
                <td>{competition.id}</td>
                <td>{competition.name}</td>
                <td>{competition.start_date}</td>
                <td>{competition.end_date}</td>

                <td>{competition.created_at}</td>
                <td>{competition.updated_at}</td>
                <td>{competition.user}</td>
                <td>{competition.teams}</td>
                <td>{competition.type}</td>
                <td>{competition.private}</td>

                <td>
                  <LinkContainer to={`/competitions/${competition.id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(competition.id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default CompetitionListScreen;
