import React from "react";
import { Table } from "react-bootstrap";
const CompetitionUsers = () => {
  return (
    <>
      <Table striped bordered hover responsive className="table-sm text-center">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date Joined</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John</td>
            <td>Doe</td>
            <td>21-12-2021</td>
            <td>67</td>
          </tr>
          <tr>
            <td>Jane</td>
            <td>Doe</td>
            <td>22-12-2021</td>
            <td>55</td>
          </tr>
          <tr>
            <td>Jim</td>
            <td>Smith</td>
            <td>23-12-2022</td>
            <td>100</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default CompetitionUsers;
