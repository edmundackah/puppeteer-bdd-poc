import { PuppeteerRunnerExtension, Step, UserFlow } from '@puppeteer/replay';

export class Extension extends PuppeteerRunnerExtension {
  async beforeAllSteps(flow: UserFlow) {
    await super.beforeAllSteps(flow);
    console.log('starting');
  }

  async beforeEachStep(step: Step, flow: UserFlow) {
    await super.beforeEachStep(step, flow);
    console.log('before', step);
  }

  async afterEachStep(step: Step, flow: UserFlow) {
    await super.afterEachStep(step, flow);
    console.log('after', step);
  }

  async afterAllSteps(flow: UserFlow) {
    await super.afterAllSteps(flow);
    console.log('done');
  }
}