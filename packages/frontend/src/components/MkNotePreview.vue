<!--
SPDX-FileCopyrightText: syuilo and misskey-project
SPDX-License-Identifier: AGPL-3.0-only
-->

<template>
<div :class="$style.root">
	<div :class="$style.main">
		<div>
			<p v-if="useCw" :class="$style.cw">
				<Mfm v-if="cw != null && cw != ''" :text="cw" :author="user" :nyaize="'respect'" :i="user" style="margin-right: 8px;"/>
				<MkCwButton v-model="showContent" :text="text.trim()" :files="files" :poll="poll" style="margin: 4px 0;"/>
			</p>
			<div v-show="!useCw || showContent">
				<Mfm :text="text.trim()" :author="user" :nyaize="'respect'" :i="user"/>
			</div>
		</div>
	</div>
</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import * as Misskey from 'misskey-js';
import type { PollEditorModelValue } from '@/components/MkPollEditor.vue';
import MkCwButton from '@/components/MkCwButton.vue';

const showContent = ref(false);

const props = defineProps<{
	text: string;
	files: Misskey.entities.DriveFile[];
	poll?: PollEditorModelValue;
	useCw: boolean;
	cw: string | null;
	user: Misskey.entities.User;
}>();
</script>

<style lang="scss" module>
.root {
	display: flex;
	margin: 0;
	padding: 0;
	overflow: clip;
	font-size: 0.95em;
}

.main {
	flex: 1;
	min-width: 0;
}

.cw {
	cursor: default;
	display: block;
	margin: 0;
	padding: 0;
	overflow-wrap: break-word;
}

.header {
	margin-bottom: 2px;
	font-weight: bold;
	width: 100%;
	overflow: clip;
    text-overflow: ellipsis;
}
</style>
