<template>
  <el-card>
    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button status="primary" content="主要颜色">新增商品</vxe-button>
      </template>
      <template v-slot:tools>
        <vxe-input v-model="keyWord" placeholder="搜索"></vxe-input>
      </template>
    </vxe-toolbar>
    <vxe-table
      border
      resizable
      :tree-config="{children: 'children', accordion: true}"
      :data="tableData"
      @checkbox-change="checkboxChangeEvent"
      ref="xTable"
    >
      <vxe-table-column type="checkbox" width="60">
      </vxe-table-column>
      <vxe-table-column title="SKU/SPU" tree-node>
        <template v-slot="{ row }">
          <div>
            <div v-if="row.spu!=null">{{ row.spu }}</div>
            <div v-else>{{ row.sku }}</div>
          </div>
        </template>
      </vxe-table-column>
      <vxe-table-column field="title" title="SKU/SKU 名字"></vxe-table-column>
      <vxe-table-column field="color" title="商品颜色"></vxe-table-column>
      <vxe-table-column field="price" title="商品价格"></vxe-table-column>
      <vxe-table-column field="count" title="商品库存"></vxe-table-column>
      <vxe-table-column field="image" title="商品图片">
        <template v-slot="{ row }">
          <img v-show="row.image!=null" :src=row.image height="200" width="200" alt="">
        </template>
      </vxe-table-column>
      <vxe-table-column title="操作" width="200" show-overflow>
        <template v-slot="{ row }">
          <vxe-button status="primary" content="主要颜色" @click="editEvent(row)">编辑</vxe-button>
          <!--          <vxe-button  status="danger" content="危险颜色" >删除</vxe-button>-->
        </template>
      </vxe-table-column>
      <vxe-table-column title="商品上下架">
        <template v-slot="{ row }">
          <el-switch
            v-if="row.isMarketable!=null"
            v-model="row.isMarketable==1"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change=changeSpu(row)
          >
          </el-switch>
          <el-switch
            v-else
            v-model="row.status==1"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change=changeSpu(row)
          >
          </el-switch>
        </template>
      </vxe-table-column>
    </vxe-table>
    <vxe-pager
      perfect
      :current-page.sync="tablePage.currentPage"
      :page-size.sync="tablePage.pageSize"
      :total="tablePage.total"
      :layouts="['PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'Sizes', 'FullJump', 'Total']"
      @page-change="handlePageChange"
    >
      <template v-slot:left>
            <span class="page-left">
              <vxe-checkbox v-model="isAllChecked" :indeterminate="isIndeterminate" @change="changeAllEvent"
              ></vxe-checkbox>
              <span class="select-count">选中{{ selectRecords.length }}条</span>
              <vxe-button @click="batchDeletion(selectRecords)">批量删除</vxe-button>
            </span>
      </template>
    </vxe-pager>
    <el-dialog
      title="编辑&保存"
      :visible.sync="showEdit"
      width="30%"
    >
      <el-form :model="form">
        <el-form-item label="商品ID" :label-width="formLabelWidth">
          <el-input v-text="form.sku" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" :label-width="formLabelWidth">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品颜色" :label-width="formLabelWidth">
          <el-input v-model="form.color" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品库存" :label-width="formLabelWidth">
          <el-input v-model="form.count" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品图片" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:9000/good/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="form.images" :src="form.images" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="提示" :label-width="formLabelWidth">
          <div>点击上传并切换图片</div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="showEdit = false">取 消</el-button>
    <el-button type="primary" @click=submitEvent>确 定</el-button>
  </span>
    </el-dialog>
  </el-card>

</template>

<script>
import { batchDeletion, changeSpu, getList, updateSku } from '@/api/shop'
import { getCookie } from '@/utils/cookieUtils'

