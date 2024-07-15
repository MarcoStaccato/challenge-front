<template>
  <div class="container">
    <div class="row">&nbsp;</div>
    <div class="row">
      <div class="col-3">
        <n-space vertical>
          <n-card title="Operations" :bordered="false"></n-card>
          <n-card title="Addition" @click="compute('addition')" size="small" hoverable></n-card>
          <n-card title="Substraction" @click="compute('substraction')" size="small" hoverable></n-card>
          <n-card title="Multiplication" @click="compute('multiplication')" size="small" hoverable></n-card>
          <n-card title="Division" @click="compute('division')" size="small" hoverable></n-card>
          <n-card title="Square Root" @click="compute('sqrt')" size="small" hoverable></n-card>
          <n-card title="Random String" @click="compute('random')" size="small" hoverable></n-card>
        </n-space>
      </div>
      <div class="col-8">test</div>
    </div>
  </div>
</template>

<script>
import { NCard, NSpace } from 'naive-ui'
import OpsService from '../services/ops.service';

export default {
  name: 'Profile',
  components: {
      NCard,
      NSpace
    },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  },
  methods: {
    compute(operation) {
      OpsService.compute(1, 1, operation);
    },
  },
};
</script>