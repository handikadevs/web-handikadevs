export const ThemeInit = ({
  config,
  fallbackTheme = "dark",
}: {
  config: Record<string, string>
  fallbackTheme?: "light" | "dark"
}) => {
  const js = `
  (function () {
    try {
      var root = document.documentElement;
      var cfg = ${JSON.stringify(config)};

      // Resolve theme (respect "system")
      var resolveTheme = function (v) {
        if (!v || v === "system") {
          return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        }
        return v;
      };

      // Apply saved theme
      var savedTheme = localStorage.getItem("data-theme");
      root.setAttribute("data-theme", resolveTheme(savedTheme));

      // Apply saved style overrides
      Object.keys(cfg).forEach(function (k) {
        var v = localStorage.getItem("data-" + k);
        if (v) root.setAttribute("data-" + k, v);
      });
    } catch (e) {
      document.documentElement.setAttribute("data-theme", "${fallbackTheme}");
    }
  })();
  `
  return <script id="theme-init" dangerouslySetInnerHTML={{ __html: js }} />
}
