<script lang="ts">
  import { onMount } from "svelte";
  import { login } from "../helpers/auth";

  let token: string | null = null;

  function loginUser() {
    login();
  }
  onMount(() => {
    loginUser();
  });
</script>
