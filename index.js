const fs = require("fs");
const axious = require("axios");
const inquirer = require("inquirer");

let entrUserName;
let userBio;
let userImg;
let userEmail;
let repoInfo;
const readMe;


function askUserName() {
    return new Promise((resolve, reject) => {
        inquirer
            .prompt([
                {
                    type: `input`,
                    message: `\n-------------------------------------------------\nWhat is your GitHub user name?\n-------------------------------------------------\n`,
                    name: `githubUser`,
                }
            ]).then(({githubUser}) => {
                return resolve(githubUser);
            });
    });
};

function getUserInfo(userName) {

    return axious.get(`https://api.github.com/users/${userName}`)
    .then(function(response) {
        console.log(`User "${userName}" has been found!`);
        userBio = response.data.bio;
        userImg = response.data.avatar_url;
        userEmail = response.data.email;
    }).catch(function (error) {
        console.log(`User "${userName}" not found. Please try again.`);
        process.exit(1);
    });

};

function getProjectInfo() {
    return new Promise((resolve, reject) => {

        inquirer
            .prompt([
                {
                    type: `input`,
                    message: `\n-------------------------------------------------\nProject Title:\n-------------------------------------------------\n`,
                    name: `projectTitle`
                },
                {
                    type: `input`,
                    message: `\n-------------------------------------------------\nProject Description (2-3 sentences):\n-------------------------------------------------\n`,
                    name: `projectDescription`
                },
                {
                    type: `input`,
                    message: `\n-------------------------------------------------\nHow is this project installed?\n-------------------------------------------------\n`,
                    name: `projectInstall`
                },
                {
                    type: `input`,
                    message: `\n-------------------------------------------------\nHow is this project used?\n-------------------------------------------------\n`,
                    name: `projectUsage` 
                },
                {
                    type:`list`,
                    name: `projectLicense`,
                    message: `\n-------------------------------------------------\nWhat is the License on your project?\n-------------------------------------------------\n`,
                    choices: [`None`, `Apache License 2.0`, `GNU General Public License v3.0`,`MIT License`, `BSD 2-Clause "Simplified" License`, `BSD 3-Clause "New" or "Revised" License`, `Creative Commons Zero v1.0 Universal`, `Eclipse Public License 2.0`, `GNU Affero General Public License v3.0`, `GNU General Public License v2.0`, `GNU Lesser General Public License v2.1`, `GNU Lesser General Public License v3.0`, `Mozilla Public License 2.0`, `The Unlicense`]
                    
                },
                // {
                //     type: `input`,
                //     name: `projectTesting`,
                //     message: `Any testing you did that you woud like included in your readme.md?`
                // },
                {
                    type: `input`,
                    name: `additionalCollab`,
                    message: `\n-------------------------------------------------\nAny other collaborators on your project?\n-------------------------------------------------\n`
                }
            ]).then((answers) => {
                repoInfo = answers;
                fillReadme();
            }).catch(() => {
                console.log(`Something went wrong... please try again.`);
                process.exit(1);
            })
    });    
};

function fillReadme() {
    readMe = `
    # ${repoInfo.projectTitle}
    
    ${repoInfo.projectDescription}
    
    ## Table of Contents
    
    * [Installation](#installation)
    * [Description](#description)
    * [Usage](#usage)
    * [License](#license)
    * [Contributing](contributing)
    * [Tests](tests)
    * [Questions](questions)     
    
    ## Installation
    
    ${repoInfo.projectInstall}
    
    ## Usage

    ${repoInfo.projectUsage}
    
    ## License
    
    ${repoInfo.projectLicense}
    
    ## Contributing
    
    ${repoInfo.additionalCollab}

    ## Tests
    
    ${repoInfo.additionalCollab}

    ## Questions
    ${userBio}
    ${userEmail}
    ![Developer Photograph](${userImg})
     `
};

askUserName().then(getUserInfo).then(getProjectInfo).then(generateReadme);
