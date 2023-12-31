import { World, IWorldOptions, setWorldConstructor } from '@cucumber/cucumber';
import { PuppeteerScreenRecorder } from 'puppeteer-screen-recorder';
import { Pickle } from '@cucumber/messages';
import { Browser, Page, Product } from 'puppeteer';
import { Logger } from 'winston';

export interface CustomWorld extends World {
    page?: Page;
    pickle?: Pickle;
    browser?: Browser;
    browserName: Product
    logger: Logger;
    scenarioName?: string;
    sessionId?: string;
    screenRecorder?: PuppeteerScreenRecorder; 
}

class TestWorld extends World<CustomWorld> {
    constructor(options: IWorldOptions) {
        super(options);
    }
    
}

setWorldConstructor(TestWorld);

//Docs: https://github.com/cucumber/cucumber-js/blob/main/docs/support_files/world.md

//NVM installation: https://github.com/coreybutler/nvm-windows/wiki#manual-installation