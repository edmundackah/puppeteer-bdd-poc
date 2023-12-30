import { TestStepResult, Pickle, PickleTag } from '@cucumber/messages';
import { TestStepResultStatus as Status } from '@cucumber/messages';
import { mkdirSync } from "fs-extra";
import { Logger } from 'winston';

import { CustomWorld } from '../../test/features/world';

export async function screenshot(result: TestStepResult, world: CustomWorld) {
    //screenshot on test failure or when tag is present
    if (includesScreenshotTag(world.pickle.tags, world.logger) === true || result?.status === Status.FAILED) {
        const basePath = `test-results/screenshots/${world.pickle.name}/${world.pickle.id || ""}/`;
        mkdirSync(basePath, { recursive: true });
        const img: Buffer = await world.page.screenshot({
            fullPage: true,
            path: `${basePath}${Date.now()}.png`
        }) as Buffer;
        world.attach(img, {mediaType: 'image/png'});
    }
}

const includesScreenshotTag = (tags: readonly PickleTag[], logger: Logger) : Boolean => {
    if (tags.find(t => t.name === '@Screenshot')) {
        logger.info(`screenshot tag detected`);
        return true;
    } else return false;
}