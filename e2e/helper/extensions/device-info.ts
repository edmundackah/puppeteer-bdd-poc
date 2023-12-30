import DeviceDetector from "node-device-detector";

import { writeFile, readFileSync } from 'fs-extra';

const filename = "test-results/user-agent.txt";

export interface DeviceInfo {
    os: Os
    client: Client
    device: Device
}

export interface Os {
    name: string
    short_name: string
    version: string
    platform: string
    family: string
}

export interface Client {
    type: string
    name: string
    short_name: string
    version: string
    engine: string
    engine_version: string
    family: string
}

export interface Device {
    id: string
    type: string
    brand: string
    model: string
}  

export const getUserAgent = (content: string) => {
    writeFile(filename, content, function (err) {
        if (err) {
            return console.log(err);
        }
    });
}

export const getDeviceInfo = () : DeviceInfo => {
    const userAgent: string = readFileSync(filename, {encoding: "utf-8"});

    const detector = new DeviceDetector({
        clientIndexes: true,
        deviceIndexes: true,
        deviceAliasCode: false,
    });

    return detector.detect(userAgent) as DeviceInfo;
}