import React from 'react';
import { Card, CardBody, CardTitle, CardLink } from 'reactstrap';

export default class RelatedTicket extends React.Component {

  render() {
    return (
      <Card>
        <CardBody>
          <CardTitle>Related Ticket</CardTitle>
          <CardLink href="#">Card Link</CardLink>
        </CardBody>
      </Card>
    );
  }
}
