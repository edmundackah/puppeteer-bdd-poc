import { PuppeteerScreenRecorder } from 'puppeteer-screen-recorder';
import { PickleTag } from '@cucumber/messages';
import { Logger } from 'winston';
import { Page, Product } from 'puppeteer';
import { CustomWorld } from '../../test/features/world';

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

export const screenRecorder = async (world: CustomWorld) : Promise<PuppeteerScreenRecorder> => {
    if (includesRecordTag(world.pickle.tags, world.logger)) {
      const recorder = new PuppeteerScreenRecorder(world.page, Config);
      const path = `test-results/videos/${world.pickle.name}/${world.browserName}-${world.pickle.id || ""}.mp4`;  // supports extension - mp4, avi, webm and mov
      world.logger.info(`recording current scenario to:  ${path}`);
      return await recorder.start(path);
    }

    return null;
}