import { transports, format, createLogger, Logger, LoggerOptions } from 'winston';
import { CustomWorld } from '../../test/features/world';

export const options = (world: CustomWorld) : LoggerOptions => {

    const formatter = format.combine(
        format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
        format.align(),
        format.printf(info => `${info.level} [${info.timestamp}] ${info.message}`)
    ); 
    
    return {
        transports: [
            //new transports.Console({ format: formatter }),
            new transports.File({
                handleExceptions: true,
                handleRejections: true,
                filename: `${world.sessionId}.log`,
                dirname: `./test-results/logs/${world.scenarioName}/`,
                format: formatter
            })
        ]
    };
}

export const logger = (world: CustomWorld) : Logger => {
    return createLogger(options(world));
}