export default {
  data() {
    return {
      tableData: [
        {
          id: 100007300763,
          spu: '',
          title: '海信（Hisense）65E9F 65英寸 4K超高清 智慧屏 ULED超画质量子点画质旗舰全面屏液晶教育电视机 3+128G',
          isMarketable: 0,
          children: [
            {
              'id': '100007637459',
              'title': '海信（Hisense）65E9F 65英寸 4K超高清 智慧屏 ULED超画质量子点画质旗舰全面屏液晶教育电视机 3+128G',
              'price': 7999,
              'color': 'ULED超画质社交新品-65E9F',
              'count': 1,
              'image': 'https://img14.360buyimg.com/n1/jfs/t1/154311/13/4544/164839/5fa1390fEb9da5a4e/c21378cdfecdb89b.jpg'
            },
            {
              'id': '100006060267',
              'title': '海信（Hisense）65E8D 65英寸 智慧屏 ULED量子点高色域 AI声控4K超高清超薄悬浮全面屏液晶教育电视机3+32G',
              'price': 5999,
              'count': 1000,
              'image': 'https://img12.360buyimg.com/n1/jfs/t1/128069/3/17376/138548/5fa1fb00E8d042a1a/cb381288ff708ab2.jpg',
              'color': 'ULED量子点社交新品-65E8D'
            }
          ]
        },
        {
          id: 1005,
          name: 'Test2',
          type: 'mp4',
          size: null,
          date: '2021-04-01',
          children: [
            { id: 24300, name: 'Test3', type: 'avi', size: 1024, date: '2020-03-01' },
            { id: 20045, name: 'vxe-table 从入门到放弃4', type: 'html', size: 600, date: '2021-04-01' },
            {
              id: 10053,
              name: 'vxe-table 从入门到放弃96',
              type: 'avi',
              size: null,
              date: '2021-04-01',
              children: [
                { id: 24330, name: 'vxe-table 从入门到放弃5', type: 'txt', size: 25, date: '2021-10-01' },
                { id: 21011, name: 'Test6', type: 'pdf', size: 512, date: '2020-01-01' },
                { id: 22200, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' }
              ]
            }
          ]
        },
        { id: 23666, name: 'Test8', type: 'xlsx', size: 2048, date: '2020-11-01' },
        { id: 24555, name: 'vxe-table 从入门到放弃9', type: 'avi', size: 224, date: '2020-10-01' }
      ],
      keyWord: '',
      tablePage: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
      isAllChecked: false,
      setAllCheckboxRow: false,
      isIndeterminate: false,
      selectRecords: [],
      selectRow: null,
      showEdit: false,
      submitLoading: false,
      formRules: {},
      form: {
        sku: null,
        title: null,
        price: null,
        color: null,
        count: null,
        images: null
      },
      formLabelWidth: '120px',
      formItems: [
        {
          field: 'id',
          title: '商品ID',
          span: 8,
          itemRender: { name: '$text' }
        },
        {
          field: 'title',
          title: '商品名称',
          span: 13,
          itemRender: { name: '$input', props: { placeholder: '请输入商品名称' } }
        },
        {
          filed: 'color',
          title: '商品颜色',
          span: 10,
          itemRender: { name: '$input', props: { placeholder: '请输入商品颜色' } }
        },
        {
          field: 'price',
          title: '商品价格',
          span: 6,
          itemRender: { name: '$input', props: { placeholder: '请输入商品价格' } }
        },
        {
          filed: 'count',
          title: '商品库存',
          span: 6,
          itemRender: { name: '$input', props: { placeholder: '请输入商品库存' } }
        },
        {
          field: 'image',
          title: '商品图片',
          span: 6
        },
        {
          field: 'test',
          title: '商品图片',
          span: 10
        }

      ]
    }

  },
  created() {
    this.getList()
  },
  computed: {},
  methods: {
    changeSpu(row) {
      let { id, isMarketable } = row
      let status
      if (isMarketable === 0) {
        status = 1
      } else if (isMarketable === 1) {
        status = 0
      }
      changeSpu({
        id, status
      }).then((res) => {
        if (res.code === 2000) {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          this.getList()
        }
      })
    },
    batchDeletion(selectRecords) {
      let params = {
        spu: [],
        desc: [],
        skus: []
      }

      for (let i = 0; i < selectRecords.length; i++) {
        if (selectRecords[i].desc!=null){
          params.spu.push(selectRecords[i].id)
          params.desc.push(selectRecords[i].desc)
        }else {
          params.skus.push(selectRecords[i].id)
        }

      }
      batchDeletion(params).then(res =>{
        if (res.data === "ok"){
          console.log("批量删除成功")
          this.getList()
          this.selectRecords = []
        }
      })


    },
    getList() {
      const mid = getCookie('mid')
      getList(mid, this.tablePage.currentPage, this.tablePage.pageSize).then(res => {
        this.tableData = res.data.list
        this.tablePage.total = res.data.total
      })
    },
    checkboxChangeEvent({ records }) {
      this.isAllChecked = this.$refs.xTable.isAllCheckboxChecked()
      this.isIndeterminate = this.$refs.xTable.isCheckboxIndeterminate()
      this.selectRecords = records
    },
    changeAllEvent() {
      this.$refs.xTable.setAllCheckboxRow(this.isAllChecked)
      this.selectRecords = this.$refs.xTable.getCheckboxRecords()
    },
    editEvent(row) {
      this.form = {
        id: row.id,
        sku: row.sku,
        title: row.title,
        color: row.color,
        price: row.price,
        count: row.count,
        images: row.image
      }
      this.selectRow = row
      this.showEdit = true
    },
    submitEvent() {
      updateSku(this.form).then(res => {
        res.data = 'ok'
        this.showEdit = false
        this.getList()
      })
    },
    handleAvatarSuccess(res, file) {
      this.form.images = res.data
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handlePageChange({ currentPage, pageSize }) {
      this.tablePage.currentPage = currentPage
      this.tablePage.pageSize = pageSize
      this.getList()
    }
  }
}
</script>
<style scoped>
.page-left {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
