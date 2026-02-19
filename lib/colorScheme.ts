import { useTheme } from "next-themes";

const glitchTextColors = (theme: string | undefined) => {
  return theme === "dark" 
    ? [["#000000","#000000"],["#ffffff", "#f76855", "#ffffff", "#ffffff", "#ffffff", "#ffffff"]]
    : [["#ffffff","#ffffff"],["#000000", "#f76855", "#000000", "#000000", "#000000", "#000000"]];
};

const titleColor = (theme: string | undefined) => {
  return theme === "dark" 
    ? ["#f76855", "#ffffff"]
    : ["#f76855", "#000000"];
};

const iconColor = (theme: string | undefined) => {
  return theme === "dark" 
    ? "#ffffff" 
    : "#000000";
};

const textColors = (theme: string | undefined) => {
    return theme === "dark"
      ? {   heading: "#ffffff", 
            body: "#9CA3AF" }
        : { heading: "#000000",
            body: "#474a4e" };
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
