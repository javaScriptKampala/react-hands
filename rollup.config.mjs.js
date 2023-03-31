// rollup.config.mjs.js (for index.mjs)
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';

export default {
  input: 'src/index.tsx',
  output: {
    file: 'dist/index.mjs',
    format: 'esm',
    sourcemap: true,
  },
  external: ['react'],
  plugins: [
    typescript(),
    babel({
      babelHelpers: 'bundled',
      presets: ['@babel/preset-env'],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
  ],
};
