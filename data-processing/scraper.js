const request = require('request-promise-native')
const dotenv = require('dotenv')
const cheerio = require('cheerio')
const prompt = require('prompt')
const Venue = require('../models/Venue')

dotenv.load()

/* eslint-disable no-console */

const baseUrl = process.env.SCRAPER_URL
const path = '/venues/index/page'

const scrapeVenuePage = async (url) => {
  try {
    const html = await request(url)
    const $ = cheerio.load(html)

    const rawName = $('#vinfo').text()
    const name = rawName.slice(0, rawName.indexOf('Edit')).trim()
    if (!name) return console.log('No data...')
    const rawAddress = $('.venue-details div ul li p').html().split('<br>')
    rawAddress.push(rawAddress[1].split(', ')[0])
    rawAddress.push(rawAddress[1].split(', ')[1])
    const address = rawAddress[0]
    const city = rawAddress[2]
    const state = rawAddress[3].split(' ')[0]
    const zip = rawAddress[3].split(' ')[1]
    const webUrl = $('.venue-details div ul li:nth-child(4) a')
      .text().replace('Upload', '')
      .replace('Review', '')
      .replace('http://', '')
      .replace('www.', '')
      .trim()
    const genresRaw = $('.venue-details div ul li:nth-child(6)')
      .html().split('</label>')[1]
      .trim()
    let preferredGenres = []
    if (genresRaw.includes(', ')) {
      preferredGenres = genresRaw.split(',')
      preferredGenres = preferredGenres.map(genre => genre.trim())
    } else preferredGenres.push(genresRaw.trim())

    // TODO: create showTypes from preferredGenres

    let capacity = $('.venue-details div ul li:nth-child(7)')
      .html().split('</label>')[1]
      .trim()
    if (/^[0-9]*$/.test(capacity)) capacity = parseInt(capacity, 10)

    const ages = $('.venue-details div ul li:nth-child(8)')
      .html().split('</label>')[1]
      .trim()

    const thisVenue = new Venue({
      name,
      address,
      city,
      state,
      zip,
      preferredGenres,
      capacity,
      ages,
      webUrl
    })

    try {
      const found = await Venue.findOne({ name, zip })
      if (found) return console.error(`${name} already exists, skipped`)
      try {
        const saved = await thisVenue.save()
        return console.log(`${saved.name} saved!`)
      } catch (err) { return console.error(`VENUE: ${name}, ERROR: ${err}`) }
    } catch (err) { return console.error(`VENUE: ${name}, ERROR: ${err}`) }
  } catch (err) { throw err }
}

const scrapeStatePages = async (page, state) => {
  const uri = `${baseUrl}${path}/${page}/state/${state}`
  try {
    const $ = await request({ uri, transform: body => cheerio.load(body) })
    const hrefs = []
    const resultCount = parseInt($('span.result-count').first().text(), 10)

    if (page === 0) console.log(`-- ${resultCount} records to be parsed in ${state} --`)

    $('.venue-name a.title').each(function getHref(i) {
      hrefs[i] = $(this).attr('href')
    })

    hrefs.forEach(async (href) => {
      const newUrl = baseUrl + href
      await scrapeVenuePage(newUrl)
    })

    const newPage = page + 15
    if (newPage < resultCount) scrapeStatePages(newPage, state)
    else setTimeout(() => { console.log('done!') }, 3000)
  } catch (err) { throw err }
}

module.exports = () => {
  prompt.start()

  prompt.get(['state'], (err, result) => {
    scrapeStatePages(0, result.state)
  })
}
