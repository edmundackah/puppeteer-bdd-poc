declare var require: any
const report = require("multiple-cucumber-html-reporter");

import { DeviceInfo, getDeviceInfo } from '../helper/device-info';

console.log("\nRunning test report generator scripts\n");

const device: DeviceInfo = getDeviceInfo();

report.generate({
  jsonDir: "test-results",
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
      { label: "Browser Engine", value: device.client.engine},
      { label: "Browser Engine Version", value: device.client.engine_version},
      { label: "Execution Start Time", value: "Nov 19th 2017, 02:31 PM EST" },
      { label: "Execution End Time", value: "Nov 19th 2017, 02:56 PM EST" },
    ],
  },
});