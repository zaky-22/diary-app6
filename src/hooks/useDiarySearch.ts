import { useEffect, useMemo, useState } from "react";
import { DiaryEntry } from "../context/DiaryContext";

export function useDiarySearch(entries: DiaryEntry[]) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedMood, setSelectedMood] = useState<string>("ALL");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 350);
    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  const filteredEntries = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();

    return entries.filter((entry) => {
      // Filter berdasarkan Mood
      const matchesMood = selectedMood === "ALL" || entry.mood === selectedMood;

      // Filter berdasarkan Query Teks
      const matchesQuery =
        !q ||
        entry.title.toLowerCase().includes(q) ||
        entry.preview.toLowerCase().includes(q) ||
        entry.date.toLowerCase().includes(q);

      return matchesMood && matchesQuery;
    });
  }, [entries, debouncedQuery, selectedMood]);

  const resetFilter = () => {
    setQuery("");
    setSelectedMood("ALL");
  };

  return {
    query,
    setQuery,
    selectedMood,
    setSelectedMood,
    filteredEntries,
    resultCount: filteredEntries.length,
    resetFilter,
  };
}
