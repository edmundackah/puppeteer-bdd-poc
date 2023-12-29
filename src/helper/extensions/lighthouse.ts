// import { Logger } from 'winston';

// import { LighthouseExtension } from './runner-extension';
// import { createRunner, parse } from '@puppeteer/replay';
// import { CustomWorld } from '../../test/features/world';
// import { readFileSync } from "fs-extra";


// export async function analyseUserFlow (this: CustomWorld, filename: string, scenarioName: string, sessionId: string) {
//     const path = `src/test/user_flows/${filename}`;
//     this.logger.info(`Reading userflow recording: ${path}`);
//     const recording = parse(JSON.parse(readFileSync(path, 'utf8')));

//     const extension = new LighthouseExtension(this.logger, this.browser, this.page, {timeout: 7000});
//     const lighthouse = await createRunner(recording, extension);

//     lighthouse.run();
//     await extension.createFlowResult();
// }

// export const generateUserFlowReport = async (scenarioName: string, sessionId: string, logger: Logger, lighthouse?: LighthouseExtension) => {
    
//     //const result = await lighthouse?.createFlowResult();

//     const path = `./test-results/logs/${scenarioName}/${sessionId}/`;

//     logger.info(`writing lighthouse reports to : ${path}`);

//     // writeFileSync(`${path}/report.html`, await flow.generateReport());
//     // writeFileSync(`${path}/flow-result.json`, JSON.stringify(await flow.createFlowResult(), null, 2));
// }