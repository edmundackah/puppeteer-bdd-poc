import { World, IWorldOptions, setWorldConstructor} from '@cucumber/cucumber';
import { PuppeteerScreenRecorder } from 'puppeteer-screen-recorder';
import { Logger } from 'winston';
import { Browser, Page } from 'puppeteer';

export interface CustomWorld extends World {
    page?: Page;
    browser?: Browser;
    logger: Logger;
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