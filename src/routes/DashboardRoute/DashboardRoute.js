import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import config from '../../config';
import TokenService from '../../services/token-service';
import './DashboardRoute.css';
// import {Redirect} from 'react-router-dom';
// import userContext from '../../contexts/UserContext';

class DashboardRoute extends Component {
  state =  {
    words: [],
    totalScore: 0,
    language: null,
    error: null,
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
          this.setState({words: wordsArr, language: data.language.name, totalScore: data.language.total_score});
        })
        .catch(error => {
          console.error({error});
          // this.setState({error: error.message});
        })   
  }



  render() {
    let words = this.state.words.map((word, index) => {
      return (<li key={index}><h4>{word.word}</h4><p>correct answer count: {word.correct}</p><p>incorrect answer count: {word.incorrect}</p></li>)
    });
    return (
      <section className='dashboard'>
        <section className='summary'>
          <h2>{this.state.language}</h2>
          <section className='total-correct'>Total correct answers: {this.state.totalScore}</section>
          <Link to='/learn'><button>Start practicing</button></Link>
        </section>
        <h3>Words to practice</h3>
        <ul className='wordsList'>
          {words}
        </ul>
      </section>
    );
  }
}

export default DashboardRoute;