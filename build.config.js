import babel from '@rollup/plugin-babel';
import external from 'rollup-plugin-peer-deps-external';
import {terser} from 'rollup-plugin-terser';
import styles from "rollup-plugin-styles";
import pkg from './package.json';

export default {
    input: pkg.source,
    output: [
        { file: pkg.main, format: 'cjs', plugins: [terser()] },
        { file: pkg.module, format: 'esm', plugins: [terser()] }
    ],
    plugins: [
        styles(),
        external(),
        babel({
            exclude: 'node_modules/**',
            babelHelpers: 'runtime',
            plugins: ["@babel/plugin-transform-runtime"], 
        })        
    ],
    external: Object.keys(pkg.peerDependencies || {}),
};
