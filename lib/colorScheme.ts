import { useTheme } from "next-themes";

/*
  Colours for canvas-drawn components (LetterGlitch, FuzzyText), which can't read CSS
  variables. Everything else should use the tokens in app/globals.css; keep these in sync.
  Objects are module constants so their references stay stable between renders —
  the canvas components restart their animation whenever a colour prop changes identity.
*/
const palettes = {
  dark: {
    glitch: {
      background: "#000000",
      vignette: "#000000",
      letters: ["#ffffff", "#f76855", "#ffffff", "#ffffff", "#ffffff", "#ffffff"],
    },
    title: { name: "#f76855", tagline: "#ffffff" },
  },
  light: {
    glitch: {
      background: "#ffffff",
      vignette: "#ffffff",
      letters: ["#000000", "#e5533f", "#000000", "#000000", "#000000", "#000000"],
    },
    title: { name: "#e5533f", tagline: "#000000" },
  },
};

// Before mount resolvedTheme is undefined; fall back to dark, the site default.
export const useColorScheme = () => {
  const { resolvedTheme } = useTheme();
  return resolvedTheme === "light" ? palettes.light : palettes.dark;
};
