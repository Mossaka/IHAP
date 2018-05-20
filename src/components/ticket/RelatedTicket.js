import React, {PropTypes} from 'react';
import { db } from "./firebase"
import { Card, CardText, CardBody, CardTitle, CardLink } from 'reactstrap';

class RelatedTicket extends React.Component {
  constructor(props, context) {
      super(props, context);
  }

  render() {
      return (
          <div>
            <Card>
              <CardBody>
                <CardTitle>Related Ticket</CardTitle>
                <CardLink href="#">Card Link</CardLink>
              </CardBody>
            </Card>
          </div>
      )
  }

}
