import React from "react";
import { useTheme } from "next-themes";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { Button } from "./ui/button";

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();

  const isDarkMode = theme === "dark";
  return (
    <Button
      variant={"ghost"}
      className="flex items-center justify-center w-full p-0"
      onClick={() => setTheme(isDarkMode ? "light" : "dark")}
    >
      {isDarkMode ? <IconSun /> : <IconMoon />}
    </Button>
  );
};

export default ThemeToggler;
