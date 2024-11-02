import path from 'path';

const SRC_PATH = path.resolve(__dirname, 'src');

const parseTsConfigPaths = (paths: Record<string, string[]>): Record<string, string> => {
    const webpackConfigAliases: Record<string, string> = {};

    Object.entries(paths).forEach(([alias, paths]) => {
        const aliasPath = paths[0].replace(/[^a-zA-Z]/g, '');

        webpackConfigAliases[alias] = path.join(SRC_PATH, aliasPath);
    });

    return webpackConfigAliases;
};

export default parseTsConfigPaths;