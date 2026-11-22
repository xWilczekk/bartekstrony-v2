declare module "*.mdx" {
  export const metadata: {
    title: string;
    seoTitle?: string;
    description: string;
    date: string;
    updated?: string;
    readingTime: string;
    tags: string[];
  };
}
