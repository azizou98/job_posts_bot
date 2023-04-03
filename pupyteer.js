const puppeteer = require('puppeteer');

(async () => {
    // Launch a headless browser
    const browser = await puppeteer.launch({ headless: true });

    // Open a new tab and navigate to the Google homepage
    const page = await browser.newPage();
    await page.goto('https://www.google.com/');

    // Type a search term into the search box and submit the form
    await page.type('input[name="q"]', 'dzfoot');
    await page.keyboard.press('Enter');

    // Wait for the search results to load
    await page.waitForSelector('div#search');

    // using evaluate we can access and manipulate
    // the DOM as if you were running code in the browser's console.

    await page.setDefaultNavigationTimeout(10000);
    try {
        await page.evaluate(() => {
            const firstResult = document.querySelector('#rso > div:nth-child(1) > div > div > div > div > div > div > div > div.yuRUbf > a');
            firstResult.click();
        });

        // Wait for the page to load
        await page.waitForNavigation({waitUntil: 'networkidle0'});

        // hna win rahi tesra l error te3 time out exeption w ana puisk ani
        // dayer 10 sec sema ydeclenchiha hna w ysoti direct lel catch
        // w ykemel script mel catch mchi men had la ligne


    }catch (er){
        console.log(er)

        // Take a screenshot of the search results and save it to a file
        await page.screenshot({path: 'google-results.png',
        clip: {
            x:110,
             y: 100,
              width:1000,
              height: 1000
        }}
        );
    }
    await page.evaluate(() => {
        const Result = document.querySelector(' #menu-item-41646 > a');
         Result.click();
    });

    await page.waitForSelector('#content > div:nth-child(2) > div > div:nth-child(2) > div > h3 > a');
    await page.click('#content > div:nth-child(2) > div > div:nth-child(2) > div > h3 > a')
    await page.waitForTimeout(5000)
    await page.screenshot({path: 'dzfot-results.png',
        clip: {
            x:110,
            y: 100,
            width:1000,
            height: 1000
        }}
    );

        // Close the browser
    await browser.close();
})();


