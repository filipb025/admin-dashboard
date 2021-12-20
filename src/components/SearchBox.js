import React, { useState, useEffect } from "react";
import { Form, Button, Dropdown, DropdownButton } from "react-bootstrap";
import Select from "react-select";
const SearchBox = ({ history }) => {
  const [type, setType] = useState("");
  const [isPrivate, setIsPrivate] = useState("");

  const competitionType = [
    { value: "", label: "All Competitions" },
    { value: "team", label: "Team Competition" },
    { value: "user", label: "User Competition" },
  ];

  const competitionIsPrivate = [
    { value: "", label: "All Competitions" },
    { value: { 0: "Public" }, label: "Public Competition" },
    { value: { 1: "Private" }, label: "Private Competition" },
  ];

  useEffect(() => {
    setType("");
    setIsPrivate("");
  }, [type, isPrivate]);

  const handleCompetitionType = (e) => {
    setType(e.value);
    history.push(`/competitions/${e.value}/${isPrivate}`);
  };

  const handleIsPrivate = (e) => {
    setIsPrivate(e.value);
    history.push(`/competitions/${Object.keys(e.value)}`);
  };

  return (
    <>
      <Form className="d-flex align-self-center  ms-3 px-3">
        <strong className="align-self-center">Filters: </strong>
        <Select
          placeholder="Select Competition Type"
          defaultValue={type}
          onChange={handleCompetitionType}
          options={competitionType}
        />
        <Select
          placeholder="Public / Private"
          defaultValue={isPrivate}
          onChange={handleIsPrivate}
          options={competitionIsPrivate}
        />
        <Button type="submit" variant="outline-success" className="px-3 mx-3">
          Search
        </Button>
      </Form>
    </>
  );
};

export default SearchBox;
