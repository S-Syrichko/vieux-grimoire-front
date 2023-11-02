import { Meta, StoryObj } from "@storybook/react";
import Rating, { RatingProps } from "./Rating";

const meta = {
    title: 'Components/Rating',
    component: Rating,
    parameters: {
      // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
      layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
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
        size: 'small',
        rating: 5,
    },
};
export const Medium: Story = {
    args: {
        size: 'medium',
        rating: 5,
    },
};
export const Large: Story = {
    args: {
        size: 'large',
        rating: 5,
    },
};