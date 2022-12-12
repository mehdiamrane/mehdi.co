type Note = {
  content: string;
  filePath: string;
  slug: string;
  data: NoteFrontMatter;
};

type NoteFrontMatter = {
  isPublished: boolean;
  locale: string;
  publishedAt: string;
  image?: string;
  summary: string;
  tags: string[];
  title: string;
};

type NoteSource = {
  compiledSource: string;
  frontMatter: object;
  scope: NoteFrontMatter;
};

type Ref = React.MutableRefObject<HTMLElement | null>;
