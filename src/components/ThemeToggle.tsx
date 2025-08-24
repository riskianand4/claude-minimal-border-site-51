import { Moon, Sun, Monitor, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/ThemeProvider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-border-subtle hover:bg-hover-bg"
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 one-dark:-rotate-90 one-dark:scale-0 grayshadow:-rotate-90 grayshadow:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 one-dark:rotate-0 one-dark:scale-0 grayshadow:rotate-90 grayshadow:scale-0" />
          <Monitor className="absolute h-4 w-4 rotate-90 scale-0 transition-all one-dark:rotate-0 one-dark:scale-100 dark:rotate-90 dark:scale-0 grayshadow:rotate-90 grayshadow:scale-0" />
          <Palette className="absolute h-4 w-4 rotate-90 scale-0 transition-all grayshadow:rotate-0 grayshadow:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-popover border-border">
        <DropdownMenuItem 
          onClick={() => setTheme("light")}
          className={`hover:bg-hover-bg ${theme === "light" ? "bg-accent" : ""}`}
        >
          <Sun className="mr-2 h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("dark")}
          className={`hover:bg-hover-bg ${theme === "dark" ? "bg-accent" : ""}`}
        >
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("one-dark")}
          className={`hover:bg-hover-bg ${theme === "one-dark" ? "bg-accent" : ""}`}
        >
          <Monitor className="mr-2 h-4 w-4" />
          <span>One Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("grayshadow")}
          className={`hover:bg-hover-bg ${theme === "grayshadow" ? "bg-accent" : ""}`}
        >
          <Palette className="mr-2 h-4 w-4" />
          <span>Gray Shadow</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}