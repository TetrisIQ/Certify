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
          <!--  <p>Wherever you find a QR on a report. Scan it!
                Your Grades are stored in the QR code, not on our Servers.
                You don't beleve us. Check it out! We are <a target="_blank"
                                                             href="https://github.com/TetrisIQ/Certify/">OpenSource</a>!
                Here are an Example QR code. So you can try it out.</p>-->
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
        height: 110%;
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