import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'schemas/index': 'src/schemas/index.ts',
    'validators/index': 'src/validators/index.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  sourcemap: true,
  splitting: true,
  treeshake: true,
  minify: false,
  outDir: 'dist',
  external: [],
  esbuildOptions(options) {
    options.banner = {
      js: '/* @vladzaharia/dnscontrol-types - DNSControl TypeScript types and validation */',
    };
  },
});

