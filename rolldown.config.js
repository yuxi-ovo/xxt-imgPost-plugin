import { defineConfig } from "rolldown";
import dotenv from "dotenv";
import strip from "@rollup/plugin-strip";
import typescript from "@rollup/plugin-typescript";

dotenv.config();

export default defineConfig({
    input: "src/index.ts",
    output: {
        file: "dist/index.js",
        format: "iife",
        banner: process.env.tampermonkeyIndex,
    },
    plugins: [typescript(), strip({ functions: ["console.log"] })],
});
