import React from 'react';
import { Card, CardBody, CardTitle, ListGroup, ListGroupItem } from 'reactstrap';
import { weightedSearch } from '../utils/search';
import { stripHtml } from '../utils/search';
import { getTicket, getTickets } from '../utils/store';
import { Link } from 'react-router-dom';

export default class RelatedTicket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      related: []
    };
  }

  componentDidMount() {
    this.refresh(this.props.id);
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.id !== this.props.id) {
      this.refresh(nextProps.id);
      return false;
    }
    return true;
  }

  refresh(tid) {
    getTicket(tid, t => {
      let title = t.title.toLowerCase();
      let content = stripHtml(t.content).toLowerCase();
      let keyword = title + ' ' + content;
      for (let i = 0; i < content.length / 10; i++) {
        keyword += ' ' + title;
      }

      weightedSearch(keyword, 4, { title: 3, content: 1 }, ids => {
        getTickets(tickets => {
          let related = [];
          for (let id of ids) {
            if (id !== tid) related.push({ id, title: tickets[id].title });
          }
          this.setState({ related });
        });
      });
    });
  }

  generateRelatedTicket(t) {
    return <ListGroupItem><Link key={t.id} to={'/ticket/' + t.id}>{t.title}</Link></ListGroupItem>;
  }

  render() {
    if (this.state.related.length === 0) {
      return (
        <Card>
          <CardBody>
            <CardTitle>No Related Ticket Found</CardTitle>
          </CardBody>
        </Card>
      );
    }

    return (
      <Card>
        <CardBody>
          <CardTitle>Related Tickets</CardTitle>
          <ListGroup>
            {this.state.related.map(t => this.generateRelatedTicket(t))}
          </ListGroup>
        </CardBody>
      </Card>
    );
  }
}
