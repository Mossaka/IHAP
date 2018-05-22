import React from 'react';
import Content from './Content';

export default class Solution extends React.Component {
  render() {
    if (this.props.id === null) {
      return (
        <h1>Loading</h1>
      );
    }

    return (
      <Content>

      </Content>
    );
  }
}