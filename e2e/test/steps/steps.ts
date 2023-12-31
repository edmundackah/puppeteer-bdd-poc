import { Given, When, Then } from '@cucumber/cucumber';

var assert = require('cucumber-assert');

import { replayRecording } from '../../helper/extensions/runner-extension';
import { analyseUserFlow } from '../../helper/extensions/lighthouse';
import { launchConfig } from '../../helper/helper';
import { CustomWorld } from '../features/world';
import { Product } from 'puppeteer';

Given('I am on {string}', async function(this: CustomWorld, url: string) {
    await this.page?.goto(url);
});

When('I click the {string} button', async function (this: CustomWorld, selector: string) {
    await this.page?.waitForSelector(selector);
    await this.page?.click(selector);
});

When('I type {string} into {string} input field', async function (this: CustomWorld, text: string, selector: string) {
    await this.page?.waitForSelector(selector);
    await this.page?.type(selector, text);
});

When('I press Enter', async function(this: CustomWorld) {
    await this.page?.keyboard.press('Enter');
});

When('I play the user flow recording {string}', async function(this: CustomWorld, filename: string) {
    await replayRecording(this, filename);
});

When('I generate a Lighthouse User Flow report from {string}', {timeout: 50 * 1000}, async function(this: CustomWorld, filename: string) {
    await analyseUserFlow(this, filename);
});

When('I have created a {string} browser instance', async function(this: CustomWorld, browser: string) {
    await launchConfig(this, (browser as unknown) as Product, false);
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