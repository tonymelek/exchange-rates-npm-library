//Dependencies
const axios = require("axios");
const DomParser = require('dom-parser');
const currencyMap=require('./currencyMap.json');
// Create new DomParser Object
const parser = new DomParser();

const aussie = async (currency='') => {
    try {
        const result = await axios('https://www.anz.com/aus/RateFee/fxrates/fxpopup.asp')
        const doc = parser.parseFromString(result?.data)
        const table = [...doc.getElementsByClassName('OddRow'), ...doc.getElementsByClassName('EvenRow')]

        const dataObject = table.map(row => {
            const cells = row.childNodes.filter(v => !v.text)

            return {
                currency: cells[2].textContent,
                buy: Math.round(1 / cells[3].textContent.split(';')[1] * 100) / 100,
                sell: Math.round(1 / cells[4].textContent.split(';')[1] * 100) / 100 || "N/A",
            }
        })

        return dataObject.filter(v => v.buy!==NaN &&  v.currency === currency.toUpperCase());
    } catch (err) {
        return JSON.stringify(err, null, 2)
    }
}

const egy = async (currency = "") => {
    try {
        const table = (result.data.split('<tbody>')[1].split('</tbody>')[0]);// get the table body from the html page
        const dataObject = parser.parseFromString(table) // use dom-parser to access and manipulate dom-elements
            .getElementsByTagName('tr') // get rows in the table
            .map(row => row.childNodes.map(node => node.textContent).slice(0, 3)) // get text content in every td , only keep first three elements "currency,buy, sell"
            .slice(2, -2) // remove first and last 2 rows ,table headers and the last 2 are currencies with no published values
            .map(curr => ({
                currency: currencyMap[curr[0]], //Map currency name to its 3-Alpha code
                buy: Number(curr[1]),
                sell: Number(curr[2])
            }))
        const response = dataObject.filter(v => v.currency === currency.toUpperCase())
        return response.length === 1 ? response : dataObject
    }
    catch (err) {
        return JSON.stringify(err, null, 2)
    }
}

module.exports = { aussie, egy }