import useSWR from "swr";

export default function useList() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR("/api/list", fetcher);
  return {
    list: data,
    isLoading: !error && !data,
    isError: error,
  };
}
