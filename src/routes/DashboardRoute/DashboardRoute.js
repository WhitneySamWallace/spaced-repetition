import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import config from '../../config';
import TokenService from '../../services/token-service';
import './DashboardRoute.css';

class DashboardRoute extends Component {
  state =  {
    words: [],
    incorrect_count: null,
    correct_count: null
  }

  componentDidMount() {
    let wordsArr = [];
    fetch(`${config.API_ENDPOINT}/language`, {
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
      }
    })
      .then(res => 
        (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json()
      )
        .then(data => {
          data.words.map(word => {
            wordsArr.push(word.original);
            this.setState({incorrect_count: word.incorrect_count, correct_count: word.correct_count, words: wordsArr})
            return wordsArr;
          })
        })
        .catch(error => {
          console.error({error});
        })
  }

  render() {
    let words = this.state.words.map((word, index) => {
      return (<li key={index}><h4>{word}</h4><p>correct answer count: {this.state.correct_count}</p><p>incorrect answer count: {this.state.incorrect_count}</p></li>)
    });
    return (
      <section className='dashboard'>
        <h2>Latin</h2>
        <section>Total correct answers: 7</section>
        <Link to='/learn'><button>Start practicing</button></Link>
        <h3>Words to practice</h3>
        <ul className='wordsList'>
          {words}
        </ul>
      </section>
    );
  }
}

export default DashboardRoute;