import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Navigation.css';

/* hér ætti að sækja gögn frá vefþjónustu fyrir valmynd */

export default class Navigation extends Component {
  render() {
    const selectedSlug = this.props.selectedSlug;
    return (
      <nav className="navigation">
        {
          this.props.items
            .map(item => {
              let className = 'navbaritem';
              if (item.slug === selectedSlug) {
                className = 'navbaritem-bold';
              }
              return (
                <Link key={item.slug} to={item.link} className={className} onClick={this.props.setSelectedSlug.bind(this, item.slug)}>{item.name}</Link>
              );
            })
        }
      </nav>
    );
  }
}

Navigation.propTypes = {
  items: PropTypes.array,
  setSelectedSlug: PropTypes.func,
};
