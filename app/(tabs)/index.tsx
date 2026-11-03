import { useCallback, useRef } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { useDiary } from "../../src/context/DiaryContext";
import { useDiarySearch } from "../../src/hooks/useDiarySearch";
import DiaryCard from "../../src/components/DiaryCard";
import { COLORS, SPACE, TYPO } from "../../src/styles/tokens";

const MOOD_OPTIONS = ["ALL", "😊", "🎯", "☕", "🔥"];

export default function HomeScreen() {
  const router = useRouter();
  const { entries, likedIds, toggleLike } = useDiary();
  const {
    query,
    setQuery,
    selectedMood,
    setSelectedMood,
    filteredEntries,
    resultCount,
    resetFilter,
  } = useDiarySearch(entries);

  const searchRef = useRef<React.ElementRef<typeof TextInput>>(null);

  const openDetail = useCallback(
    (id: number) => {
      router.push({
        pathname: "/detail/[id]",
        params: {
          id: String(id),
        },
      });
    },
    [router],
  );

  const handleClear = useCallback(() => {
    resetFilter();
    searchRef.current?.focus();
  }, [resetFilter]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Buku Harian</Text>

      {/* Search & Reset Row */}
      <View style={styles.searchRow}>
        <TextInput
          ref={searchRef}
          value={query}
          onChangeText={setQuery}
          placeholder="Cari diary..."
          style={styles.search}
        />
        <Pressable onPress={handleClear} style={styles.clearButton}>
          <Text style={styles.clearText}>Reset</Text>
        </Pressable>
      </View>

      {/* Mood Filter Row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterRow}
      >
        {MOOD_OPTIONS.map((mood) => {
          const active = selectedMood === mood;
          return (
            <Pressable
              key={mood}
              onPress={() => setSelectedMood(mood)}
              style={[styles.filterChip, active && styles.filterChipActive]}
            >
              <Text
                style={[styles.filterText, active && styles.filterTextActive]}
              >
                {mood === "ALL" ? "Semua" : mood}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <Text style={styles.counter}>{resultCount} entri ditemukan</Text>

      {/* List Entries */}
      <FlatList
        data={filteredEntries}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <DiaryCard
            title={item.title}
            date={item.date}
            preview={item.preview}
            mood={item.mood}
            liked={likedIds.has(item.id)}
            onPress={() => openDetail(item.id)}
            onToggleLike={() => toggleLike(item.id)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Diary tidak ditemukan.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACE.l,
    backgroundColor: COLORS.background,
  },
  header: {
    fontSize: TYPO.h1,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: SPACE.m,
  },
  searchRow: {
    flexDirection: "row",
    gap: SPACE.s,
    marginBottom: SPACE.s,
  },
  search: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 10,
    backgroundColor: "#fff",
  },
  clearButton: {
    justifyContent: "center",
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  clearText: {
    fontWeight: "600",
    color: COLORS.text,
  },
  filterRow: {
    gap: SPACE.s,
    paddingVertical: SPACE.xs,
    marginBottom: SPACE.s,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: "#fff",
    height: 38,
    justifyContent: "center",
    alignItems: "center",
  },
  filterChipActive: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  filterText: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: "500",
  },
  filterTextActive: {
    color: "#fff",
    fontWeight: "700",
  },
  counter: {
    color: COLORS.muted,
    marginBottom: SPACE.s,
  },
  list: {
    gap: SPACE.m,
    paddingBottom: SPACE.xl,
  },
  empty: {
    textAlign: "center",
    color: COLORS.muted,
    paddingTop: 40,
  },
});
