import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import './School.css';
import NotFound from '../not-found';
import Department from '../department';
import { Link } from 'react-router-dom';

/**
 * Í þessum component ætti að vera mest um að vera og séð um að:
 * - Sækja gögn fyrir svið og birta
 * - Opna/loka deildum
 */

export default class School extends Component {

  constructor() {
    super();

    this.state = {
      heading: "",
      departments: "",
    };
  }

  fetchData(props) {
    const school = props.schools.find(school => {
      return school.slug === props.slug
    });
    if (!school) { return }

    fetch(process.env.REACT_APP_SERVICE_URL + props.slug)
      .then((res) => res.json())
      .then((data) => {
        const newState = Object.assign({}, this.state);
        newState.heading = data.school.heading;
        newState.departments = data.school.departments
          .map(dep => {
            return (
              <Department key={dep.heading} department={dep} />
            )
          });
        this.setState(newState);
      });
  }

  componentDidMount() {
    this.fetchData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.fetchData(nextProps);
  }

  render() {
    const school = this.props.schools.find(school => school.slug === this.props.slug)
    if (school) {
      return (
        <section className="school">
          <Helmet title={this.props.schoolName}/>
          <h2>{this.props.schoolName}</h2>
          {this.state.departments}
          <Link to="/" className="homeLink" onClick={this.props.setSelectedSlug.bind(this, '')}>Heim</Link>
        </section>
      );
    } else {
      return (
        <NotFound />
      )
    }

  }
}

School.propTypes = {
  schools: PropTypes.array,
  schoolName: PropTypes.string,
  setSelectedSlug: PropTypes.func,
  slug: PropTypes.string,
};
