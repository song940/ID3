const ID3 = require('..');

const tag = ID3.parse(__dirname + '/example.mp3');
console.log(tag);