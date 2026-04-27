export interface MediumPost {
  title: string;
  link: string;
  pubDate: string;
  thumbnail: string;
  description: string;
  categories: string[];
  author: string;
  readTime: string;
}

// Replace 'sumaantamunde' with your actual Medium username
const MEDIUM_USERNAME = "sumaantamunde";
const RSS_URL = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${MEDIUM_USERNAME}`;

function estimateReadTime(html: string): string {
  const text = html.replace(/<[^>]*>/g, "");
  const words = text.split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}

function extractThumbnail(content: string): string {
  const match = content.match(/<img[^>]+src="([^">]+)"/);
  return match ? match[1] : "/default-blog-thumb.png";
}

function stripHtml(html: string, maxLen = 160): string {
  const text = html.replace(/<[^>]*>/g, "").trim();
  return text.length > maxLen ? text.slice(0, maxLen) + "…" : text;
}

export async function getMediumPosts(): Promise<MediumPost[]> {
  try {
    const res = await fetch(RSS_URL, { next: { revalidate: 3600 } }); // cache 1 hour
    if (!res.ok) return [];
    const data = await res.json();
    if (data.status !== "ok") return [];

    return data.items.map((item: any) => ({
      title: item.title,
      link: item.link,
      pubDate: new Date(item.pubDate).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      thumbnail: item.thumbnail || extractThumbnail(item.content),
      description: item.description
        ? stripHtml(item.description)
        : stripHtml(item.content),
      categories: item.categories || [],
      author: item.author || "Sumaanta Munde",
      readTime: estimateReadTime(item.content),
    }));
  } catch {
    return [];
  }
}
