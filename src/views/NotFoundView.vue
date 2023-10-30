<template>
  <el-dialog
      title="404 - Not Found"
      v-model="dialogVisible"
      width="30%"
      center
      :before-close="handleClose"
  >
    <p>The page you are looking for does not exist.</p>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">Close</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: true
    };
  },
  methods: {
    handleClose() {
      this.dialogVisible = false;
      console.log(this.$router.currentRoute);
      this.$router.push("/")
    }
  }
};
</script>

<style scoped>
</style>
