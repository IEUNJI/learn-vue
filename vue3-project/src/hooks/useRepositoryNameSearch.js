import { ref, computed } from 'vue';

function useRepositoryNameSearch(repositories) {
  const searchQuery = ref('');

  const repositoriesMatchingSearchQuery = computed(() => {
    return repositories.value.filter((item) => item == searchQuery.value);
  });

  return {
    searchQuery,
    repositoriesMatchingSearchQuery,
  };
}

export default useRepositoryNameSearch;
