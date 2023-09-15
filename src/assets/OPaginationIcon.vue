<template>
    <span class="oPaginationIcon">
      <slot></slot>
    </span>
</template>
<style>
  .oPaginationIcon {
    line-height: 1;
  }
  .oPaginationIcon svg {
    width: 1em;
    height: 1em;
    color: currentColor;
    vertical-align: top;
  }
</style>
<script lang="ts">
export default {
  name: "OPaginationIcon" 
};
</script>