import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listCompetitions } from "../actions/competitionActions";

const CompetitionListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const competitionList = useSelector((state) => state.competitionList);
  const { loading, error, competitions } = competitionList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      dispatch(listCompetitions());
    } else {
      history.push("/");
    }
  }, [dispatch, history]);

  const deleteHandler = (id) => {
    console.log("delete");
  };

  return (
    <>
      <h1>Competitions</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {competitions.map((competition) => (
              <tr key={competition.id}>
                <td>{competition.id}</td>
                <td>{competition.name}</td>
                <td>{competition.description}</td>
                <td>{competition.start_date}</td>
                <td>{competition.end_date}</td>

                <td>
                  <LinkContainer to={`/competition/${competition.id}/edit`}>
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
