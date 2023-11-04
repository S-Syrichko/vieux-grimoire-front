import { create } from "@storybook/theming/create";
import { addons } from "@storybook/manager-api";

const theme = create({
  base: "light",
  brandTitle: "Mon Vieux Grimoire",
  brandUrl: "http://localhost:5173/",
  brandImage: "http://localhost:5173/Logo.svg",
});

addons.setConfig({
  theme,
});
