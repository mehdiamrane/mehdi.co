export const getStarredRepos = async (pageNumberToFetch?: number) => {
  const githubUsername = 'mehdiamrane';
  const perPageNumber = 100;
  const pageNumber = pageNumberToFetch || 1;

  let starredRepos: StarredRepo[] = [];

  await fetch(
    `https://api.github.com/users/${githubUsername}/starred?per_page=${perPageNumber}&page=${pageNumber}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    },
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then((data) => {
      const repos = data.map((repo: ApiStarredRepo) => ({
        id: repo.id,
        name: repo.name,
        url: repo.html_url,
        description: repo.description,
        starsCount: repo.stargazers_count,
        author: repo.owner.login,
      }));
      starredRepos = repos;
    })
    .catch((error) => console.error(error));

  const hasMore = starredRepos.length === perPageNumber;

  return { repos: starredRepos, hasMore };
};
