import React, { useState, useEffect } from "react";
import { Form, Button, Dropdown, DropdownButton } from "react-bootstrap";

const SearchBox = ({ history }) => {
  const [type, setType] = useState(0);
  const [isPrivate, setIsPrivate] = useState(0);

  const submitHandler = (e) => {
    e.preventDefault();

    if (type || isPrivate) {
      history.push(`/competitions/${type}/${isPrivate}`);
    } else {
      history.push("/competitions");
    }
  };

  const handleSelectType = (e) => {
    setType(e);
  };
  const handleSelectIsPrivate = (e) => {
    setIsPrivate(e);
  };

  return (
    <>
      <Form
        onSubmit={submitHandler}
        className="d-flex align-self-center  ms-3 px-3"
        inline
      >
        <strong className="align-self-center">Filters: </strong>
        <DropdownButton
          className="px-1"
          title="Competition Type"
          id="dropdown-menu-align-right"
          onSelect={handleSelectType}
        >
          <Dropdown.Item eventKey="1">User Competitions</Dropdown.Item>
          <Dropdown.Item eventKey="0">Team Competitions</Dropdown.Item>
        </DropdownButton>

        <DropdownButton
          className="px-1"
          title="Public / Private"
          id="dropdown-menu-align-right"
          onSelect={handleSelectIsPrivate}
        >
          <Dropdown.Item eventKey="1">Private Competitions</Dropdown.Item>
          <Dropdown.Item eventKey="0">Public Competitions</Dropdown.Item>
        </DropdownButton>

        <Button type="submit" variant="outline-success" className="px-3 mx-3">
          Search
        </Button>
      </Form>
    </>
  );
};

export default SearchBox;
