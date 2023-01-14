import React from "react";
import Card from "react-bootstrap/Card";

function MyCard(props) {
  return (
    <Card>
      <Card.Header as="h3">{props.header}</Card.Header>
      <Card.Body>
        <Card.Title>
          {props.title && <h5 className="card-title">{props.title}</h5>}
        </Card.Title>
        <Card.Text>
          {props.text && <span className="card-text">{props.text}</span>}
          {props.body}
          {props.status && <span id="createStatus">{props.status}</span>}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default MyCard;
