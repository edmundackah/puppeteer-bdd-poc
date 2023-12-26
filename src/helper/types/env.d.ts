export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            ENV: "local" | "dev" | "uat" | "nft"
            BASE_URL: string,
            IS_HEADLESS: "new" | "false"
        }
    }
}