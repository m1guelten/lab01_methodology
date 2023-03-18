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

const interactive = () => {
  const requests = ['Input a: ', 'Input b: ', 'Input c: '];
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
          `Error. Expected a valid real number, got ${data
            .toString()
            .trim()} instead`
        );

        question(params.length);
      } else if (data.toString().trim() === 0 && params.length === 0) {
        console.log(`Error. a cannot be 0`);
        question(params.length);
      } else {
        params.push(+data.toString().trim());
        if (params.length < NUM_REQUEST) {
          question(params.length);
        } else {
          const [a, b, c] = params;
          console.log(`\n a=${a} b=${b} c=${c} `);
          process.exit();
        }
      }
    }
  });
};

const squareEquation = (a, b, c) => {
  console.log(
    `Equation is: 
    (${a.toFixed(1)}) x^2 + (${b.toFixed(1)}) x + (${c.toFixed(1)}) = 0`
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
  /^-?\d+.?\d*\s-?\d+.?\d*\s-?\d+.?\d*/.test(data);

//nonInteractive();
//interactive();
squareEquation(1, 5, 7);
