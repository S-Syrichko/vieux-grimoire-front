import type { Meta, StoryObj} from "@storybook/react";
import { withRouter } from "storybook-addon-react-router-v6";
import AuthForm from "./AuthForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

const queryClient = new QueryClient();

const meta = {
  title: "Components/AuthForm",
  component: AuthForm,
  decorators: [withRouter, (Story) => {
   return React.createElement(QueryClientProvider, {client: queryClient}, Story()) 
  }],
  tags: ["autodocs"],
} satisfies Meta<typeof AuthForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};