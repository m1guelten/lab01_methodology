const fs = require('fs');
const path = require('path');

const filePath = process.argv[2];

const nonInteractive = () => {
  if (!fs.existsSync(path.resolve(__dirname, filePath))) {
    console.log(`file ${filePath} does not exist`);
    return;
  } else {
    fs.readFile(path.resolve(__dirname, filePath), 'utf-8', (err, data) => {
      if (err) throw err;

      if (!formatChecking(data)) {
        console.log('invalid file format');
        return;
      } else {
        const [a, b, c] = data
          .replace(/\n/, '')
          .split(' ')
          .map((elem) => +elem);

        if (a === 0) {
          console.log('Error. a cannot be 0');
          return;
        }
        console.log(`\n a=${a} b=${b} c=${c} `);
      }
    });
  }
};

const formatChecking = (data) => {
  return /^-?\d+.?\d*\s-?\d+.?\d*\s-?\d+.?\d*/.test(data);
};

nonInteractive();
