import * as dotenv  from 'dotenv';
import * as puppeteer from 'puppeteer';

export const getEnv = () => {

    dotenv.config({
        override: true,
        path: `src/helper/env/.env.${process.env.ENV}`
    });
}

export const launchOptions = () : puppeteer.PuppeteerLaunchOptions => {
    return JSON.parse(process.env.HEADLESS) as puppeteer.PuppeteerLaunchOptions;
}