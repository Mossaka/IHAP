import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { weightedSearch } from '../utils/search';
import firebase from 'firebase';
import { stripHtml } from '../utils/search';
import { getTicket } from '../utils/store';
import { Link } from 'react-router-dom';

export default class RelatedTicket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      related: []
    };
  }

  componentDidMount() {
    getTicket(this.props.id, t => {
      let title = t.title.toLowerCase();
      let content = stripHtml(t.content).toLowerCase();
      let keyword = title + ' ' + content;
      for (let i = 0; i < content.length / 10; i++) {
        keyword += ' ' + title;
      }

      weightedSearch(keyword, 4, { title: 3, content: 1 }, ids => {
        for (let id of ids) {
          getTicket(id, t => {
            this.setState({ related: [...this.state.related, { id, title: t.title }] });
          });
        }
      });
    });
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
        </CardBody>
        <CardBody>
          {this.state.related.map(t => <Link to={'/ticket/' + t.id}>{t.title}</Link>)}
        </CardBody>
      </Card>
    );
  }
}
