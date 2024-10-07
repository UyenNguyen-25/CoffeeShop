import img from "@/assets/image_hat_cafe.jpg";
import { format } from "date-fns";

export const popularPosts = [
  {
    title: "Bài viết nổi bật 1",
    avatar: img,
    description:
      "Mo ta 1111111111111 111111111111111111111 1111111111111111111111111111111111 11111111111111111111111111111111111111 11111111111111111111111 111111111111111111111111111 111111111111111111111",
    createBy: "Admin",
    createDate: format(new Date("1/2/2024"), "dd.MM.yyy"),
    content: "content",
    children: [
      {
        headerSection: "section 1",
        sectionContent: "content section 1",
        imageSection: "*",
      },
      {
        headerSection: "section 2",
        sectionContent: "content section 2",
        imageSection: "*",
      },
      {
        headerSection: "section 3",
        sectionContent: "content section 3",
        imageSection: "*",
      },
    ],
  },
  {
    title: "Bài viết nổi bật 2",
    avatar: img,
    description: "Mo ta 1",
    createBy: "Admin",
    createDate: format(new Date("1/2/2024"), "dd.MM.yyy"),
    content: "content",
    children: [
      {
        headerSection: "section 1",
        sectionContent: "content section 1",
        imageSection: "*",
      },
    ],
  },
  {
    title: "Bài viết nổi bật 3",
    avatar: img,
    description: "Mo ta 1",
    createBy: "Admin",
    createDate: format(new Date("1/2/2024"), "dd.MM.yyy"),
    content: "content",
    children: [
      {
        headerSection: "section 1",
        sectionContent: "content section 1",
        imageSection: "*",
      },
      {
        headerSection: "section 2",
        sectionContent: "content section 2",
        imageSection: "*",
      },
    ],
  },
];
