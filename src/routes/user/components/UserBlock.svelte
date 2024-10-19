<script lang="ts">
  export let currentUser;
</script>

<div class="w-full h-1/3 flex p-3 mt-20">
  <div class="flex w-1/3 justify-center items-right">
    <a href={currentUser.external_urls.spotify} target="_blank">
      <img
        src={currentUser.images[0].url}
        alt={currentUser.display_name}
        class="justify-end object-contain rounded-full transition-transform duration-300 hover:scale-105"
      />
    </a>
  </div>
  <div class="flex flex-col text-left gap-4">
    <h2 class="text-3xl mt-2">
      {currentUser.display_name}
    </h2>
    <p>{currentUser.country}</p>

    <p>Followers : {currentUser.followers.total}</p>
  </div>
</div>
