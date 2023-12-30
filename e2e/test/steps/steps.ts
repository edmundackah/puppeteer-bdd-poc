import { Given, When, Then } from '@cucumber/cucumber';
import { createRunner, parse } from '@puppeteer/replay';
import { readFileSync } from "fs-extra";

var assert = require('cucumber-assert');

import { CustomWorld } from '../features/world';
import { ReplayExtension } from '../../helper/extensions/runner-extension';
import { analyseUserFlow } from '../../helper/extensions/lighthouse';

Given('I am on {string}', async function(this: CustomWorld, url: string) {
    await this.page?.goto(url);
});

When('I click the {string} button', async function (this: CustomWorld, selector: string) {
    await this.page?.waitForSelector(selector);
    await this.page?.click(selector);
});

When('I wait for {string} to render', async function (this: CustomWorld, selector: string) {
    await this.page?.waitForSelector(selector);
});

When('I type {string} into {string} input field', async function (this: CustomWorld, text: string, selector: string) {
    await this.page?.waitForSelector(selector);
    await this.page?.type(selector, text);
});

When('I press Enter', async function(this: CustomWorld) {
    await this.page?.keyboard.press('Enter');
});

When('I play the user flow recording {string}', async function(this: CustomWorld, filename: string) {
    const path = `e2e/test/user_flows/${filename}`;
    this.logger.info(`Reading userflow recording: ${path}`);
    const recording = parse(JSON.parse(readFileSync(path, 'utf8')));

    const runner = await createRunner(recording, new ReplayExtension(this, this.browser, this.page, {timeout: 7000}));
    await runner.run();
});

When('I generate a Lighthouse User Flow report from {string}', {timeout: 50 * 1000}, async function(this: CustomWorld, filename: string) {
    await analyseUserFlow(this.logger, this.browser, this.page, filename, this.scenarioName, this.sessionId);
});

Then('{string} will display {string}', async function(this: CustomWorld, selector: string, text: string) {
    await this.page?.waitForSelector(selector);
    let element = await this.page?.$(selector);

    let value = await this.page?.evaluate(el => el?.textContent, element);
    await assert.equal(value, text);
});

Then('I should see {string} in the url', async function(this: CustomWorld, text: string) {
    await assert.equal(this.page?.url(), text);
});