import { PuppeteerRunnerExtension, Step, UserFlow } from '@puppeteer/replay';
import { Browser, Page } from 'puppeteer';
import { Logger } from 'winston';

export class Extension extends PuppeteerRunnerExtension {

  logger: Logger;

  constructor(winstonLogger: Logger, browser: Browser, page: Page, opts?: Object) {
    super(browser, page, opts);
    this.logger = winstonLogger;
  }

  async beforeAllSteps(flow: UserFlow) {
    await super.beforeAllSteps(flow);
    this.logger.info('starting user flow');
  }

  async beforeEachStep(step: Step, flow: UserFlow) {
    await super.beforeEachStep(step, flow);
    this.logger.info(`before 	${JSON.stringify(step)}`);
  }

  async afterEachStep(step: Step, flow: UserFlow) {
    await super.afterEachStep(step, flow);
    this.logger.info(`after 	${JSON.stringify(step)}`);
  }

  async afterAllSteps(flow: UserFlow) {
    await super.afterAllSteps(flow);
    this.logger.info('user flow complete');
  }
}