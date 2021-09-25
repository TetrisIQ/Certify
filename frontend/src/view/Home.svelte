<script lang="ts">
    import {_} from 'svelte-i18n'


</script>
<div class="main">

    <div class="container">
        <div class="header">
            <h1>{$_('home.welcome')}</h1>
            <h3>{$_('home.caption')}</h3>
        </div>

        <div class="content">
            <p>
                {@html $_('home.text1')}
            </p>
            <img class="my-4" alt="Example QR Code"
                 src='https://raw.githubusercontent.com/wiki/TetrisIQ/Certify/img/MaxMusterman-dbb5e2a8.png'/>
            <h5 class="py-2">{$_('home.how')}</h5>
            <p>{@html $_('home.text2')}</p>
        </div>

    </div>

</div>


<style>
    .main {
        background: url("/assets/images/brandi-redd-aJTiW00qqtI-unsplash.jpg") fixed;
        max-height: 500%;
        padding-bottom: 3rem;
    }


    p {
        width: 400px;
        margin-left: auto;
        margin-right: auto;
    }

    .content {
        text-align: center;
    }

    .header {
        text-align: center;
        padding-top: 4rem;
        padding-bottom: 4rem;
    }
</style>