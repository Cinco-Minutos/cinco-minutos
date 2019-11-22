const lzString = require('lz-string');
const fs = require('fs');
module.exports = fp => {
  fs.writeFileSync(fp + '.min', lzString.compressToUTF16(JSON.stringify(require(fp))));
};
