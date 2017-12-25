let puppeteer = require('puppeteer');
let browser = null;
let page = null;

describe('Lazada test', () => {

    beforeAll(async() => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
        await page.setViewport({
            width: 1280,
            height: 720
        });
        jest.setTimeout(60000);
    });

    afterAll(async() => {
        await browser.close();
    });

    beforeEach(async() => {
        await page.goto('https://lazada.vn');
    });

    test('Search sexy underwear', async() => {
        expect.assertions(1);
        try {
            const searchBox = await page.$('#q');
            await searchBox.type('sexy underwear');
            await searchBox.press('Enter');

            await page.waitForNavigation();
            const products = await page.$$('div[data-qa-locator=product-item]');
            expect(products.length).toBe(40);
        } catch (error) {
            console.log(error);
        }
    });

    test('Install app', async() => {
        expect.assertions(1);
        try {
            const appDownloadLink = await page.xpath('//*[@id="topActionDownload"]');
            await appDownloadLink.click();

            await page.waitForNavigation();
            const breadCrumbHandle = await page.xpath('/html/body/header/footer/div[2]/div[1]/ul/li[2]/span');
            const text = await page.evaluate(element => element.innerText, breadCrumbHandle);

            expect(text).toContain('App Mobile tại Lazada');
        } catch (error) {
            console.log(error);
        }
    });
})