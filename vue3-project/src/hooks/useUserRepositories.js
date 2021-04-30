import { onMounted, ref, watch } from 'vue';
import { fetchUserRepositories } from '../apis/repositories.js';

function useUserRepositories(user) {
  const repositories = ref([0]);

  const getUserRepositories = async () => {
    repositories.value = await fetchUserRepositories(user.value);
  };

  onMounted(getUserRepositories);

  watch(user, getUserRepositories);

  return {
    repositories,
    getUserRepositories,
  };
}

export default useUserRepositories;
