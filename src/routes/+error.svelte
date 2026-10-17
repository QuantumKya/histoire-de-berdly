<script lang="ts">
    import { page } from '$app/state';
    import { onMount } from 'svelte';

    const nowhereMessages = [
        "Now here, nowhere.",
        "Looks like you've found nowhere.",
        "Why are you reading fanfiction at the soup store?!",
        "Hey, didn't you read the sign?",
        "Nothing to see here, except this.",
        "Keep reloading, I'm sure something will change.",
        "What was it that I am to say?\nI feel like I've forgotten.",
        "Betcha never seen this many different error messages before!",
    ];

    const impatientMessages = [
        "Glad you like it!",
        "Glad you like it!",
        "I'll write more soon.",
        "I don't write very fast :(",
    ];

    function getRandOf(arr: Array<any>) {
        return arr.at(Math.floor(Math.random() * arr.length));
    }


    // crazy button animation :)
    let x = $state(0);
    let y = $state(0);
    let ts = $state(false);
    let frame = 0;
    let animFrame: number;
    function randomMove() {
        if (frame === 0) {
            x = 0;
            y = 0;
        }
        if (frame === 55) {
            x = (Math.random() - 0.5) * 2 * 1;
            y = (Math.random() - 0.5) * 2 * 1;
        }

        if (frame === 40) ts = (Math.random() < 0.5);
        if (frame === 0) ts = false;

        animFrame = requestAnimationFrame(randomMove);
        frame = (frame + 1) % 60;
    }

    onMount(() => {
        animFrame = requestAnimationFrame(randomMove);
        return () => cancelAnimationFrame(animFrame);
    });
</script>

<div class="w-screen h-screen left-0 top-0 m-0 bg-slate-950 flex flex-col justify-center items-center">
    {#if page.status === 404}
        <h1>404</h1>
        {#each getRandOf(nowhereMessages).split("\n") as line}
            <p>{line}</p>
        {/each}
    {:else if page.status === 466}
        <h1>Impatient?</h1>
        {#each getRandOf(impatientMessages).split("\n") as line}
            <p>{line}</p>
        {/each}
    {:else}
        <h1>IDK</h1>
        <p>I think *I* did something wrong this time.</p>
    {/if}

    <a href="/" style={`translate: ${x}rem ${y}rem`} class="absolute bottom-20 text-lg {ts ? 'text-xl scale-y-150' : '' }">ESCAPE</a>
</div>

<style>
    @import "tailwindcss";

    h1 {
        @apply text-8xl;
    }

    p {
        @apply text-lg italic;
    }
</style>