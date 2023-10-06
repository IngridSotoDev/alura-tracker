<template>
  <button class="button" @click="onclick" :disabled="disabled">
    <span class="icon">
      <i :class="icon"></i>
    </span>
    <span>{{ text }}</span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Botao",
  emits: ["onclick"],
  props: {
    disabled: {
      type: Boolean,
    },
    icon: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  methods: {
    onclick(): void {
      this.$emit("onclick");
    },
  },
});
</script>
