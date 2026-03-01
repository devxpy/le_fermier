// Google search helper function via Serper.
// Expects input: { search_query }
// Requires env var: SERPER_API_KEY
async ({ search_query }) => {
  const headers = new Headers();
  headers.append("X-API-KEY", process.env.SERPER_API_KEY);
  headers.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    q: search_query
  });

  const requestOptions = {
    method: "POST",
    headers,
    body: raw,
    redirect: "follow"
  };

  const ret = await fetch("https://google.serper.dev/search", requestOptions);
  return { search_results: await ret.json() };
};
