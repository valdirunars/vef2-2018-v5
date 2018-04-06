import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './App.css';

import Home from './components/home';
import School from './components/school';
import Navigation from './components/navigation';
import Title from './components/titill';

const url = process.env.REACT_APP_SERVICE_URL;

class App extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      selectedSlug: "",
    };
  }

  componentDidMount() {
    fetch(url).then(res => {
      return res.json();
    }).then(data => {
      const copiedState = Object.assign({}, this.state);
      copiedState.items = data.schools;
      this.setState(copiedState);
    });
  }

  setSelectedSlug(slug) {
    const copiedState = Object.assign({}, this.state);
    copiedState.selectedSlug = slug;
    this.setState(copiedState);
  }


  render() {
    const items = this.state.items;
    return (
      <Router>
        <main className="app">
          <Title title="Próftöflur"/>
          <Navigation items={this.state.items} setSelectedSlug={this.setSelectedSlug.bind(this)} selectedSlug={this.state.selectedSlug}/>

          <Route exact={true} path="/" component={Home} />
          <Route path="/:slug" render={(props) => {
            if (!this.state.selectedSlug) {
              this.setSelectedSlug(props.match.params.slug);
            }

            let school = items
              .find((school) => school.slug === props.match.params.slug)

            let schoolName = '';
            if (school) {
              schoolName = school.name;
            }
            return (
              <School schools={items} schoolName = {schoolName} slug={props.match.params.slug} setSelectedSlug={this.setSelectedSlug.bind(this)}/>
            )
          }} />

        </main>
      </Router>
    );
  }
}

export default App;
