import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import config from '../../config';
import TokenService from '../../services/token-service';
import './DashboardRoute.css';

class DashboardRoute extends Component {
  state =  {
    words: []
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
            wordsArr.push({word: word.original, correct: word.correct_count, incorrect: word.incorrect_count});

            return wordsArr;
          })
          this.setState({words: wordsArr});
        })
        .catch(error => {
          console.error({error});
        })
  }

  render() {
    let words = this.state.words.map((word, index) => {
      return (<li key={index}><h4>{word.word}</h4><p>correct answer count: {word.correct}</p><p>incorrect answer count: {word.incorrect}</p></li>)
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