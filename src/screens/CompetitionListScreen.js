import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import Multiselect from "multiselect-react-dropdown";
import { Route } from "react-router-dom";
import {
  Table,
  Button,
  Row,
  Col,
  Modal,
  Form,
  InputGroup,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import axios from "axios";
import {
  listCompetitions,
  deleteCompetition,
  createCompetition,
} from "../actions/competitionActions";

import { listTeams } from "../actions/teamActions";
import { COMPETITION_CREATE_RESET } from "../constants/competitionConstants";
import SearchBox from "../components/SearchBox";

const CompetitionListScreen = ({ history, match }) => {
  const type = match.params.type;
  const isPrivate = match.params.isPrivate;
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [checkCompetition, setCheckCompetition] = useState(false);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [field, setField] = useState([]);
  const dispatch = useDispatch();

  const competitionList = useSelector((state) => state.competitionList);
  const { loading, error, competitions } = competitionList;

  const teamList = useSelector((state) => state.teamList);
  const { loading: loadingTeams, error: errorTeams, teams } = teamList;

  const teamOptions = teams;

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

  const fetchData = () => {
    dispatch(listCompetitions(type, isPrivate));
  };

  useEffect(() => {
    dispatch({ type: COMPETITION_CREATE_RESET });

    if (!userInfo) {
      history.push("/");
    }
    fetchData();
    dispatch(listTeams());
  }, [
    dispatch,
    history,
    successDelete,
    successCreate,
    createdCompetition,
    userInfo,
    type,
    isPrivate,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteCompetition(id));
    }
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const onSelectHandler = (e) => {
    setSelectedTeams(Array.isArray(e) ? e.map((x) => x.id) : []);
  };

  const createCompetitionHandler = () => {
    dispatch(
      createCompetition({
        name,
        startDate,
        endDate,
        isPrivate: false,
        type: checkCompetition,
        team: [...selectedTeams],
      })
    );
  };
  console.log(createdCompetition);

  return (
    <>
      <Row className="align-items-center">
        <h1>Competitions</h1>
        <Col className="text-right d-inline-flex ">
          <Button className="my-3" onClick={handleShowModal}>
            <i className="fas fa-plus"></i> Create Competition
          </Button>
          <Route render={({ history }) => <SearchBox history={history} />} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Modal
            backdrop="static"
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={showModal}
            onHide={handleCloseModal}
          >
            <Modal.Header closeButton>
              <Modal.Title>Create Competition</Modal.Title>
            </Modal.Header>
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant="danger">{errorCreate}</Message>}
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Enter competition name"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="startDate">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    type="date"
                    placeholder="Select start date"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="endDate">
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    type="date"
                    placeholder="Select end date"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="competitionType">
                  <Form.Label className="mx-3">Type</Form.Label>
                  <Form.Check
                    type="checkbox"
                    label="Team Competition"
                    inline
                    value={checkCompetition}
                    onChange={(e) => setCheckCompetition(e.target.checked)}
                  />
                </Form.Group>
                {checkCompetition && (
                  <Multiselect
                    options={teamOptions}
                    selectionLimit={2}
                    placeholder="Select 2 Teams"
                    displayValue="name"
                    closeOnSelect={false}
                    value={selectedTeams}
                    onSelect={onSelectHandler}
                  />
                )}
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={createCompetitionHandler}>
                Create
              </Button>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}

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
              <th>Users</th>
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
                <td>{competition.users[1]}</td>
                {/* <td>{competition.teams}</td> */}
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
