<script lang="ts">
    // Import Component

    // Fallback
    import App from "./App.svelte";
    import NavBar from "./components/NavBar.svelte";

    const urlParams = new URLSearchParams(window.location.search);
    let page = urlParams.get("page");

    // map string to Component
    const pages = {};

    // Select Page with default App
    $: pageComponent = pages[page] || App;

</script>

<NavBar/>
<svelte:component
        this={pageComponent}
/>
