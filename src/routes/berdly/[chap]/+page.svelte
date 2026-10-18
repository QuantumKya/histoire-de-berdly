<script>
    let { data } = $props();
</script>

<div class="m-5">

    <h1 class="text-4xl">{data.item.chapter}</h1>
    <h2 class="text-2xl mb-5">{data.item.title}</h2>
    
    {#each data.lines as leContenu}
        <p>
            {leContenu.trim() === '' ? '\u00a0' : leContenu}
        </p>
    {/each}

</div>