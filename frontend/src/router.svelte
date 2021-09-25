<script lang="ts">
    // Standart imports
    import NavBar from "./components/NavBar.svelte";
    //@ts-ignore // ignore unused import so we load the i18n module
    import {getTranslation} from "./i18n/i18n"
    // Import Component
    import About from "./view/About.svelte";
    import Home from "./view/Home.svelte";
    import Login from "./view/Login.svelte";
    import TechStack from "./view/TechStack.svelte";
    import Verify from "./view/Verify.svelte";



    const urlParams = new URLSearchParams(window.location.search);
    let page = urlParams.get("page");

    // map string to Component
    const pages = {
        about: About,
        home: Home,
        login: Login,
        techstack: TechStack,
        verify: Verify
    };

    // Select Page with default App
    $: pageComponent = pages[page] || Home;

</script>
<div class="menu">
    <NavBar/>
</div>
<div class="main">
    <svelte:component
            this={pageComponent}
    />
</div>


<style lang="scss" global>

  .main {
        padding-top: 60px;
        height: calc( 100vh + 60px);;
    }
    .menu {
        width: 100vw;
        position: fixed;
    }
</style>
