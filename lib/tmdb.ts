export const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const TMDB_BEARER_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOGIxZDFkODJmN2ZkNDg0Yjk1MDBhYTMyM2Y5YjhmYSIsIm5iZiI6MTc3MDM4ODI5NS44MDA5OTk5LCJzdWIiOiI2OTg1ZmI0N2IyMDU0YTk5OTY5OWQ2ODIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.u1bRDejawxegfUXOHbTQArLhjYo9e1nlSvZuF0Ik_oM";

export const tmdbFetch = async <T>(endpoint: string): Promise<T> => {
  const res = await fetch(`${TMDB_BASE_URL}${endpoint}`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
    },
  });

  if (!res.ok) {
    throw new Error(`TMDB error ${res.status}`);
  }

  return res.json() as Promise<T>;
};
