<script lang="ts">
	export let name: string;
</script>

<main>
	<h1>Welcome {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
    <p class="welcome">ยินดีต้อนรับเข้าสู่เว็บไซต์ของเรา พร้อมแล้วก็ไปเลย!</p>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

    .welcome {
        font-family: 'LINESeedSansTH_W_Rg', sans-serif;
        font-size: 16px;
    }

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
