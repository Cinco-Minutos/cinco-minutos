const lzString = require('lz-string');
const fs = require('fs');
const compressInPlace = fp => {
  fs.writeFileSync(fp + '.min', lzString.compressToUTF16(fs.readFileSync(fp).toString()));
}
process.argv.slice(2).map(compressInPlace);