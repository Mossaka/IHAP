import React from 'react';
import Content from './Content';
import firebase from 'firebase';

export default class Problem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { problem: null };
    firebase.database().ref('problems/' + props.id).once('value').then(p => {
      this.setState({ problem: p.val() });
    });
  }

  render() {
    if (!this.state.problem) {
      return (
        <h1>Loading...</h1>
      );
    }
    let p = this.state.problem;

    return (
      <div>
        <h1>{p.title}</h1>
        <img src={null} />
        <Content>

        </Content>
      </div>
    );
  }
}