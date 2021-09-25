<script lang="ts">
    import {_, locale} from 'svelte-i18n'

    //TODO: Highlighting for current page

    console.log($locale)
</script>


<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a href="?page=home">
        <img src="/assets/images/Certify_Logo_square.svg" height="40px" alt="Certify Logo"/>
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
                <a class="nav-link" href="?page=home">{$_('global.navbar.home', {default: 'Home'})}</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="?page=verify">{$_('global.navbar.verify', {default: 'Verify'})}</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="?page=techstack">{$_('global.navbar.techstack', {default: 'Tech Stack'})}</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="?page=about">{$_('global.navbar.about', {default: 'About'})}</a>
            </li>
        </ul>
        <div class="form-inline my-2 my-lg-0">
            <select bind:value={$locale} class="custom-select" id="inputGroupSelect01">
                <option selected={$locale === "en-EN"} value="en">EN</option>
                <option selected={$locale === "de-DE"} value="de">DE</option>
            </select>
            <a class="nav-link" href="?page=login">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#18BC9C"
                     class="bi bi-person-circle" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"></path>
                    <path fill-rule="evenodd"
                          d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"></path>
                </svg>
            </a>
        </div>
    </div>
</nav>
