import { transports, format, createLogger, Logger, LoggerOptions } from 'winston';

export const options = (scenarioName: string, sessionId: string) : LoggerOptions => {

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
                filename: `${sessionId}.log`,
                dirname: `./test-results/logs/${scenarioName}/`,
                format: formatter
            })
        ]
    };
}

export const logger = (scenarioName: string, sessionId: string) : Logger => {
    return createLogger(options(scenarioName, sessionId));
}