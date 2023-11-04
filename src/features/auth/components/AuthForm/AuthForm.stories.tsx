import type { Meta, StoryObj } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { withRouter } from "storybook-addon-react-router-v6";
import AuthForm from "./AuthForm";
const queryClient = new QueryClient();

const meta = {
  title: "Components/AuthForm",
  component: AuthForm,
  decorators: [
    withRouter,
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof AuthForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
