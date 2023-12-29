import { Before, BeforeAll, After, AfterAll, Status } from '@cucumber/cucumber';
import { mkdirSync } from "fs-extra";
import * as puppeteer from 'puppeteer';

import { CustomWorld } from '../test/features/world';
import { getUserAgent } from '../helper/extensions/device-info';
import { getEnv, launchOptions } from '../helper/env/env';
import { logger } from '../helper/extensions/logger';
import { screenRecorder } from '../helper/extensions/screen-recorder';

//Docs: https://cucumber.io/docs/cucumber/api/?lang=javascript#tags

//Docs: https://github.com/cucumber/cucumber-js/blob/main/docs/support_files/world.md

BeforeAll(async function () {
    getEnv();
});

Before(async function (this: CustomWorld, {pickle}) {
    this.scenarioName = pickle.name;
    this.sessionId = `${pickle.id || ""}`;
    this.logger = logger(this.scenarioName, this.sessionId);

    this.browser = await puppeteer.launch(launchOptions());
    getUserAgent(await this.browser?.userAgent());
    this.page = await this.browser.newPage();
    this.screenRecorder = await screenRecorder(this.page, pickle.name, `${pickle.id || ""}`, pickle.tags, this.logger);
})

After(async function (this: CustomWorld, {pickle, result}) {
    
    //screenshot on test failure
    if (result?.status == Status.FAILED) {
        const basePath = `test-results/screenshots/${pickle.name}/`;
        mkdirSync(basePath, { recursive: true });
        const img: Buffer = await this.page?.screenshot({
            fullPage: true,
            path: `${basePath}${pickle.id || ""}.png`
        });
        this.attach(img, {mediaType: 'image/png'});
    }
    
    await this.screenRecorder?.stop();
    await this.browser.close();
    this.logger.end();
});

AfterAll(async function (this: CustomWorld) {
    
});