import { useCallback, useEffect } from "react";

interface IThemeProps {}

export const Theme = ({}: IThemeProps): JSX.Element => {
  enum Theme {
    "light" = "light",
    "dark" = "dark",
  }

  const toggleTheme = useCallback(
    (setDark: boolean) => {
      const setThemeDark = () => {
        localStorage.theme = Theme.dark;
        document.documentElement.classList.add(Theme.dark);
      };
      const setThemeLight = () => {
        localStorage.theme = Theme.light;
        document.documentElement.classList.remove(Theme.dark);
      };

      if (setDark) setThemeDark();
      else setThemeLight();
    },
    [Theme]
  );

  useEffect(() => {
    const mql = window.matchMedia("(prefers-color-scheme: dark)");

    const check = (e: MediaQueryListEvent) => toggleTheme(e.matches);
    mql.addEventListener("change", check);

    return () => mql.removeEventListener("change", check);
  }, [toggleTheme]);

  return (
    <button onClick={() => toggleTheme(localStorage.theme === Theme.light)}>
      Toggle Theme
    </button>
  );
};
