import * as dotenv  from 'dotenv';
import { PuppeteerLaunchOptions } from 'puppeteer';

export const getEnv = () => {

    dotenv.config({
        override: true,
        path: `e2e/helper/env/.env.${process.env.ENV}`
    });
}

export const launchOptions = () : PuppeteerLaunchOptions => {
    return JSON.parse(process.env.LAUNCH_OPTIONS) as PuppeteerLaunchOptions;
}