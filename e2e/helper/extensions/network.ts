import { PickleTag } from '@cucumber/messages';
import { NetworkConditions } from 'puppeteer';

import { CustomWorld } from "../../test/features/world";

/**
 * @param download: Simulated download speed (bytes/s)
 * @param latency: Simulated latency (ms)
 * @param upload: Simulated upload speed (bytes/s)
 * @param latency: Simulated latency (ms)
 */
const presets: Record<string, NetworkConditions> = {
    '@Regular3G': {
      'download': 750 * 1024 / 8,
      'upload': 250 * 1024 / 8,
      'latency': 100
    },
    '@Good3G': {
      'download': 1.5 * 1024 * 1024 / 8,
      'upload': 750 * 1024 / 8,
      'latency': 40
    },
    '@Regular4G': {
      'download': 4 * 1024 * 1024 / 8,
      'upload': 3 * 1024 * 1024 / 8,
      'latency': 20
    },
    '@DSL': {
      'download': 2 * 1024 * 1024 / 8,
      'upload': 1 * 1024 * 1024 / 8,
      'latency': 5
    },
    '@WiFi': {
      'download': 30 * 1024 * 1024 / 8,
      'upload': 15 * 1024 * 1024 / 8,
      'latency': 2
    }
};

const findPreset = (world: CustomWorld) : NetworkConditions => {
    const tags = Object.keys(presets);
    const scenarioTags: readonly PickleTag[] = world.pickle.tags;

    let preset: NetworkConditions = null;

    for (let i = 0; i < scenarioTags.length; i++) {
        //stop after first match
        if (tags.includes(scenarioTags[i].name)) {
            world.logger.info(`Found network preset tag: ${scenarioTags[i].name}`);
            preset = presets[scenarioTags[i].name];
            break;
        }
    }
    return preset;
}

export const configureNetwork = async (world: CustomWorld) => {
    const preset: NetworkConditions = findPreset(world);

    if (preset !== null) {
      world.logger.info(`setting preset ${JSON.stringify(preset)}`);
      await world.page.emulateNetworkConditions(preset);
    } else {
      world.logger.info("no matching network presets found...");
    }
}