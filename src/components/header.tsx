import { ThemeSwitcher } from "./theme/theme-switcher";

const Header = () => {
  return (
    <nav
      className="
        supports-backdrop-blur:bg-background/60
        fixed left-0 right-0 top-0 z-20
        border-b bg-background/95 backdrop-blur
        w-full flex py-2.5 px-5 justify-between
      "
    >
      <div className="flex items-center justify-center">Software Sauna - ASCII Path Solver</div>
      <div className="flex align-items gap-x-2">
        <ThemeSwitcher />
      </div>
    </nav>
  );
};

export { Header };
