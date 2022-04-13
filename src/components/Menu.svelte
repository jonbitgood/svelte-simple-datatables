<script>
	import { fade } from 'svelte/transition'

	let active = false

	function closeOnClickOutside() {
		const handleClick = (node,event) => {
			//if(!node.contains(event.target)) {
				active = false
			//}
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
			tabindex="-1"
			transition:fade
			use:closeOnClickOutside>

			<slot name="menu" />


		</div>
	{/if}
</div>
