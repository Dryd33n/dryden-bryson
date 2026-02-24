import { useTheme } from "next-themes";

const glitchTextColors = (theme: string | undefined) => {
  // Default to dark theme when undefined (during SSR/initial render)
  return theme === "light" 
    ? [["#ffffff","#ffffff"],["#000000", "#f76855", "#000000", "#000000", "#000000", "#000000"]]
    : [["#000000","#000000"],["#ffffff", "#f76855", "#ffffff", "#ffffff", "#ffffff", "#ffffff"]];
};

const titleColor = (theme: string | undefined) => {
  // Default to dark theme when undefined
  return theme === "light" 
    ? ["#f76855", "#000000"]
    : ["#f76855", "#ffffff"];
};

const iconColor = (theme: string | undefined) => {
  // Default to dark theme when undefined
  return theme === "light" 
    ? "#000000"
    : "#ffffff";
};

const textColors = (theme: string | undefined) => {
    // Default to dark theme when undefined
    return theme === "light"
        ? { heading: "#000000",
            body: "#474a4e" }
      : {   heading: "#ffffff", 
            body: "#9CA3AF" };
};

export const useColorScheme = () => {
  const { theme } = useTheme();
  
  return {
    glitchTextColors: glitchTextColors(theme),
    titleColor: titleColor(theme),
    iconColor: iconColor(theme),
    textColors: textColors(theme),
  };
};
