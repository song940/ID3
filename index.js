
function ID3(){
  
}

ID3.v1 = require('./v1');
ID3.v2 = require('./v2');
ID3.parse = file => {
  const tag1 = ID3.v1(file);
  const tag2 = ID3.v2(file);
  return tag2 || tag1;
};

module.exports = ID3;