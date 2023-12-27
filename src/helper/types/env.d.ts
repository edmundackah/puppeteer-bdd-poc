export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            ENV: "local" | "dev" | "uat" | "nft"
            BASE_URL: string,
            HEADLESS: string
        }
    }
}