const React = require('react');
const { Component } = require('react');

class TechList extends Component {
  state = {
    techs: ['Js', 'Php', 'React'],
  };
  render() {
    console.log(this.state);
    return (
      <ul>
        <li>JS</li>
        <li>PHP</li>
        <li>Node</li>
        <li>Java</li>
      </ul>
    );
  }
}

module.exports = TechList;
