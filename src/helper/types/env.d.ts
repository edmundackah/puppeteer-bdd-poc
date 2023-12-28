export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            ENV: "local" | "dev" | "uat" | "nft" | "ci"
            BASE_URL: string,
            HEADLESS: string
            SKIP_VIDEO: string
        }
    }
}