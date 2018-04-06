import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import './Home.css';

/* hér ætti að sækja forsíðu vefþjónustu til að sækja stats */

export default class Home extends Component {

  constructor() {
    super();
    this.state = {
      stats: {},
    }
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_SERVICE_URL}stats`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          stats: data.stats,
        });
      })
  }

  render() {

    return (
      <div className="home">
        <Helmet title="Forsíða"/>
        <h2>Tölfræði</h2>
        <table>
          <tbody>
            <tr>
              <td className="bold">Fjöldi prófa</td>
              <td>{this.state.stats.numTests}</td>
            </tr>
            <tr>
              <td className="bold">Fjöldi nemenda í öllum prófum</td>
              <td>{this.state.stats.numStudents}</td>
            </tr>
            <tr>
              <td className="bold">Meðalfjöldi nemenda í prófi</td>
              <td>{this.state.stats.averageStudents}</td>
            </tr>
            <tr>
              <td className="bold">Minnsti fjöldi nemenda í prófi</td>
              <td>{this.state.stats.min}</td>
            </tr>
            <tr>
              <td className="bold">Mesti fjöldi nemenda í prófi</td>
              <td>{this.state.stats.max}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
