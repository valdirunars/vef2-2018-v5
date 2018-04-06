import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Department.css';

/**
 * Þessi component ætti að vera einfaldur í birtingu en taka fall frá foreldri
 * sem keyrir þegar smellt er á fyrirsögn.
 */

export default class Department extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      tests: props.department.tests
        .map((test) => {
          return (
            <tr className="tr" key={test.course}>
              <td>{test.course}</td>
              <td>{test.name}</td>
              <td>{test.students}</td>
              <td>{test.date}</td>
            </tr>
          )
        }),
    };
  }

  toggle() {
    const stateCopy = Object.assign({}, this.state);
    stateCopy.show = ! this.state.show;
    this.setState(stateCopy);
  }

  renderIf(condition) {
    return (component) => {
      let c = (
        <div></div>
      );
      if (condition) {
        c = component;
      }
      return c;
    }
  }

  render() {
    const plusOrMinus = this.state.show ? "➖" : "➕";
    return (
      <section className="department">
        <a onClick={this.toggle.bind(this)}>
          <p> {plusOrMinus + " " + this.props.department.heading}</p>
        </a>
        {
          this.renderIf(this.state.show)((
            <table>
              <tbody>
                <tr>
                  <th>Auðkenni</th>
                  <th>Námskeið</th>
                  <th>Fjöldi</th>
                  <th>Dagsetning</th>
                </tr>
                {this.state.tests}
              </tbody>
            </table>
          ))
        }
        <hr/>
      </section>
    );
  }
}

Department.propTypes = {
  department: PropTypes.object,
};
