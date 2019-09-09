import React, { Component } from 'react'
import learnService from '../../services/learn-service'

class LearningRoute extends Component {
  state = {
    nextWord: null,
    wordCorrectCount: 0,
    incorrect: 0,
    totalScore: 0,
    isCorrect: true
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

  handleSubmit = e => {

    e.preventDefault()

    const { guessInput } = e.target;

    console.log(guessInput.value)

    // learnService.checkAnswer({
    //   guess: guessInput.value
    // })
    // .then(res => {

    //   this.setState({
    //     guess: guessInput.value
    //     nextWord: res.nextWord,
    //     totalScore: res.totalScore,
    //     wordCorrectCount: res.wordCorrectCount,
    //     wordIncorrectCount: res.wordIncorrectCount,
    //     answer: res.answer,
    //     isCorrect: res.isCorrect
    //   })

    // })
    // .catch(err => {
    //   console.error(err.error)
    // })

  }

  render() {

    if(!this.state.isCorrect){
      return (
        <section>
          <h2>Translate the word:</h2>
          <span>{this.state.nextWord}</span>
          <form onSubmit = {(e) => this.handleSubmit(e)}>
            <label htmlFor='learn-guess-input'>What's the translation for this word?</label>
            <input 
              type='text' 
              placeholder='answer' 
              name='guessInput' 
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

    if(this.state.isCorrect === true){

      return(
        <div>
          <p className='DisplayScore'>Your total score is: {this.state.totalScore}</p>
          <h2>You were correct! :D</h2>
          <p className='DisplayFeedback'>The correct translation for {this.state.nextWord} was ${this.state.answer} and you chose ${this.state.guess}!`</p>
          <button type='button'>Try another word!</button>
        </div>
      )

    }

    if(this.state.isCorrect === false){
      return(
        <div>
          <p className='DisplayScore'>Your total score is: {this.state.totalScore}</p>
          <h2>Good try, but not quite right :(</h2>
          <p className='DisplayFeedback'>The correct translation for {this.state.nextWord} was ${this.state.answer} and you chose ${this.state.guess}!`</p>
          <button type='button'>Try another word!</button>
        </div>
      )
    }
  }
}

export default LearningRoute
