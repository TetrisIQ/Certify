<script lang="ts">
    import dummy from '../model/Dummy.json';


    const urlParams = new URLSearchParams(window.location.search);
    let report = urlParams.get("report");

    let reportEncoded = dummy;


</script>


<div class="main">
    <div class="container text-center py-3">
        <h1 class="py-3">Certify</h1>
        {#if (report === null)}
            <h3>Scan a QR Code on your Report to Verify it!</h3>
        {:else }
            <button class="btn btn-danger">Verification Failed</button>
         <!--   <div class="my-4 align-items-center container">
                {#each reportEncoded.head as re}
                    <div class="row">
                        <div class="col-sm">
                            <span class="head">{re[0]}</span>
                        </div>
                        <div class="col-sm">
                            <span class="head">{re[1]}</span>
                        </div>
                    </div>
                {/each}
            </div>-->
            <div class="my-4 align-items-center container">
                <table class="mx-auto">
                    {#each reportEncoded.head as re}
                        <tr>
                            <td class="head">{re[0]}</td>
                            <td class="head">{re[1]}</td>
                        </tr>
                    {/each}
                </table>
            </div>

            <div class="my-4 align-items-center container">
                <table class="mx-auto mt-5">
                    <tr>
                        <th>{reportEncoded.subject}</th>
                        <th>{reportEncoded.grade}</th>
                    </tr>
                    {#each reportEncoded.body as re}
                        <tr>
                            <td>{re[0]}</td>
                            <td>{re[1]}</td>
                        </tr>
                    {/each}
                </table>
            </div>
        {/if}
    </div>
</div>


<style>

    .main {
        max-height: 200%;
        min-height: 90%;
    }

    .container {
        max-width: 800px;
    }

    td {
        min-width: 130px;
        padding-bottom: 3px;
        padding-top: 3px;
    }

    .head {
        font-size: larger;
    }

    .mt-5 {
        margin-top: 5rem;
    }

    .col-sm{
        max-width: 0px;
        min-width: 200px;
    }

</style>