import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";

export default {
    input: "./src/index.ts",
    output: [
        {
            file: "./build/swinn_iife.js",
            format: "iife",
            name: "swinn",
        },
        {
            file: "./build/swinn_esm.js",
            format: "esm",
        },
        {
            file: "./build/swinn_cjs.js",
            format: "cjs",
        },
        {
            file: "./build/swinn_umd.js",
            format: "umd",
            name: "swinn",
        },
    ],
    plugins: [
        typescript({
            tsconfigOverride: {
                compilerOptions: {
                    module: "ES2015",
                    declaration: false,
                }
            }
        }),
        terser(),
    ],
};