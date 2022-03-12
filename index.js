//Dependencies
const axios = require("axios");
const DomParser = require('dom-parser');

// Create new DomParser Object
const parser = new DomParser();

const ausie = async () => {
    try {
        const result = await axios('https://www.anz.com/aus/RateFee/fxrates/fxpopup.asp')
        const doc = parser.parseFromString(result?.data)
        const table = [...doc.getElementsByClassName('OddRow'), ...doc.getElementsByClassName('EvenRow')]

        const dataObject = table.map(row => {
            const cells = row.childNodes.filter(v => !v.text)
           // for (let cell in cells){
           //     console.log("cell",cell,cells[cell].textContent)
           // }
            return {
                currency: cells[2].textContent,
                buy: Math.round(1 / cells[3].textContent.split(';')[1] * 100) / 100|| "N/A",
                sell: Math.round(1 / cells[4].textContent.split(';')[1] * 100) / 100 || "N/A",
            }
        })

        return dataObject.filter(v => v.buy!=='N/A')
    } catch (err) {
        return JSON.stringify(err, null, 2)
    }
}

const egy = async (currency = "") => {
    try {
        const result = await axios('https://banklive.net/en/currency-exchange-rates-in-national-bank-of-egypt')
        const doc = parser.parseFromString(result.data)
        const table = doc.getElementsByClassName('currency-rates-in-national')[0]
            .childNodes.filter(v => !v.text)[1] //filter used to remove empty rendered nodes
            .childNodes.filter(v => !v.text)
        const dataObject = table.map(row => {
            const child = row.childNodes.filter(v => !v.text)
            return {
                currency: child[0].textContent.trim(),
                buy: Math.round(child[1].textContent.trim().split(' ')[0] * 100) / 100,
                sell: Math.round(child[2].textContent.trim().split(' ')[0] * 100) / 100
            }
        })
        const response = dataObject.filter(v => v.currency === currency.toUpperCase())
        return response.length === 1 ? response : dataObject
    }
    catch (err) {
        return err
    }
}

module.exports = { ausie, egy }