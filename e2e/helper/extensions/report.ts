// declare var require: any
const report = require("multiple-cucumber-html-reporter");

import { DeviceInfo, getDeviceInfo } from '../extensions/device-info';
import { CucumberConverter } from 'cucumber-to-junit';
import { getEnv } from '../helper';

console.log("\nRunning test report generator scripts\n");

const device: DeviceInfo = getDeviceInfo();

getEnv();

report.generate({
  jsonDir: "cucumber",
  reportPath: "./test-results/html-report",
  reportName: "Puppeteer BDD PoC Report",
  pageTitle: "Test Report",
  displayDuration: true,
  metadata: {
    browser: {
      name: device.client.name,
      version: device.client.version
    },
    device: device.device.type,
    platform: {
      name: device.os.name,
      version: `${device.os.version}  ${device.os.platform}`,
    },
  },
  customData: {
    title: "Run info",
    data: [
      { label: "Project", value: "Custom project" },
      { label: "Build", value: "1.2.3" },
      { label: "Test Environment", value: `${process.env.ENV}`},
      { label: "Browser Engine", value: device.client.engine},
      { label: "Browser Engine Version", value: device.client.engine_version}
    ],
  },
});

console.log("\ncreating junit reports\n");

const converter = new CucumberConverter({
  markUndefinedAsFailed: true // undefined scenario steps will fail the test case
});

converter.convertToJunit('cucumber/report.json','test-results/cucumber-report-junit.xml');