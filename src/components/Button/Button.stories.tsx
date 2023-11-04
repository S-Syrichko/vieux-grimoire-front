import { Meta, StoryObj } from "@storybook/react";
import Button, { ButtonProps } from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  decorators: [
    (Story) => (
      <div style={{ padding: "1rem" }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    type: {
      description: "Button type",
      table: {
        defaultValue: { summary: "button" },
      },
      options: ["button", "submit", "reset"],
      control: {
        type: "select",
      },
    },
    primary: {
      description: "Primary button",
      control: {
        type: "boolean",
      },
    },
    children: {
      description: "Button label",
      control: {
        type: "text",
      },
    },
    disabled: {
      description: "Disabled button",
      control: {
        type: "boolean",
      },
    },
    onClick: {
      description: "Button click handler",
      action: "clicked",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<ButtonProps>;

export const Primary: Story = {
  args: {
    type: "button",
    primary: true,
    children: "Primary",
  },
};
export const Secondary: Story = {
  args: {
    type: "button",
    primary: false,
    children: "Secondary",
  },
};
