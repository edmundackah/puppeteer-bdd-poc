import { Before, BeforeAll, After, AfterAll, setDefaultTimeout } from '@cucumber/cucumber';

import { CustomWorld } from '../test/features/world';
import { screenshot } from '../helper/extensions/screenshot';
import { getEnv, launchConfig } from '../helper/helper';

//Docs: https://cucumber.io/docs/cucumber/api/?lang=javascript#tags

//Docs: https://github.com/cucumber/cucumber-js/blob/main/docs/support_files/world.md


setDefaultTimeout(500 * 1000);

BeforeAll(async function (this: CustomWorld) {
    getEnv();
});

Before(async function (this: CustomWorld, {pickle}) {
    this.pickle = pickle;
    this.scenarioName = pickle.name;
    this.sessionId = `${pickle.id || ""}`;

    await launchConfig(this, 'chrome', true);
})

After(async function (this: CustomWorld, {pickle, result}) {
    await screenshot(result, this);
    
    await this.screenRecorder?.stop();
    await this.browser.close();
    this.logger.end();
});

AfterAll(async function (this: CustomWorld) {
    
});