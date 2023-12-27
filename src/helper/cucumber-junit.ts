import { CucumberConverter } from 'cucumber-to-junit';

const converter = new CucumberConverter({
  markUndefinedAsFailed: true // undefined scenario steps will fail the test case
});

converter.convertToJunit('test-results/cucumber-report.json', 'test-results/cucumber-report-junit.xml');
