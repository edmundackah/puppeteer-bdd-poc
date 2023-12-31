import { launch, Product, PuppeteerLaunchOptions } from 'puppeteer';
import { Pickle } from '@cucumber/messages';
import { config } from 'dotenv';

import { CustomWorld } from '../test/features/world';
import { screenRecorder } from './extensions/screen-recorder';
import { configureNetwork } from './extensions/network';
import { getUserAgent } from "./extensions/device-info";
import { logger } from "./extensions/logger";

const createTestEnvironment = async (world: CustomWorld, launchConfig: PuppeteerLaunchOptions) => {
    world.browser = await launch(launchConfig);
    getUserAgent(await world.browser?.userAgent());
    world.page = await world.browser.newPage();
    await configureNetwork(world);
    world.screenRecorder = await screenRecorder(world);
}

export const launchConfig = async (world: CustomWorld, browser: Product = 'chrome', fromHook: boolean) => {
    const config = JSON.parse(process.env.LAUNCH_OPTIONS) as PuppeteerLaunchOptions;

    world.browserName = browser;
    world.logger = logger(world);

    if (fromHook == true) {
        world.logger.info(`setting default Puppeteer config: ${JSON.stringify(config)}`);
        await createTestEnvironment(world, config);
    } else {
        world.logger.info('delegating launch config to step definition');
        config.product = browser;
        await createTestEnvironment(world, config);
    }
}

export const getEnv = () => {
    config({ override: true, path: `e2e/helper/env/.env.${process.env.ENV}` });
}