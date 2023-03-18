const fs = require('fs');
const path = require('path');

const filePath = process.argv[2];

const nonInteractive = () => {
  if (!fs.existsSync(path.resolve(__dirname, filePath))) {
    console.log(`file ${filePath} does not exist`);
    return;
  }

  fs.readFile(path.resolve(__dirname, filePath), 'utf-8', (err, data) => {
    if (err) throw err;

    if (!formatChecking(data)) {
      console.log('invalid file format');
      return;
    }

    const [a, b, c] = data
      .replace(/\n/, '')
      .split(' ')
      .map((elem) => +elem);

    if (a === 0) {
      console.log('Error. a cannot be 0');
      return;
    }

    squareEquation(a, b, c);
  });
};

const interactive = () => {
  const requests = [
    '\x1b[0mInput a: \x1b[1;32m',
    '\x1b[0mInput b: \x1b[1;32m',
    '\x1b[0mInput c: \x1b[1;32m',
  ];
  const NUM_REQUEST = requests.length;
  const params = [];

  const question = (i) => {
    process.stdout.write(requests[i]);
  };

  question(0);
  process.stdin.on('data', (data) => {
    if (params.length < NUM_REQUEST) {
      if (isNaN(data)) {
        console.log(
          `\x1b[0mError. Expected a valid real number, got ${data
            .toString()
            .trim()} instead`
        );

        question(params.length);
      } else if (data.toString().trim() == 0 && params.length == 0) {
        console.log(`\x1b[0mError. a cannot be 0`);
        question(params.length);
      } else {
        params.push(+data.toString().trim());
        if (params.length < NUM_REQUEST) {
          question(params.length);
        } else {
          const [a, b, c] = params;
          squareEquation(a, b, c);
          process.exit();
        }
      }
    }
  });
};

const squareEquation = (a, b, c) => {
  console.log(
    `\x1b[0mEquation is: (${a.toFixed(1)}) x^2 + (${b.toFixed(
      1
    )}) x + (${c.toFixed(1)}) = 0`
  );

  const discr = b ** 2 - 4 * a * c;

  if (discr < 0) console.log('There are 0 roots');
  else {
    const x1 = (-b + Math.sqrt(discr)) / (2 * a);
    const x2 = (-b - Math.sqrt(discr)) / (2 * a);
    console.log(
      discr === 0
        ? `There are 1 roots \nx1 = ${x1.toFixed(1)}`
        : `There are 2 roots\nx1 = ${x1.toFixed(1)}\nx2 = ${x2.toFixed(1)}`
    );
  }
};

const formatChecking = (data) =>
  /^-?\d+\.?\d*\s-?\d+\.?\d*\s-?\d+\.?\d*/.test(data);

filePath === undefined ? interactive() : nonInteractive();
