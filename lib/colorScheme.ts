import { useTheme } from "next-themes";

/*
  Colours for canvas-drawn components (LetterGlitch, FuzzyText, TerminalRain), which can't read CSS
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
    rain: { trail: "#00ff41", head: "#d8ffe3", name: "#00ff41", glow: 10 },
  },
  light: {
    glitch: {
      background: "#ffffff",
      vignette: "#ffffff",
      letters: ["#000000", "#e5533f", "#000000", "#000000", "#000000", "#000000"],
    },
    title: { name: "#e5533f", tagline: "#000000" },
    rain: { trail: "#008236", head: "#00401b", name: "#008236", glow: 0 },
  },
};

// Before mount resolvedTheme is undefined; fall back to dark, the site default.
export const useColorScheme = () => {
  const { resolvedTheme } = useTheme();
  return resolvedTheme === "light" ? palettes.light : palettes.dark;
};
