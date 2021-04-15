<template>
  <div>
    <el-card>
      <el-table
        :data="business"
        stripe
        border
        style="width: 100%">
        <el-table-column
          prop="shopName"
          label="店铺名"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="username"
          label="商家名"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="email"
          label="商家邮箱"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="status"
          label="审核"
          align="center">
          <template v-slot="scope">
            <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="changeBusiness(scope.row)"></el-switch>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getAllMerchants, passMerchant } from '@/api/admin';

export default {
  data() {
    return {
      business: [],
    };
  },
  created() {
    getAllMerchants().then((res) => {
      console.log(res.data);
      if (res.code === 2000) {
        const { data } = res;
        // eslint-disable-next-line array-callback-return
        data.map((item) => {
          // eslint-disable-next-line no-param-reassign
          item.status = this.transform(item.status);
        });
        this.business = data;
      }
    });
  },
  methods: {
    transform(status) {
      return status === 1;
    },
    changeBusiness(row) {
      passMerchant({
        id: row.id,
        email: row.email,
      }).then((res) => {
        if (res.code === 2000) {
          this.$message({
            type: 'success',
            message: '审核通过',
          });
        }
      });
    },
  },
};
</script>

<style  scoped>

</style>
