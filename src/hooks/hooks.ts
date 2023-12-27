import {Before, BeforeAll, After, AfterAll, Status} from '@cucumber/cucumber';
import * as puppeteer from 'puppeteer';

import { CustomWorld } from '../test/features/world';
import { getUserAgent } from '../helper/device-info';
import { getEnv, launchOptions } from '../helper/env/env';

//Docs: https://cucumber.io/docs/cucumber/api/?lang=javascript#tags

//Docs: https://github.com/cucumber/cucumber-js/blob/main/docs/support_files/world.md


BeforeAll(async function () {
    getEnv();
});

Before(async function (this: CustomWorld) {
    this.browser = await puppeteer.launch(launchOptions());
    getUserAgent(await this.browser?.userAgent());
    this.page = await this.browser.newPage();
})

After(async function (this: CustomWorld, {pickle, result}) {
    
    //screenshot on test failure
    if (result?.status == Status.FAILED) {
        //@ts-ignore
        const img: Buffer = await this.page?.screenshot({
            fullPage: true,
            encoding: "binary",
            path: `test-results/screenshots/${pickle.name}.png`
        });
        this.attach(img, {mediaType: 'image/png'});
    }
    
    await this.browser.close();
});

AfterAll(async function () {
    
});