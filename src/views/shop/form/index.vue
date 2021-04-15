<template>
  <el-card>
    <vxe-toolbar>

      <template #buttons>
        <vxe-button @click="excel">Excel导出</vxe-button>
        <vxe-button @click="form">筛选</vxe-button>
        <vxe-input v-model="id" placeholder="输入spu/sku"></vxe-input>
      </template>
    </vxe-toolbar>
    <vxe-table
      border
      show-header-overflow
      show-overflow
      highlight-hover-row
      :align="allAlign"
      :data="tableData">
      <vxe-table-column type="seq" title="序号" width="60"></vxe-table-column>
      <vxe-table-column field="spu" title="SPU"></vxe-table-column>
      <vxe-table-column field="sku" title="SKU"></vxe-table-column>
      <vxe-table-column field="title" title="SKU标题"></vxe-table-column>
      <vxe-table-column field="number" title="数量"></vxe-table-column>
      <vxe-table-column field="mount" title="营业额"></vxe-table-column>
    </vxe-table>
    <vxe-pager
      background
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :total="totalPage"
      :layouts="['PrevJump', 'PrevPage', 'JumpNumber', 'NextPage', 'NextJump', 'Sizes', 'FullJump', 'Total']"
      @page-change="form">
    </vxe-pager>
  </el-card>
</template>

<script>
import { adminForm, merchantsForm } from '@/api/admin'
import { getCookie } from '@/utils/cookieUtils'

export default {
  data () {
    return {
      allAlign: null,
      tableData: [
      ],
      currentPage:1,
      pageSize:10,
      totalPage:null,
      shopId:null,
      id:null
    }
  },
  created() {
    this.form()
  },
  methods:{
    form(){
      this.shopId = getCookie('sid')
      const {currentPage,pageSize,shopId,id}=this
      merchantsForm({
        currentPage,
        pageSize,
        shopId,
        id
      }).then((res) => {
        this.tableData=res.data.records
        this.totalPage=res.data.total
      });
    },
    excel(){
      window.open (
        "http://localhost:9000/merchants/admin/export"
      )
    },
  }
}
</script>

<style scoped>

</style>
