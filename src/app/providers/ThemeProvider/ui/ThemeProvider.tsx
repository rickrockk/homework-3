import React, {useLayoutEffect} from 'react';
import { FC, useMemo, useState } from 'react';
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from '../lib/ThemeContext';

const getInitialTheme = (): Theme => {
    const savedTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);
    if (savedTheme) {
        return savedTheme as Theme;
    }

    const isDarkTheme = window?.matchMedia('(prefers-color-scheme: dark)').matches;
    return isDarkTheme ? Theme.DARK : Theme.LIGHT;
};


export const ThemeProvider: FC<React.PropsWithChildren> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(getInitialTheme);

    useLayoutEffect(() => {
        document.documentElement.setAttribute(LOCAL_STORAGE_THEME_KEY, theme);
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
    }, [theme]);

    const defaultProps = useMemo(
        () => ({
            theme,
            setTheme,
        }),
        [theme],
    );

    return <ThemeContext.Provider value={defaultProps}>{children}</ThemeContext.Provider>;
};
