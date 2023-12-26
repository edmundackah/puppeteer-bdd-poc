import {Before, BeforeAll, After, AfterAll, Status} from '@cucumber/cucumber';
import * as puppeteer from 'puppeteer';

import { CustomWorld } from '../test/features/world';
import { getEnv } from '../helper/env/env';

let browser: puppeteer.Browser;

//Docs: https://cucumber.io/docs/cucumber/api/?lang=javascript#tags

BeforeAll(async function () {
    getEnv();
});

Before(async function (this: CustomWorld) {
    browser = await puppeteer.launch({headless: "new"});
    this.browser = browser;
    this.page = await browser.newPage();
})

After(async function (this: CustomWorld, {pickle, result}) {
    
    //screenshot on test failure
    if (result?.status == Status.FAILED) {
        //@ts-ignore
        const img:Buffer = await this.page?.screenshot({
            fullPage: true,
            encoding: "binary",
            path: `./screenshots/${pickle.name}.png`
        });
        this.attach(img, {mediaType: 'image/png'});
    }
    
    await browser.close();
});

AfterAll(async function () {
    
});