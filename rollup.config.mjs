// rollup.config.mjs (for index.js)
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.tsx',
  output: {
    file: 'dist/index.js',
    format: 'cjs',
    sourcemap: true,
  },
  external: ['react'],
  plugins: [typescript()],
};
