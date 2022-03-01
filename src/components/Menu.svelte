<script>
	import { fade } from 'svelte/transition'

	let active = false

	function closeOnClickOutside() {
		const handleClick = () => {
			if(!node.contains(event.target)) {
				active = false
			}
		}
		document.addEventListener('click', handleClick, { capture: true })
		return {
			destroy() {
				document.removeEventListener('click', handleClick, { capture: true })
			},
		}
	}
</script>

<div class="relative">
	<div>
		<div
			aria-haspopup="true"
			on:click="{() => (active = !active)}">
			<span class="sr-only">Open menu</span>
			<slot name="trigger" />
		</div>
	</div>
	{#if active}
		<div
			role="menu"
			aria-orientation="vertical"
			aria-labelledby="user-menu-button"
			class="z-40 relative"
			tabindex="-1"
			transition:fade
			use:closeOnClickOutside>
			<div class="bg-white shadow absolute left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-md sm:px-0 lg:max-w-3xl">
				<div class="relative h-32 w-32 ...">
					<div class="absolute top-0 right-0 h-16 w-16" on:click="{() => (active = !active)}">X</div>
				  </div>

			<slot name="menu" />

			</div>
		</div>
	{/if}
</div>
