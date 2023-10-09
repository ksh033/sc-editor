const { execa } = require('@umijs/utils');
const { join } = require('path');
const getPackages = require('./utils/getPackages');

process.setMaxListeners(Infinity);


  const pkgList = ['cmp-center','element', 'editor-core'].map((name) => {
    // eslint-disable-next-line import/no-dynamic-require
    return require(join(__dirname, '../packages', name, 'package.json')).name;
  });
  console.log(pkgList)
  const commands = pkgList.map((pkg) => {

    console.log(`pnpm['--filter',${pkg},"dev"]`)
    const subprocess = execa.execa(`pnpm`,['--filter',`${pkg}`,"dev"]);
     subprocess.stdout.pipe(process.stdout);
    return subprocess;
  });
  Promise.all(commands);


// const subprocess = execa.execa(`pnpm`,['--filter', "@sceditor/editor-core","dev"]);
// subprocess.stdout.pipe(process.stdout);
//   return subprocess;

// const subprocess = execa.execa('npm run build-core:dev"');

// subprocess.stdout.pipe(process.stdout);

// const subprocess2 = execa.execa('npm run build-core:dev"');