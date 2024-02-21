const puppeteer = require('puppeteer');
const cron = require('node-cron');

async function run() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate to the website

    await page.goto('https://www.ouedkniss.com/emploi_offres-informatique-internet/1?regionIds=alger-16');

    let height=0 ;

    for (i=0;i<2;i++) {
        // ra7 ndiro yskroli ghir 3 fois berk li nesha9hom

        await page.evaluate('window.scrollBy(0, window.innerHeight)');
        await page.waitForTimeout(1000);
       // scroling progressivelly here make the jobs apear line by line
        // ouedkniss ydir lazy load mode
        let newHeight = await page.evaluate('document.body.scrollHeight');
        /*
             if (newHeight === previousHeight) {
                   break;
               }*/
        await page.screenshot({path: `screenshot-${newHeight}.png`,   clip: {
                x:0,
                y: height,
                width:1000,
                height: 1900
            }});
        height=height+900;
    }

    const element = await page.$('h2.mb-1');
    console.log(element); // should log the element object

    const jobPosts = await page.$$('h2.mb-1');
    for (let post of jobPosts) {
        const title = await post.evaluate(el => el.textContent);
        console.log(title);
    }

    // NOTIFICATION
    const notifier = require('node-notifier');

// create an array to store the titles of the job posts
    let titles = [];

// loop through the job post elements and get their titles
    for (let post of jobPosts) {
        const title = await post.evaluate(el => el.textContent);
        titles.push(title);
    }

// join the titles array into a single string
    const message = titles.join('\n');

// send a desktop notification with the message
    notifier.notify({
        title: 'New Job Posts Available',
        message: message
    });


    // Close the browser
    await browser.close();
}

console.log('Bot code is finished...');
// Schedule the bot to run every hour
cron.schedule('* * * * *', async () => {
    console.log('Starting the bot...');

    // Put your bot code here
    run();
    // ...
});


    // dert changement num 1
