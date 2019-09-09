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
  //get correct and incorrect count
  getCounts() {},
  //get total score
  getScore() {},
}

export default learnService;