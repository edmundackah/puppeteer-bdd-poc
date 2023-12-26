import { Given, When, Then } from '@cucumber/cucumber';
var assert = require('cucumber-assert');

import { CustomWorld } from '../features/world';

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
    await this.page?.type(selector, text);
});

When('I press Enter', async function(this: CustomWorld) {
    await this.page?.keyboard.press('Enter');
});

Then('{string} will display {string}', async function(this: CustomWorld, selector: string, text: string) {
    await this.page?.waitForSelector(selector);
    let element = await this.page?.$(selector)
    let value = await this.page?.evaluate(el => el?.textContent, element);
    await assert.equal(value, text);
});

Then('I should see {string} in the url', async function(this: CustomWorld, text: string) {
    await assert.equal(this.page?.url(), text);
});