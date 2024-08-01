<template>
  <button class="btn" :type="type">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: ["type"],
};
</script>

<style lang="scss" scoped>
.btn {
  padding: 10px;
  background-color: var(--main-color);
  color: #fff;
  text-transform: capitalize;
  outline: none;
  font-weight: bold;
  letter-spacing: 3px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  width: fit-content;
  border: 2px solid var(--main-color);
  &:hover {
    background-color: #fff;
    color: var(--main-text-color);
  }
}
</style>
