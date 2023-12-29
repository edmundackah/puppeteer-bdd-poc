declare var require: any
const ReportGenerator = import("lighthouse/report/generator/report-generator.js");
import { LighthouseExtension } from './runner-extension';
import { createRunner, parse } from '@puppeteer/replay';
import { readFileSync, writeFileSync, mkdirSync } from "fs-extra";
import { Browser, Page } from 'puppeteer';
import { Logger } from 'winston';

export async function analyseUserFlow (logger: Logger, browser: Browser, page: Page, filename: string, scenarioName: string, sessionId: string) {
    const path = `src/test/user_flows/${filename}`;
    const recording = parse(JSON.parse(readFileSync(path, 'utf8')));

    const extension = new LighthouseExtension(logger, browser, page, {timeout: 7000});
    const lighthouse = await createRunner(recording, extension);
    
    //run lighthouse report
    await lighthouse.run();

    //save lighthouse report results
    const result = await extension.createFlowResult();

    //create save directory
    const reportBasePath = `./test-results/lighthouse/${scenarioName}`;
    mkdirSync(reportBasePath, { recursive: true });

    const reportPath = `${reportBasePath}/user-flow-${sessionId}`;

    const html = (await ReportGenerator).ReportGenerator.generateFlowReportHtml(result);

    logger.info(`saving lighthouse reports to: ${reportPath}`);

    writeFileSync(`${reportPath}.html`, html);
    writeFileSync(`${reportPath}.json`, JSON.stringify(result));
}