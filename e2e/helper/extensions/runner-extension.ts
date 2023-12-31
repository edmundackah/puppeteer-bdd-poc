import { LighthouseRunnerExtension, PuppeteerRunnerExtension, Step, UserFlow } from '@puppeteer/replay';
import { createRunner, parse } from '@puppeteer/replay';
import { Browser, Page } from 'puppeteer';
import { readFileSync } from "fs-extra";
import { Logger } from 'winston';

import { screenshot } from './screenshot';
import { CustomWorld } from '../../test/features/world';

export class LighthouseExtension extends LighthouseRunnerExtension {

  logger: Logger;

  constructor(winstonLogger: Logger, browser: Browser, page: Page, opts?: Object) {
    super(browser, page, opts);
    this.logger = winstonLogger;
  }

  async beforeAllSteps(flow: UserFlow) {
    await super.beforeAllSteps(flow);
    this.logger.info('starting lighthouse user flow analysis');
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
    this.logger.info('lighthouse user flow analysis complete');
  }
  
  async createFlowResult() {
    const result = await super.createFlowResult();
    return result;
  }

}

export class ReplayExtension extends PuppeteerRunnerExtension {

  world: CustomWorld;

  constructor(worldState: CustomWorld, browser: Browser, page: Page, opts?: Object) {
    super(browser, page, opts);
    this.world = worldState;
  }

  async beforeAllSteps(flow: UserFlow) {
    await super.beforeAllSteps(flow);
    this.world.logger.info('starting user flow');
  }

  async beforeEachStep(step: Step, flow: UserFlow) {
    await super.beforeEachStep(step, flow);
    this.world.logger.info(`before 	${JSON.stringify(step)}`);
  }

  async afterEachStep(step: Step, flow: UserFlow) {
    await super.afterEachStep(step, flow);
    await screenshot(null, this.world);
    this.world.logger.info(`after 	${JSON.stringify(step)}`);
  }

  async afterAllSteps(flow: UserFlow) {
    await super.afterAllSteps(flow);
    await screenshot(null, this.world);
    this.world.logger.info('user flow complete');
  }
}

export const replayRecording = async (world: CustomWorld, filename: string) => {
  const path = `e2e/test/user_flows/${filename}`;
  world.logger.info(`Reading userflow recording: ${path}`);
  const recording = parse(JSON.parse(readFileSync(path, 'utf8')));

  const runner = await createRunner(recording, new ReplayExtension(world, world.browser, world.page, {timeout: 7000}));
  await runner.run();
}