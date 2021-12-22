import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Form, Button, Dropdown, DropdownButton } from "react-bootstrap";
import { listCompetitions } from "../actions/competitionActions";
import Select from "react-select";
const SearchBox = ({ history, searchKeyword, term }) => {
  const dispatch = useDispatch();
  const [type, setType] = useState("");
  const [isPrivate, setIsPrivate] = useState("");
  const inputEl = useRef("");

  const competitionType = [
    { value: "", label: "All Competitions" },
    { value: "team", label: "Team Competition" },
    { value: "user", label: "User Competition" },
  ];

  const competitionIsPrivate = [
    { value: "", label: "All Competitions" },
    { value: "public", label: "Public Competition" },
    { value: "private", label: "Private Competition" },
  ];
  const handleCompetitionType = (e) => {
    setType(e.value);
    dispatch(listCompetitions(e.value, isPrivate));
  };
  const handleIsPrivate = (e) => {
    setIsPrivate(e.value);
    dispatch(listCompetitions(type, e.value));
  };

  useEffect(() => {}, [type, isPrivate, handleCompetitionType]);

  const getSearchTerm = () => {
    searchKeyword(inputEl.current.value);
  };
  const clearFiltersHandler = () => {
    setType("");
    setIsPrivate("");
    history.push("/competitions");
  };

  return (
    <>
      <Form className="d-flex align-self-center  ms-3 px-3">
        <strong className="align-self-center">Filters: </strong>
        <Select
          className="mx-1"
          placeholder="Select Competition Type"
          defaultValue={type}
          onChange={handleCompetitionType}
          options={competitionType}
        />
        <Select
          className="mx-1"
          placeholder="Public / Private"
          defaultValue={isPrivate}
          onChange={handleIsPrivate}
          options={competitionIsPrivate}
        />
        <Form.Group className="mx-1">
          <Form.Control
            ref={inputEl}
            type="text"
            placeholder="Search..."
            onChange={getSearchTerm}
            value={term}
          />
        </Form.Group>
        <Button
          type="submit"
          variant="outline-success"
          className="px-3 mx-3"
          onClick={clearFiltersHandler}
        >
          Clear Filters
        </Button>
      </Form>
    </>
  );
};

export default SearchBox;
