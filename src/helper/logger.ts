import { transports, format, createLogger, Logger, LoggerOptions } from 'winston';

export const options = (scenarioName: string) : LoggerOptions => {

    const formatter = format.combine(
        format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
        format.align(),
        format.colorize({all: true}),
        format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`)
    ); 
    
    return {
        transports: [
            //new transports.Console({ format: formatter }),
            new transports.File({
                handleExceptions: true,
                filename: `./test-results/logs/${scenarioName}.log`,
                format: formatter
            })
        ]
    };
}

export const logger = (scenarioName: string) : Logger => {
    return createLogger(options(scenarioName));
}