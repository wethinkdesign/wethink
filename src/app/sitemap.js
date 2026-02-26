export const dynamic = "force-static";

export default function sitemap() {
  return [
    {
      url: "https://wethinkdesign.github.io",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}