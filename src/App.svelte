<script>
	import ExperienceSwitcher from "./lib/components/ExperienceSwitcher.svelte";
	import ScrollProgress from "./lib/components/ScrollProgress.svelte";
	import ParticleField from "./lib/components/ParticleField.svelte";
	import CursorSpotlight from "./lib/components/CursorSpotlight.svelte";
	import ScanLines from "./lib/components/ScanLines.svelte";
	import BackToTop from "./lib/components/BackToTop.svelte";
	import SkipToContent from "./lib/components/SkipToContent.svelte";
	import ToastContainer from "./lib/components/ToastContainer.svelte";
	import KeyboardShortcuts from "./lib/components/KeyboardShortcuts.svelte";
	import Lightbox from "./lib/components/Lightbox.svelte";
	import HoloExperience from "./experiences/holo/HoloExperience.svelte";
	import KantoExperience from "./experiences/kanto/KantoExperience.svelte";
	import FanExperience from "./experiences/fan/FanExperience.svelte";
	import { experience } from "./lib/stores/experience";

	let searchQuery = "";
</script>

<SkipToContent targetId="main-content" />
<ScrollProgress />
<!-- Reduced from 3 layers to 1 for better performance -->
<ParticleField layer={1} />
<CursorSpotlight />
<ScanLines />
<BackToTop />
<ToastContainer />
<KeyboardShortcuts />
<Lightbox />

<main id="main-content" tabindex="-1">
	<ExperienceSwitcher 
		bind:searchQuery 
		showSearch={true}
		on:search={(e) => searchQuery = e.detail}
	/>

	{#if $experience === "holo"}
		<HoloExperience bind:query={searchQuery} />
	{:else if $experience === "kanto"}
		<KantoExperience bind:query={searchQuery} />
	{:else if $experience === "fan"}
		<FanExperience />
	{/if}
</main>
