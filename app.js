const puppeteer = require('puppeteer');
const prompt = require('prompt-sync')({sigint: true});
const colors = require('colors')
const setTitle = require('node-bash-title')
const inquirer = require('inquirer');
const fs = require('fs');
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
    

var errorText = 'ERROR:'.red + ' An error occurred'.white;

setTitle('Roblox Thumbnail Grabber - Scr1pp3d')


var urlBase = {}; 

function start() {
    process.stdout.write('\033c');
    console.log()
    console.log('█▀█ █▀█ █▄▄ █░░ █▀█ ▀▄▀   ▀█▀ █░█ █░█ █▀▄▀█ █▄▄ █▄░█ ▄▀█ █ █░░   █▀▀ █▀█ ▄▀█ █▄▄ █▄▄ █▀▀ █▀█'.brightMagenta)
    console.log('█▀▄ █▄█ █▄█ █▄▄ █▄█ █░█   ░█░ █▀█ █▄█ █░▀░█ █▄█ █░▀█ █▀█ █ █▄▄   █▄█ █▀▄ █▀█ █▄█ █▄█ ██▄ █▀▄'.brightMagenta)
    console.log('By Scr1pp3d'.brightWhite)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('RIGHT CLICK TO PASTE | CTRL + C TO QUIT'.brightWhite)
    console.log()

}


menu()

function menu() {
    start()
    inquirer
    .prompt([
        {
            name: "MENU",
            message: "MENU",
            type: "list",
            prefix: '+',
            suffix: '\n',
            choices: ["START", "TUTORIAL", "CREDITS", "CLOSE"],

        }
    ])
    .then((answer) => {

        if (answer.MENU === "START") {
            convertInput()
        }
        else if (answer.MENU === "TUTORIAL") {
            showTutorial()
        }
        else if (answer.MENU === "CREDITS") {
            showCredits()
        }
        else if (answer.MENU === "CLOSE") {
            process.exit();
        }


      });
}

function showTutorial() {
    start()
    console.log('TUTORIAL'.brightMagenta)
    console.log()
    console.log('1. '.brightMagenta + 'Enter a URL/ID/GAME NAME'.brightWhite);
    console.log()
    console.log('   - EXAMPLE URL:');
    console.log('       a) '.brightMagenta + 'https://www.roblox.com/games/6824946645/Keeping-Up-With-The-Kardashians-KUWTK-Hangout')
    console.log('       b) '.brightMagenta + 'https://www.roblox.com/games/6824946645')

    console.log()
    console.log('   - EXAMPLE ID:')
    console.log('       a) '.brightMagenta + '6824946645')

    console.log()
    console.log('   - EXAMPLE GAME NAME:')
    console.log('       a) '.brightMagenta + 'Keeping Up With The Kardashians (KUWTK) Hangout')

    console.log()
    console.log('2. '.brightMagenta + 'The thumbnail(s) associated with the game can be dowloaded in two different ways (you can choose which way you\'d like)'.brightWhite);
    console.log('       a) '.brightMagenta + 'A link is generated where you can see the image and choose how you\'d like to download it.')
    console.log('       b) '.brightMagenta + 'The image is downloaded for you by this app.')
    console.log()

    prompt('DONE: ')

    menu()

}

function showCredits() {
    start()

    console.log('ROBLOX: '.brightMagenta + '@Scr1pp3d')
    console.log('ROBLOX: '.brightMagenta + 'https://www.roblox.com/users/1957038621/profile')
    console.log()
    console.log('GITHUB: '.brightMagenta + 'Scripped')
    console.log('GITHUB: '.brightMagenta + 'https://github.com/Scripped')
    console.log()
    console.log('YOUTUBE: '.brightMagenta + 'Scr1pp3d')
    console.log('YOUTUBE: '.brightMagenta + 'https://www.youtube.com/channel/UCG_tohxYWPKHIvTUjvHsMNg')
    console.log()

    prompt('DONE: ')

    menu()

}





