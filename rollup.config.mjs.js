// rollup.config.mjs.js (for index.mjs)
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.tsx',
  output: {
    file: 'dist/index.mjs',
    format: 'esm',
    sourcemap: true,
  },
  external: ['react'],
  plugins: [typescript()],
};
