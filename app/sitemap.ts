import { getBlogPosts } from "@/app/blog/utils";
import { projectsWithDetail } from "@/lib/projects";

export const baseUrl = "https://unlux.dev";

export default async function sitemap() {
  const blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  const projectPages = projectsWithDetail().map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  const routes = ["", "/projects", "/blog", "/todo", "/currently-reading"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...projectPages, ...blogs];
}
