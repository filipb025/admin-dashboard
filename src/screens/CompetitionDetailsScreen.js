import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
const CompetitionDetailsScreen = () => {
  return (
    <>
      <Row>
        <Col>
          <Link to="/competitions" className="btn btn-light my-3">
            Go Back
          </Link>
          <Container className="my-2">
            <h2 className="py-2">Competition Details</h2>
            <Form>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="compName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Competition Name" />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="compStartDate">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control type="date" placeholder="Select Start Date" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>End Date</Form.Label>
                  <Form.Control type="date" placeholder="Select End Date" />
                </Form.Group>
              </Row>

              <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" placeholder="Enter Description" />
              </Form.Group>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Created At</Form.Label>
                  <Form.Control type="date" placeholder="Created At" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Updated At</Form.Label>
                  <Form.Control type="date" placeholder="Updated At" />
                </Form.Group>
              </Row>
            </Form>
          </Container>
        </Col>
      </Row>
    </>
  );
};

export default CompetitionDetailsScreen;
