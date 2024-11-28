import {BuildOptions} from "./types/config";
import path from "path";
import type {Configuration as DevServerConfiguration} from "webpack-dev-server";

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
    return {
        // static: {
        //     directory: path.resolve(__dirname, 'public'),
        // },
        historyApiFallback: true,
        port: options.port,
        open: true,
        hot: true,
        compress: true,
    }
}