import webpack from "webpack";
import {BuildOptions} from "./types/config";
import path from "path";
import {buildLoaders} from "./buildLoaders";
import {buildResolvers} from "./buildResolvers";
import {buildPlugins} from "./buildPlugins";
import {buildDevServer} from "./buildDevServer";

export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {
    const {paths, mode, isDev} = options;

    return {
        mode,
        entry: paths.entry,
        module: {
            rules: buildLoaders(options)
        },
        resolve: buildResolvers(options),
        devtool: isDev ? 'inline-source-map' : undefined,
        output: {
            filename: '[name].[contenthash].js',
            path: paths.build,
            publicPath: '/',
            clean: true,
        },
        plugins: buildPlugins(options),
        devServer: isDev ?  buildDevServer(options) : undefined,
    }
}