const https = require('https');
const { execSync } = require('child_process');
const readline = require('readline');
const config = require('./_config');

function publish() {
  https
    .get(`${config.packageUrl}`,(res) => {
      let body = '';

      res.on('data', (chunk) => {
        body += chunk;
      });

      res.on('end', () => {
        try {
          const json = JSON.parse(body);

          buildProd(getVersionFromNpm(json));
        } catch (error) {
          throw error.message;
        }
      });
    })
    .on('error', (error) => {
      console.error(error.message);
    });
}

function buildProd(version) {
  console.log(version);
  const promptFactory = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const message = `Specify version (current: ${version}). Leave empty to increment patch version to ${increaseVersion(version)}: `;

  promptFactory.question(message, (customVersion) => {
    const isVersionValid = (/(\d+).(\d+).(\d+)/.test(customVersion));

    if (customVersion && !isVersionValid) {
      console.log('Entered incorrect version');
    } else {
      execSync('npm run build:xodus');

      execSync('npm publish', { cwd: config.dist });
    }

    promptFactory.close();
  });
}

function getVersionFromNpm(json) {
  const versions = Object.keys(json.time);

  return versions[versions.length - 1];
}

function increaseVersion(version, threshold = 1) {
  const versionArr = version.split('.');
  const increasedVersion = versionArr.map((item, index) => {
    if (index === versionArr.length - 1) {
      return (+item + threshold).toString();
    }

    return item;
  });

  return increasedVersion.join('.');
}

publish();
