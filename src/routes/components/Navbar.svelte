<script>
  import { goToPath } from "../helpers/nav";
</script>

<nav class="bg-white border-gray-200 dark:bg-black dark:text-white">
  <div
    class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
  >
    <a
      href="http://localhost:5173/"
      class="flex items-center space-x-3 rtl:space-x-reverse"
    >
      <img
        src="https://static.vecteezy.com/system/resources/previews/018/930/750/original/spotify-app-logo-spotify-icon-transparent-free-png.png"
        class="h-20"
        alt="Flowbite Logo"
      />
    </a>
    <button
      data-collapse-toggle="navbar-default"
      type="button"
      class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      aria-controls="navbar-default"
      aria-expanded="false"
    >
      <span class="sr-only">Open main menu</span>
      <svg
        class="w-5 h-5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 17 14"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M1 1h15M1 7h15M1 13h15"
        />
      </svg>
    </button>
    <div class="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul
        class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
      >
        <li>
          <a
            href="/"
            on:click|preventDefault={() => {
              // This will handle the routing manually if needed
              // Example if using a custom router:
              // yourRouter.go('/'); // replace with your router method
              window.history.pushState({}, "", "/"); // Update the URL without reloading
              // You may need to trigger a function to manually update the view
              // loadHomeView(); // Define this function based on your logic
            }}
            class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
            >Home</a
          >
        </li>
        <li>
          <a
            href="/user"
            class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            >User</a
          >
        </li>
        <li>
          <a
            href="/about"
            class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            >A propos</a
          >
        </li>
      </ul>
    </div>
  </div>
</nav>

<style>
  .navbar-container {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #1a202c;
    font-size: 1.25rem;
    line-height: 1.25;
  }
</style>
