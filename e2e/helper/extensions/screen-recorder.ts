import { PuppeteerScreenRecorder } from 'puppeteer-screen-recorder';
import { PickleTag } from '@cucumber/messages';
import { Logger } from 'winston';
import { Page } from 'puppeteer';

const Config = {
    followNewTab: true,
    fps: 25,
    ffmpeg_Path: null,
    videoFrame: {
      width: 1024,
      height: 768,
    },
    videoCrf: 18,
    videoCodec: 'libx264',
    videoPreset: 'ultrafast',
    videoBitrate: 1000,
    autopad: {
      color: '#35A5FF',
    },
    aspectRatio: '4:3',
};

const includesRecordTag = (tags: readonly PickleTag[], logger: Logger) : Boolean => {
  if (process.env.RECORD_ALL === "false") {
    if (tags.find(t => t.name === '@Record')) {
      return true;
    } else return false;
  } else {
    logger.info(`env variable RECORD_ALL set to ${process.env.RECORD_ALL}`);
    return true;
  }
}

export const screenRecorder = async (page: Page, scenarioName: string, sessionId: string, tags: readonly PickleTag[], logger: Logger) : Promise<PuppeteerScreenRecorder> => {
    if (includesRecordTag(tags, logger)) {
      const recorder = new PuppeteerScreenRecorder(page, Config);
      const path = `test-results/videos/${scenarioName}/${sessionId}.mp4`;  // supports extension - mp4, avi, webm and mov
      logger.info(`recording current scenario:  ${path}`);
      return await recorder.start(path);
    }

    return null;
}