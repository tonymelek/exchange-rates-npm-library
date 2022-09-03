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
        const response=dataObject
            .filter(v=> !!v.buy)
            .filter(v => currency!==""?v.currency === currency.toUpperCase():true)
        return response;
    } catch (err) {
        return JSON.stringify(err, null, 2)
    }
}

const egy = async (currency = "") => {
    try {
        const result=await axios('https://www.banquemisr.com/Home/CAPITAL%20MARKETS/Exchange%20Rates%20and%20Currencies');
        const table = (result?.data.split('<tbody>')[1].split('</tbody>')[0]);// get the table body from the html page
        // console.log(table);
       const currencies=parser.parseFromString(table).getElementsByTagName('tr') 
        .map(row => row.childNodes[1].getElementsByTagName('img')[0].getAttribute('src').slice(-7,-4));
       const buy=parser.parseFromString(table).getElementsByTagName('tr') 
        .map(row => row.childNodes[3].textContent);
        const sell=parser.parseFromString(table).getElementsByTagName('tr') 
        .map(row => row.childNodes[5].textContent);

      
        const dataObject = currencies.map((curr,index) => ({
            currency: curr.toUpperCase(), //Map currency name to its 3-Alpha code
            buy: Number(Number(buy[index]).toFixed(2)),
            sell: Number(Number(sell[index]).toFixed(2))
        }))
        
        return dataObject.filter(v => currency!==""?v.currency === currency.toUpperCase():true)
    }
    catch (err) {
        return JSON.stringify(err, null, 2)
    }
}

module.exports = { aussie, egy }