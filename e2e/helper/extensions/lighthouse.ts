declare var require: any
const ReportGenerator = import("lighthouse/report/generator/report-generator.js");
import { LighthouseExtension } from './runner-extension';
import { createRunner, parse } from '@puppeteer/replay';
import { readFileSync, writeFileSync, mkdirSync } from "fs-extra";
import { Browser, Page } from 'puppeteer';
import { Logger } from 'winston';
import { CustomWorld } from '../../test/features/world';

export async function analyseUserFlow (world: CustomWorld, filename: string) {
    const path = `e2e/test/user_flows/${filename}`;
    const recording = parse(JSON.parse(readFileSync(path, 'utf8')));

    const extension = new LighthouseExtension(world.logger, world.browser, world.page, {timeout: 7000});
    const lighthouse = await createRunner(recording, extension);
    
    //run lighthouse report
    await lighthouse.run();

    //save lighthouse report results
    const result = await extension.createFlowResult();

    //create save directory
    const reportBasePath = `./test-results/lighthouse/${world.scenarioName}/${world.browserName}`;
    mkdirSync(reportBasePath, { recursive: true });

    const reportPath = `${reportBasePath}/user-flow-${world.sessionId}`;

    const html = (await ReportGenerator).ReportGenerator.generateFlowReportHtml(result);

    world.logger.info(`saving lighthouse reports to: ${reportPath}`);

    writeFileSync(`${reportPath}.html`, html);
    writeFileSync(`${reportPath}.json`, JSON.stringify(result));
}