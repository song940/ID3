const fs = require('fs');
const GENRES = require('./genres');

const text = data => {
  return data.toString().replace(/\u0000/g, '');
};

const reader = buf => {
  let offset = 0;
  return len => {
    const d = buf.slice(offset, offset + len);
    offset+=len;
    return d;
  };
};
/**
 * @wiki https://en.wikipedia.org/wiki/ID3
 * @param {*} file 
 */
const parse = file => {
  if(typeof file === 'string')
    file = fs.readFileSync(file);
  if(file instanceof Buffer)
    file = file.slice(file.length-128);
  const read = reader(file);
  const header  = text(read(03));
  const title   = text(read(30));
  const artist  = text(read(30));
  const album   = text(read(30));
  const year    = text(read(04));
  let track, comment = read(30);
  const genre = GENRES[read(1) | 0xff];
  if(header != 'TAG') return;
  if(comment[0] == 0){
    track = comment[1];
    comment = comment.slice(2);
  }
  comment = text(comment);
  return {
    header,
    title,
    artist,
    album,
    year,
    comment,
    track,
    genre,
  };
};

module.exports = {
  parse
};