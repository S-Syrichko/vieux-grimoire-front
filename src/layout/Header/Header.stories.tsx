import type { Meta, StoryObj } from "@storybook/react";
import { reactRouterOutlets, reactRouterParameters, withRouter } from "storybook-addon-react-router-v6";
import Header from "./Header";

const meta = {
  title: "Layout/Header",
  component: Header,
  decorators: [withRouter],
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    reactRouter: reactRouterParameters({
      location: {
        pathParams: {},
      },
      routing: reactRouterOutlets([
        {
          path: '/',
          element: <p>Home</p>,
        },
        {
          path: "/books/add",
          element: <p>OAdd Book</p>,
        },
        {
          path: "/auth",
          element: <p>Auth</p>,
        },
      ]),
    }),
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
