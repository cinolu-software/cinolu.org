export interface ArticleDto {
  id: string;
  title: string;
  slug: string;
  image: string;
  content: string;
  authorId: number;
  tag: string[];
}
