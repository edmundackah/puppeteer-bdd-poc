export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            ENV: "local" | "dev" | "uat" | "nft" | "ci"
            BASE_URL: string,
            LAUNCH_OPTIONS: string
            RECORD_ALL: "false" | "true"
        }
    }
}