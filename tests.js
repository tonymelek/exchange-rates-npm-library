const { aussie, egy } = require('./index');
const dotenv = require('dotenv');
dotenv.config();

const tests = async () => {
    console.log(process.env.FIREBASE_CONFIG)
    // console.log('testing aussie function output', await aussie());
    // console.log('testing egy function output', await egy());
}
tests();
