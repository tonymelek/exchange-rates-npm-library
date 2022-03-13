![License: 'GPL v3'](https://img.shields.io/badge/License-GPLv3-blue.svg)
# Exchange Rates npm Library
* [Description](#description)
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)
## Description
This npm library gets live values of exchange rates from one the big 4 banks in Australia (ANZ) and one of the biggest banks in Egypt (Banque Misr) , uses axios and dom-parser in the background to get the currencies and their buy and sell prices as json file.
The project uses github actions to auto publish the npm library and semantic versioning and commitizen to ensure the versions are indicative and have release notes.
## Installation
simply `npm install exchange-rates-au` or `yarn add exchange-rates-au`
## Usage
Simple code snippet below
```
const exchange = require("exchange-rates-au");

exchange.egy("usd").then(res => console.log(res)).catch(err => console.log(err))
exchange.aussie().then(res => console.log(res)).catch(err => console.log(err))
```
to use the Australian bank rates references to Australian Dollar use `aussie` and for Egyptian Pound rates referenced to Egyptian Pound use `egy`
the functions are async and return promises, if resolved it will be either a json object.
You can pass the 3 alpha code of a currency 'case-insensitive' (e.g. USD, CAD,...etc ) you want to filter you results to, otherwise you will get all currencies. "This rules applies to both `aussie` and `egy`
## Contributing
Contributions are welcome, please feel free to send me a message if you got any idea that will help the library grow or get enhanced.
## Tests
Only manual testing and comparing to live values on the websites of the banks has been held to confirm the accuracy of the results.
## Questions
You are welcome to provide any feedback and/or ask questions.
Please, send any question to my e-mail [tonymelek.au@gmail.com](mailto:tonymelek.au@gmail.com) and/or visit my profile on [Github](https://github.com/tonymelek)

## License
The project is protected under GPL V3,you may need to read through license conditions