import React from 'react';
import { Card, CardBody, CardTitle, CardLink } from 'reactstrap';
import { weightedSearch } from '../searchResults/SearchTicket';
import firebase from 'firebase';

export default class RelatedTicket extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      related1: <p>Now Loading...</p>,
      related2: <p>Now Loading...</p>,
      related3: <p>Now Loading...</p>
    }

    this.getRelatedTickets = this.getRelatedTickets.bind(this);
    this.setTitles = this.setTitles.bind(this);
    this.getRelatedTickets();
  }

  setTitles(ids) {
    var self = this;
    firebase.database().ref('tickets/' + ids[1]).once('value').then(t => {
      self.setState({title1: t.val().title});
    });

    firebase.database().ref('tickets/' + ids[2]).once('value').then(t => {
      self.setState({title2: t.val().title});
    });

    firebase.database().ref('tickets/' + ids[3]).once('value').then(t => {
      self.setState({title3: t.val().title});
    });
  }

  getRelatedTickets() {
    var self = this;
    firebase.database().ref('tickets/' + this.props.id).once('value').then(t => {
      var title = t.val().title.toLowerCase();
      var content = stripHtml(t.val().content).toLowerCase();
      var keyword = title + " " + content;
      for (var i = 0; i < content.length / 10; i++) {
        keyword += " " + title;
      }

      weightedSearch(keyword, 4, {title: 3, content: 1}).then(function(ids) {
        
        if(ids.length > 1) { 
          firebase.database().ref('tickets/' + ids[1]).once('value').then(t => {
            self.setState({related1: <CardLink href={ids[1]}>{t.val().title}</CardLink>});
          });

          if (ids.length > 2) {
            firebase.database().ref('tickets/' + ids[2]).once('value').then(t => {
              self.setState({related2: <CardLink href={ids[2]}>{t.val().title}</CardLink>});
            });
            if (ids.length > 3) {
              firebase.database().ref('tickets/' + ids[3]).once('value').then(t => {
                self.setState({related3: <CardLink href={ids[3]}>{t.val().title}</CardLink>});
              });
            } else {
              self.setState({related3: <p></p>});
            }
          } else {
            self.setState({related2: <p></p>});
            self.setState({related3: <p></p>});
          }
        } else {
          self.setState({related1: <p>No Related Tickets Found</p>});
          self.setState({related2: <p></p>});
          self.setState({related3: <p></p>});
        }
      });
    });
  }

  render() {
    return (
      <Card>
        <CardBody>
          <CardTitle>Related Tickets</CardTitle>
        </CardBody>
        <CardBody>
          {this.state.related1}
        </CardBody>
        <CardBody>
          {this.state.related2}
        </CardBody>
        <CardBody>
          {this.state.related3}
        </CardBody>
      </Card>
    );
  }
}

function stripHtml (html){
  var tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || "";
}