function convertInput() {
    start()
    var userIn = prompt('Enter URL/ID/GAME NAME: '.brightMagenta)

    if (userIn.startsWith('http') && userIn.includes('roblox.com/games')) {
        findUrl()
    }
    else if (parseInt(userIn)) {
        convertIDtoURL()
    }
    else {
        convertGameNameToURL()
    }

    function findUrl() {
        console.log('URL Entered'.brightMagenta)
        console.log()
        var url = userIn;

        urlBase.url = url;

        grabThumbnails()
       
    }

    function convertIDtoURL() {
        console.log('ID Entered'.brightMagenta)
        console.log()

        var url = 'https://roblox.com/games/' + userIn

        urlBase.url = url;

        grabThumbnails()
    }

    async function convertGameNameToURL() {
        console.log('Game Name Entered'.brightMagenta)
        console.log()



        const browser = await puppeteer.launch({executablePath: './chromium/win64-901912/chrome-win/chrome.exe', headless:true})
        const page = await browser.newPage()

        var tempURL = 'https://www.roblox.com/discover/?keyword=' + userIn;
        await page.goto(tempURL)

        await page.waitForSelector('.container-footer')
        await page.waitForSelector('.games-list-container')
        await page.waitForSelector('.games-list-container *')
        await page.waitForSelector('.game-card-name')

        var game = await eval(`page.evaluate(() => {
            const gameNames = Array.from(document.querySelectorAll('.game-card .game-card-name'))
            return gameNames.map(gameName => {
                return gameName.textContent;
            
            });
        })`);

        var gameID = await eval(`page.evaluate(() => {
            const lis = Array.from(document.querySelectorAll('.game-card-link'))
            return lis.map(li => {
                return li.href
            
            });
        })`);

        
        
        i = 0;

        while (i < game.length) {
            var gameCor = prompt('Is this the game you\'re looking for: ' + game[i] + ' (n) ');

            if (gameCor.toLowerCase().includes('y')) {

                var url = gameID[i];
                

                urlBase.url = url;


                browser.close()
                return grabThumbnails()
                


            }

           

            i++

            if (i === game.length) {
                console.log()
                console.log('Those were all the resutls, the game you searched cannot be found.')
                var startAgain = prompt('Search again? (y)')

                if (startAgain.toLowerCase().includes('n')) {
                    browser.close()
                    process.exit()
                }
                else {
                    browser.close()
                    menu()
                }
                
            }

           


        }

        browser.close() 
       

    }

    async function grabThumbnails() {
        start()

        const browser = await puppeteer.launch({executablePath: './chromium/win64-901912/chrome-win/chrome.exe', headless:true})
        const page = await browser.newPage()
        await page.goto(urlBase.url)

        await page.waitForSelector('.game-details-carousel-container')
        await page.waitForSelector('.thumbnail-2d-container')
        await page.waitForSelector('.carousel-item *')
        await page.waitForSelector('.carousel-item-active')
        await page.waitForSelector('.carousel-item-active *')

        

        var thumbnail = await eval(`page.evaluate(() => {
            const imgs = Array.from(document.querySelectorAll('.game-details-carousel-container img'))
            return imgs.map(img => {
                return img.getAttribute('src');
            
            });
        })`)

        var gameName = await eval(`page.evaluate(() => {
            return document.querySelector('.game-name').textContent;
        })`)

        
        i = 0;


        console.log(gameName.brightWhite)
        console.log()
        console.log('There are '.brightMagenta + thumbnail.length + ' thumbnail(s) in total.'.brightMagenta)
        console.log()
        console.log('Image Links:')
        console.log(thumbnail)
        var getAllLinks = prompt('Would you like these links saved in a .txt file? (n) ')
        console.log()

        if (getAllLinks.toLowerCase().includes('y')) {

            const writeStream = fs.createWriteStream('ImageLinks.txt');
            const pathName = writeStream.path;

            thumbnail.forEach(value => writeStream.write(`${value}\n`));

            await sleep(2000)
            console.log('Image links saved to: ' + pathName);
            await sleep(2000)
            console.log('Check this file, if the links have not been downloaded, you may choose to continue and get the images downloaded.')
            console.log()
            
            await sleep(2000)

            inquirer
            .prompt([
                {
                    name: "CONTQUIT",
                    message: "Would you like to continue or quit?",
                    type: "list",
                    prefix: '+',
                    choices: ["CONTINUE (Choose which images you'd like to download)", "QUIT"]
        
                }
            ])
            .then((answer) => {
        
                if (answer.CONTQUIT === "CONTINUE (Choose which images you'd like to download)") {
                    continuePro()
                }
                else if (answer.CONTQUIT === "QUIT") {
                    browser.close()
                    process.exit()
                }
        
        
            });
        }
        else {
            continuePro()
        }

        async function continuePro() {
            start()
            console.log('Total Images: ' + thumbnail.length)
            while (i < thumbnail.length) {
                console.log()
                console.log('Slide '.brightMagenta + (parseInt(i)+parseInt(1)) + '/' + thumbnail.length + ' Image Link: '.brightMagenta + thumbnail[i])
    
                var downloadImg = prompt('Would you like this image downloaded: (n) ')
    
                if (downloadImg.includes('y')) {
                    await page.goto(thumbnail[i])
                    await page.screenshot({path: 'Thumbnail'+(parseInt(i)+parseInt(1))+'.png', fullPage: true })
                    console.log('Image should be downloaded in a file called: '.brightMagenta+ 'Thumbnail'+(parseInt(i)+parseInt(1))+'.png')
                    console.log('If it\'s not, download it manually using the link above OR the link(s) in the ImageLinks.txt file.'.brightMagenta)
                    console.log()
                    
                }
    
                i++;
                
    
            }
            prompt('Press any key to quit: ')
            browser.close()
        }


        /* prompt('Press any key to quit: ')
        browser.close() */

        
    }
    

}