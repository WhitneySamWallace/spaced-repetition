import config from '../config'
import TokenService from '../services/token-service'

const learnService = {
  //get word to display
  getWord() {
    return fetch(`${config.API_ENDPOINT}/language/head`, {
      method: 'GET',
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
      }
    })
    .then(res =>
      (!res.ok)
      ? res.json().then(e => Promise.reject(e))  
      : res.json()
    )
  },
  
  checkAnswer(guess){
    return fetch(`${config.API_ENDPOINT}/language/guess`, {
      method: 'POST',
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify({guess})
    })
    .then(res =>
        (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
      )
  }
}

export default learnService;