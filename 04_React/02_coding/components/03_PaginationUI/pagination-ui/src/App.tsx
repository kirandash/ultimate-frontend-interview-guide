import { useEffect, useState } from "react";

const JSON_PLACEHOLDER_API_BASE_URL = "https://jsonplaceholder.typicode.com";
const LIMIT_PER_PAGE = 10;

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

function App() {
  const [posts, setPosts] = useState<[] | Post[]>([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const url = new URL(JSON_PLACEHOLDER_API_BASE_URL + "/posts");
      url.searchParams.set("_page", String(page));
      url.searchParams.set("_limit", String(LIMIT_PER_PAGE));
      const response = await fetch(url);
      const posts = await response.json();
      setPosts(posts);

      // This next page check should be implemented on BE side. We are making an extra call on FE as a hack
      const nextPage = page + 1;
      const nextPageUrl = new URL(JSON_PLACEHOLDER_API_BASE_URL + "/posts");
      nextPageUrl.searchParams.set("_page", String(nextPage));
      nextPageUrl.searchParams.set("_limit", String(LIMIT_PER_PAGE));
      const nextPageResponse = await fetch(nextPageUrl);
      const nextPagePosts = await nextPageResponse.json();

      setHasNextPage(nextPagePosts.length > 0 ? true : false);
    };

    fetchPosts();
  }, [page]);

  return (
    <>
      <table>
        {/* Caption or title of the table */}
        <caption>Aditya's Blog</caption>
        <thead>
          {/* Scope defines whether the heading is for col or row */}
          <th scope="col">ID</th>
          <th scope="col">Title</th>
          <th scope="col">Body</th>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <th scope="row">{post.id}</th>
              <td>{post.title}</td>
              <td>{post.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Buttons */}
      <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
        Prev
      </button>
      Current Page: {page}
      <button disabled={!hasNextPage} onClick={() => setPage(page + 1)}>
        Next
      </button>
    </>
  );
}

export default App;
