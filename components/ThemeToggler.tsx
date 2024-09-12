import React from "react";
import { useTheme } from "next-themes";
import { Switch } from "./ui/switch";
import { IconMoon } from "@tabler/icons-react";

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();

  const isDarkMode = theme === "dark";
  return (
    <div className="flex gap-2 items-center">
      <IconMoon size={20} />
      <p>Dark Mode</p>
      <Switch
        checked={isDarkMode}
        onCheckedChange={() =>
          isDarkMode ? setTheme("light") : setTheme("dark")
        }
      />
    </div>
  );
};

export default ThemeToggler;
