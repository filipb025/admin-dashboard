import React from "react";
import {Table} from "react-bootstrap";
import Message from "./Message";
import Loader from './Loader';


const CompetitionUsers = ({firstName, lastName, competitions}) => {
    const details = competitions.competition.users

    return (
        <>  {competitions.loading ? <Loader/> : competitions.error ?
            <Message variant='danger'>{competitions.error}</Message> : (
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
                    {details.map((comp) => (
                        <tr key={comp.id}>
                            <td>{firstName}</td>
                            <td>{lastName}</td>
                            <td>01-01-2022</td>
                            <td>55</td>
                        </tr>
                    ))}
                    < /tbody>
                </Table>
            )}
        </>
    );
};

export default CompetitionUsers;
