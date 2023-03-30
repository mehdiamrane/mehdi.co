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

interface ApiStarredRepo {
  id: number;
  name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  owner: {
    login: string;
  };
}

interface StarredRepo {
  id: number;
  name: string;
  url: string;
  description: string;
  starsCount: number;
  author: string;
}
