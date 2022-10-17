<template>
  <div class="MyComponent">
    
  </div>
</template>
<script>
export default {
  props: {
    codes: {
      type: String,
      default: "",
    },
    current: Object, // 类型随意，需要保证不同个组件编辑器切换时current值变化
  },

  watch: {
    current() {},
  },
};
</script>
<style lang="scss" scoped>
.MyComponent {
}
</style>

