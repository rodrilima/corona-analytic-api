const puppeteer = require('puppeteer');
const moment = require('moment');

class Scraping  {
  async get() {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('https://especiais.g1.globo.com/bemestar/coronavirus/mapa-coronavirus/')

    const values = await page.evaluate(() => {
        const places = {}

        document.querySelectorAll('.places__body .places__item').forEach(place => {
          const [city, state] = place.firstChild.textContent.split(", ")
          if (!city || !state) return false
          if(!places[state]) places[state] = {}
          places[state][city] = place.childNodes[1].textContent
        })

        return Object.keys(places).map(state => {
          const data = places[state]
          return {
            state,
            cases: Object.values(data).reduce((a,b)=> +a + +b),
            citys: Object.keys(data).map(city => {
              return { city, cases: data[city] }
            })
          }
        })
    })

    browser.close()

    return {
      date_iso: moment(Date.now()).toISOString(),
      values
    }
  }
}

module.exports = new Scraping();
