<!--
SPDX-FileCopyrightText: syuilo and misskey-project
SPDX-License-Identifier: AGPL-3.0-only
-->

<template>
<code :class="$style.root">{{ code }}</code>
</template>

<script lang="ts" setup>
const props = defineProps<{
	code: string;
}>();
</script>

<style module lang="scss">
.root {
	display: inline-block;
	font-family: "JetBrains Mono", "Pretendard JP", Pretendard, Consolas, Monaco, Andale Mono, Ubuntu Mono, monospace;
	overflow-wrap: anywhere;
	background: var(--MI_THEME-bg);
	padding: .1em;
	border-radius: .3em;
}
</style>
