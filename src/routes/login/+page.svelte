<script lang="ts">
  import { onMount } from "svelte";
  import { code, getToken, login } from "../helpers/auth";
  import type { SpotifyUser } from "../user/types";
  import { getUserProfile } from "../helpers/spotify";
  import { goToPath } from "../helpers/nav";
  let currentUser: SpotifyUser | null = null;

  async function getCurrentUserProfile() {
    try {
      await getToken(); // Assuming getToken() returns the token
      const token = window.localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      // Assuming it fetches user profile
      const currentUser = await getUserProfile();

      window.localStorage.setItem("user", JSON.stringify(currentUser));

      if (currentUser) {
        goToPath("/user"); // Assuming goToPath navigates to a new route
      }
    } catch (error) {
      console.error("Error fetching user profile", error);
    }
  }
  onMount(() => {
    code.set(window.location.search.replace("?code=", "") || "");
    getCurrentUserProfile();
  });
</script>

π
