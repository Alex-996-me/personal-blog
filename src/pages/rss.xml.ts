import rss from "@astrojs/rss";
import { siteConfig } from "../data/site";
import { getAllPosts, getPostHref } from "../lib/blog";
import { withBasePath } from "../lib/paths";

export async function GET(context) {
  const posts = await getAllPosts();
  const siteWithBase = new URL(withBasePath("/"), context.site).toString();

  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: siteWithBase,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: getPostHref(post),
      categories: [post.data.category, ...post.data.tags],
    })),
    customData: "<language>zh-cn</language>",
  });
}
