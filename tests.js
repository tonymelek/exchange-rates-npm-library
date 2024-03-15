const { aussie, egy } = require('./index');
const dotenv = require('dotenv');
dotenv.config();
console.log(process.argv[2]);
const tests = async () => {
    console.log(process.env.NAME)
    // console.log('testing aussie function output', await aussie());
    // console.log('testing egy function output', await egy());
}
tests();
