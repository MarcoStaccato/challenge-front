<template>
  <div class="container">
    <div class="row">&nbsp;</div>
    <n-data-table
      remote
      ref="table"
      :columns="columns"
      :data="data"
      :loading="loading"
      :pagination="pagination"
      :row-key="rowKey"
      @update:sorter="handleSorterChange"
      @update:filters="handleFiltersChange"
      @update:page="handlePageChange"
    />
  </div>
</template>

<script>

import { onMounted, reactive, ref } from 'vue'
import { NDataTable } from 'naive-ui'
import OpsService from '../services/ops.service';

const id = {
  title: 'id',
  key: 'id',
  sorter: true,
  sortOrder: false
}
const date = {
  title: 'date',
  key: 'date',
  sorter: true,
  sortOrder: false
}
const amount = {
  title: 'amount',
  key: 'amount',
  sorter: true,
  sortOrder: false
}
const userBalance = {
  title: 'userBalance',
  key: 'userBalance',
  sorter: true,
  sortOrder: false
}
const operationId = {
  title: 'operationId',
  key: 'operationId',
  sorter: true,
  sortOrder: false
}
const response = {
  title: 'response',
  key: 'operationResponse',
  sorter: true,
  sortOrder: false
}

const columns = [
  id,
  date,
  amount,
  userBalance,
  operationId,
  response
]

export default {
  name: "History",
  setup() {
    const dataRef = ref([])
    const loadingRef = ref(true)
    const columnsRef = ref(columns)
    const column1Reactive = reactive(date)
    const column2Reactive = reactive(userBalance)
    const paginationReactive = reactive({
      page: 1,
      pageCount: 1,
      pageSize: 10,
      prefix({ itemCount }) {
        return `Total is ${itemCount}.`
      }
    })

    onMounted(() => {
      console.log("Calling query")
      OpsService.getRecords("date", 0, 5, "desc")
      .then((data) => {
        console.log("processing data")
        dataRef.value = data.data
        paginationReactive.pageCount = 20
        paginationReactive.itemCount = 200
        loadingRef.value = false
      })
    })

    return {
      data: dataRef,
      columns: columnsRef,
      column1: column1Reactive,
      column2: column2Reactive,
      pagination: paginationReactive,
      loading: loadingRef,
      rowKey(rowData) {
        return rowData.column1
      },
      handleSorterChange(sorter) {
        if (!loadingRef.value) {
          loadingRef.value = true
          OpsService.getRecords(sorter.columnKey, paginationReactive.page, paginationReactive.pageSize, !sorter ? "desc" : "asc")
          .then((data) => {
            dataRef.value = data.data
            loadingRef.value = false
          })
            // query(
            //   paginationReactive.page,
            //   paginationReactive.pageSize,
            //   !sorter ? false : sorter.order,
            //   column2Reactive.filterOptionValues
            // ).then((data) => {
            //   column1Reactive.sortOrder = !sorter ? false : sorter.order
            //   dataRef.value = data.data
            //   paginationReactive.pageCount = data.pageCount
            //   paginationReactive.itemCount = data.total
            //   loadingRef.value = false
            // })
        }
      },
      handleFiltersChange() {
        if (!loadingRef.value) {
          loadingRef.value = true
          // const filterValues = filters.column2 || []
          // query(
          //   paginationReactive.page,
          //   paginationReactive.pageSize,
          //   column1Reactive.sortOrder,
          //   filterValues
          // ).then((data) => {
          //   column2Reactive.filterOptionValues = filterValues
          //   dataRef.value = data.data
          //   paginationReactive.pageCount = data.pageCount
          //   paginationReactive.itemCount = data.total
          //   loadingRef.value = false
          // })
        }
      },
      handlePageChange(currentPage) {
        if (!loadingRef.value) {
          loadingRef.value = true
          OpsService.getRecords("date", currentPage-1, paginationReactive.pageSize, "desc")
          .then((data) => {
            console.log("processing data")
            dataRef.value = data.data
            paginationReactive.pageCount = 20
            paginationReactive.itemCount = 200
            loadingRef.value = false
          })
        }
      }
    }
  },
  components: {
    NDataTable
  },
  computed: {
  },
  methods: {
  },
};
</script>