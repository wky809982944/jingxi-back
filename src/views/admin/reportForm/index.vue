<template>
<el-card>
  <vxe-toolbar>
    <template #buttons>
      <vxe-button @click="excel">Excel导出</vxe-button>
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
    <vxe-table-column field="shopId" title="店铺Id"></vxe-table-column>
    <vxe-table-column field="shopName" title="店铺名字"></vxe-table-column>
    <vxe-table-column field="number" title="销量"></vxe-table-column>
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
import { adminForm, adminFormExport } from '@/api/admin'

export default {
  data () {
    return {
      allAlign: null,
      tableData: [
      ],
      currentPage:1,
      pageSize:10,
      totalPage:null
    }
  },
  created() {
   this.form()
  },
  methods:{
    form(){
      const {currentPage,pageSize}=this
      adminForm({
        currentPage,
        pageSize
      }).then((res) => {
        this.tableData=res.data.records
        this.totalPage=res.data.total
      });
    },
    excel(){
      window.open (
        "http://localhost:9000/merchants/admin/export"
      )

    }
  }
}
</script>

<style scoped>

</style>
