<template>
  <div class="container">
    <div class="row">&nbsp;</div>
    <div class="row">
      <div class="col-3">
        <n-space vertical>
          <n-card title="Operations" :bordered="false"></n-card>
          <n-card title="Addition" @click="setOperation('addition')" size="small" hoverable></n-card>
          <n-card title="Substraction" @click="setOperation('substraction')" size="small" hoverable></n-card>
          <n-card title="Multiplication" @click="setOperation('multiplication')" size="small" hoverable></n-card>
          <n-card title="Division" @click="setOperation('division')" size="small" hoverable></n-card>
          <n-card title="Square Root" @click="setOperation('sqrt')" size="small" hoverable></n-card>
          <n-card title="Random String" @click="setOperation('random')" size="small" hoverable></n-card>
        </n-space>
      </div>
      <div class="col-9" style="margin-top: 10%;">
        <div style="padding-left: 20%;">
          <n-space>
            <n-button strong secondary round type="info" @click="compute()">
              Compute
            </n-button>
          </n-space>
      </div>
        <n-space v-if="operator !== 'random' && operator !== 'sqrt'" style="margin-top: 10%;">
          <br style="display: block;">
          <n-input ref="numeratorId"
            type="textarea"
            :allow-input="onlyAllowNumber"
            placeholder="Numerator"
            @input="handleNum"
          />
          <h3 class="result">{{this.symbol}}</h3>
          <n-input ref="denominatorId"
            type="textarea"
            :allow-input="onlyAllowNumber"
            placeholder="Denominator"
            @input="handleDenom"
          />
          <h3 class="result">=</h3>
          <h3 class="result">{{this.result}}</h3>
        </n-space>
        <n-space v-if="operator === 'random'">
          <h3 class="result" style="display: block;"> Random String: </h3>
          <h3 class="result">{{this.result}}</h3>
        </n-space>
      </div>
    </div>
  </div>
</template>

<script>
import { NCard, NSpace, NInput, NButton } from 'naive-ui'
import OpsService from '../services/ops.service';


export default {
  name: 'Profile',
  components: {
    NCard,
    NSpace,
    NInput,
    NButton
  },
  data() {
    return {
      numerator: 0,
      denominator: 0,
      operator: "addition",
      result: 0,
      symbol: "+"
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    dataResult: function () {
      return this.result;
    }

  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  },
  methods: {
    compute() {
      OpsService.compute(this.$data.numerator, this.$data.denominator).then((value) => {
      this.result = value.data

      // Expected output: "Success!"
    });
    },
    onlyAllowNumber: (value) => !value || /^\d+$/.test(value),
    setOperation(op){
      localStorage.setItem('operation', op)
      this.$data.operator = op;
      this.$data.symbol = OpsService.getSymbol(op);

      this.$data.result = "";

    },
    handleNum(v) {
      this.$data.numerator = v 
    },
    handleDenom(v) {
      this.$data.denominator = v
    }
  },
};
</script>