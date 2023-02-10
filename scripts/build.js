const esbuild = require('esbuild');
const { nodeExternalsPlugin } = require('esbuild-node-externals');

/** @type {import("esbuild").BuildOptions } */
const base = {
  target: 'esnext',
  platform: 'node',

  bundle: true,
  minify: true,
};

esbuild.build({
  entryPoints: ['src/index.ts'],
  outfile: 'dist/index.js',
  plugins: [nodeExternalsPlugin()],
  ...base,
});
esbuild.build({
  entryPoints: ['src/index.ts'],
  outfile: 'dist/index.esm.js',
  format: 'esm',
  plugins: [nodeExternalsPlugin()],
  ...base,
});
