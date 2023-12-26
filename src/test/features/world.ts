import { World, IWorldOptions, setWorldConstructor} from '@cucumber/cucumber';
import * as puppeteer from 'puppeteer';

export interface CustomWorld extends World {
    page?: puppeteer.Page;
    browser?: puppeteer.Browser;
}

class TestWorld extends World<CustomWorld> {
    constructor(options: IWorldOptions) {
        super(options);
    }
}

setWorldConstructor(TestWorld);

//Docs: https://github.com/cucumber/cucumber-js/blob/main/docs/support_files/world.md

//NVM installation: https://github.com/coreybutler/nvm-windows/wiki#manual-installation