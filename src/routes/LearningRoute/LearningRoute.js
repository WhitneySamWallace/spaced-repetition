import React, { Component } from 'react'
import learnService from '../../services/learn-service'

class LearningRoute extends Component {
  state = {
    nextWord: null,
    wordCorrectCount: 0,
    incorrect: 0,
    totalScore: 0,
  }

  componentDidMount() {
    learnService.getWord()
      .then(res => {
        this.setState({
          nextWord: res.nextWord,
          wordCorrectCount: res.wordCorrectCount,
          wordIncorrectCount: res.wordIncorrectCount,
          totalScore: res.totalScore,
        })
      });
    // console.log(word, word.original);
  }

  getWord = () => {
    let word = learnService.getWord();
    console.log(word.original);
  }
  render() {
    
    return (
      <section>
        <h2>Translate the word:</h2>
        <span>{this.state.nextWord}</span>
        <form>
          <label htmlFor='learn-guess-input'>What's the translation for this word?</label>
          <input 
            type='text' 
            placeholder='answer' 
            name='learn-guess-input' 
            id='learn-guess-input'
            required
            ></input>
          <button type='submit'>Submit your answer</button>
        </form>
        <section>
          <p>Your total score is: {this.state.totalScore}</p>
          <p>You have answered this word correctly {this.state.wordCorrectCount} times.</p>
          <p>You have answered this word incorrectly {this.state.wordIncorrectCount} times.</p>
        </section>
      </section>
    );
  }
}

export default LearningRoute
