#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

if (process.argv.length < 3) {
    console.log('Please provide a name for your Dapp');
    console.log('For example :');
    console.log('    npx make-web3-dapp my-app');
    process.exit(1);
}

const projectName = process.argv[2];
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);
const git_repo = "https://github.com/aasharck/make-web3-dapp.git";

try {
    fs.mkdirSync(projectPath);
  } catch (err) {
    if (err.code === 'EEXIST') {
      console.log(`The file ${projectName} already exist in the current directory, please give it another name.`);
    } else {
      console.log(error);
    }
    process.exit(1);
  }

  async function main() {
    try {
      console.log('Downloading files...');
      execSync(`git clone --depth 1 ${git_repo} ${projectPath}`);

      process.chdir(projectPath);

      console.log('Installing dependencies...');
      execSync('npm install');

      console.log('Removing useless files');
      execSync('npx rimraf ./.git');
      fs.rm(path.join(projectPath, 'bin'), { recursive: true }, (error) => {console.log(error)});
      
      console.log('=====================================================');
      console.log('All Done! Web3 Dapp Boilerplate successfully Created!');
      console.log('=====================================================');

    } catch (error) {
      console.log(error);
    }
}
main();