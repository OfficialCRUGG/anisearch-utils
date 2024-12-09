export function log(module: string, message: string): void {
  const projectName = "aS-utils";
  const defaultColor = "#F66A2E";

  const moduleColors: { [key: string]: string } = {
    loader: "#3E8EF7",
    registry: "#8E44AD",
    styles: "#F7CA18",
  };

  // Get the background color for the module or use the default
  const moduleColor = moduleColors[module] || "#dcdcdc"; // Default light gray for module background

  // The CSS styling for the log message
  const style = `
    background-color: ${defaultColor};
    color: white;
    border-radius: 4px;
    padding: 3px 5px;
    font-weight: bold;
    display: inline-block;
    margin-right: 5px;
  `;

  const moduleStyle = `
    background-color: ${moduleColor};
    color: ${calculateFgColor(moduleColor)};
    border-radius: 4px;
    padding: 3px 5px;
    font-weight: bold;
    display: inline-block;
    margin-right: 5px;
  `;

  // Log to the browser console with the styles
  console.log(
    `%c${projectName}%c${module}%c${message}`,
    style, // Style for project name and module
    moduleStyle, // Style for module
    "", // Default style for the message
  );
}

function calculateFgColor(hex: string): string {
  if (hex.startsWith("#")) hex = hex.slice(1);

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const a = [r, g, b].map(function (v) {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });

  const luminance = 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];

  return luminance > 0.5 ? "#000000" : "#ffffff";
}
