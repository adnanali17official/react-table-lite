import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import external from 'rollup-plugin-peer-deps-external';
import commonjs from '@rollup/plugin-commonjs';
import styles from "rollup-plugin-styles";
import pkg from './package.json';

export default {
    input: pkg.source,
    output: [
        { file: pkg.main, format: 'cjs', plugins: [terser()] },
        { file: pkg.module, format: 'esm', plugins: [terser()] } // for testing build
    ],
    plugins: [
        styles(),
        external(),
        babel({
            exclude: 'node_modules/**',
            babelHelpers: 'runtime',
            plugins: ["@babel/plugin-transform-runtime"], 
        }),
        commonjs({ include: ["./index.js", "node_modules/**"] })   
    ],
    external: Object.keys(pkg.peerDependencies || {}),
};
