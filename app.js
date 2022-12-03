import * as cheerio from 'cheerio'
import fetch from 'node-fetch'
import fs from 'fs'
const getFormulaOneDrivers = async function () {
  try {
    const response = await fetch('https://www.formula1.com/en/drivers.html')
    const body = await response.text()
    const $ = cheerio.load(body)

    const items = []

    $('.listing-items--wrapper > .row > .col-12').map((i, el) => {
      const rank = $(el).find('.rank').text()
      const points = $(el).find('.points > .f1-wide--s').text()
      const firstName = $(el).find('.listing-item--name span:first').text()
      const lastName = $(el).find('.listing-item--name span:last').text()
      const team = $(el).find('.listing-item--team').text()
      const photos = $(el).find('.listing-item--photo img').attr('data-src')
      items.push({ rank, points, firstName, lastName, team, photos })

      fs.writeFile('formula1List.json', JSON.stringify(items), (err) => {
        if (err) return console.error(err)

        console.log('Racers List is Saved in formula1List.json file')
      })
    })

    console.log(items)
  } catch (e) {
    console.log(e)
  }
}
getFormulaOneDrivers()
