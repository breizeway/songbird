import { useEffect, useState } from "react";

export enum Theme {
  "light" = "light",
  "dark" = "dark",
}
export const useTheme = () => {
  const [theme, _setTheme] = useState<Theme>(Theme.light);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-color-scheme: dark)");

    const setTheme = (isDark: boolean) =>
      _setTheme(isDark ? Theme.dark : Theme.light);
    setTheme(mql.matches);

    const setThemeFromEvent = (e: MediaQueryListEvent) => {
      setTheme(e.matches);
    };
    mql.addEventListener("change", setThemeFromEvent);
    return () => mql.removeEventListener("change", setThemeFromEvent);
  }, []);

  return {
    theme,
    isLight: theme === Theme.light,
    isDark: theme === Theme.dark,
  };
};
