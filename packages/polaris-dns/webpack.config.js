import path from "path";
import { fileURLToPath } from "url";
import CopyWebpackPlugin from "copy-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('webpack').Configuration} */
export default {
  mode: "production",
  // Target ES5 for DNSControl's Otto JavaScript engine
  target: ["web", "es5"],
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "./out"),
    filename: "dnsconfig.js",
    clean: true,
    // Use IIFE format for compatibility
    iife: true,
    // Don't use ES6 features in output
    environment: {
      arrowFunction: false,
      bigIntLiteral: false,
      const: false,
      destructuring: false,
      dynamicImport: false,
      forOf: false,
      module: false,
      optionalChaining: false,
      templateLiteral: false,
    },
  },
  resolve: {
    extensions: [".ts", ".js"],
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    extensionAlias: {
      ".js": [".ts", ".js"],
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
            compilerOptions: {
              // Override to ES5 for Otto compatibility
              target: "ES5",
              module: "ES2015",
            },
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: "./src/creds.json", to: "./creds.json" }],
    }),
  ],
  optimization: {
    minimize: false,
  },
  stats: {
    errorDetails: true,
  },
};
