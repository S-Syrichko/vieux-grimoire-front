import { Meta, StoryObj } from "@storybook/react";
import { reactRouterParameters, withRouter } from "storybook-addon-react-router-v6";
import { Book } from "../../../../lib/utils/dataTypes.ts";
import BookCard from "./BookCard.tsx";

const meta = {
  title: "Components/BookCard",
  component: BookCard,
  decorators: [withRouter],
  parameters: {
    layout: "centered",
    reactRouter: reactRouterParameters({
      location: {
        pathParams: { bookId: '1' },
      },
      routing: { path: '/books/:bookId' },
    }),
  },
  argTypes: {
    book: {
      table: {
        defaultValue: { summary: "book" },
      },
      options: ["book"],
      control: {
        type: "object",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof BookCard>;

export default meta;

type Story = StoryObj<{ book: Book }>;

export const Default: Story = {
  args: {
    book: {
      userId: "1",
      title: "The Lord of the Rings",
      author: "J.R.R. Tolkien",
      year: 1954,
      genre: "Fantasy",
      ratings: [{ userId: "1", grade: 5 }],
      averageRating: 5,
      _id: "1",
      imageUrl:
        "https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/91Yr0n5lNWL._AC_UF1000,1000_QL80_.jpg",
    },
  },
};
