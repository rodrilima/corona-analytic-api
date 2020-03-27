const request = require('request');
const moment = require('moment');

class G1Json {
  getFromURL(){
    return new Promise(resolve=>{
      request('https://especiais.g1.globo.com/bemestar/coronavirus/mapa-coronavirus/data/brazil-cases.json', (error, response, body)=>{
        resolve(JSON.parse(body))
      })
    })
  }
  async get(){
    const { docs } = await this.getFromURL()
    if(!docs || !docs.length) return false
    let history = {};
    let places = {}
    docs.forEach(({ state, city_name, count, date, state_cod })=>{
      if(!history[state]) history[state] = {}
      if(!history[state][date]) history[state][date] = []
      history[state][date].push({city: city_name, cases: count})
      if(!places[state]) places[state] = {}
      places[state][city_name] = count
    })
    const values = Object.keys(places).map(state => {
      const data = places[state]
      return {
        state,
        cases: Object.values(data).reduce((a,b)=> +a + +b),
        citys: Object.keys(data).map(city => {
          return { city, cases: data[city] }
        })
      }
    })
    history = Object.keys(history).map(state => {
      return {
        state,
        values: Object.keys(history[state]).map(date=>{
          return {
            date_iso: moment(new Date(date)).toISOString(),
            citys: history[state][date]
          }
        })
      }
    })
    return {
      date_iso: moment(Date.now()).toISOString(),
      values,
      history
    }
  }
}

module.exports = new G1Json()
