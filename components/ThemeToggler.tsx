import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { Button } from "./ui/button";

const ThemeToggler = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDarkMode = theme === "dark";
  return (
    <Button
      title="Switch theme"
      variant={"ghost"}
      className="flex items-center justify-center w-full p-0"
      onClick={() => setTheme(isDarkMode ? "light" : "dark")}
    >
      {isDarkMode ? <IconSun /> : <IconMoon />}
    </Button>
  );
};
export default ThemeToggler;
