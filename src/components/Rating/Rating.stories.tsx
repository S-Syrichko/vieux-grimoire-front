import { Meta, StoryObj } from "@storybook/react";
import Rating, { RatingProps } from "./Rating";

const meta = {
  title: "Components/Rating",
  component: Rating,
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
  tags: ["autodocs"],
} satisfies Meta<typeof Rating>;

export default meta;

type Story = StoryObj<RatingProps>;

export const Zero: Story = {
  args: {
    size: "medium",
    rating: 0,
  },
};
export const Three: Story = {
  args: {
    size: "medium",
    rating: 3,
  },
};
export const Five: Story = {
  args: {
    size: "medium",
    rating: 5,
  },
};
export const Small: Story = {
  args: {
    size: "small",
    rating: 5,
  },
};
export const Medium: Story = {
  args: {
    size: "medium",
    rating: 5,
  },
};
export const Large: Story = {
  args: {
    size: "large",
    rating: 5,
  },
};
