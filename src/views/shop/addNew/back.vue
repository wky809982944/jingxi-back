<template>
  <div>
    <el-card class="box-card">
      <el-steps :active="active" finish-status="success">
        <el-step title="商品分类"></el-step>
        <el-step title="商品sku"></el-step>
        <el-step title="商品spu"></el-step>
        <el-step title="商品详情"></el-step>
      </el-steps>
        <el-cascader
          :options="cates"
          placeholder="请选择商品分类"
          :props="{ expandTrigger: 'hover', value: 'id', label: 'name', children: 'list' }"
          v-model="selectCate"
          v-show="active === 0"
          clearable>
        </el-cascader>
      <div v-show="active===1">
        <div>
          商品颜色
          <el-button icon="el-icon-circle-plus-outline" type="primary" size="small" @click="addColor">添加商品颜色</el-button>
        </div>
        <template v-for="(item, index) in colors">
          <el-input placeholder="商品颜色"  v-model="colors[index].label"></el-input>
        </template>
        <div>
          商品版本
          <el-button icon="el-icon-circle-plus-outline" type="primary" size="small" @click="addVersion">添加商品版本</el-button>
        </div>
        <template v-for="(item, index) in versions">
          <el-input placeholder="商品版本"  v-model="versions[index].label"></el-input>
        </template>
        <div>
          购买方式
          <el-button icon="el-icon-circle-plus-outline" type="primary" size="small" @click="addBuyWay">添加购买方式</el-button>
        </div>
        <template v-for="(item, index) in buyWays">
          <el-input placeholder="购买方式"  v-model="buyWays[index].label"></el-input>
        </template>
      </div>
      <div v-show="active===2">
        <h2>商品SKU列表</h2>
        <el-button
        type="primary"
        size="medium"
        icon="el-icon-edit"
        @click="addGoodItem">添加
        </el-button>
        <vxe-table
          border
          align="center"
          resizable
          show-overflow
          :data="goodItem"
          :edit-config="{trigger: 'dblclick', mode: 'cell'}">
          <vxe-table-column class-name="index" type="seq" title="#" width="60"></vxe-table-column>
          <vxe-table-column field="goodName" title="商品名" width="350" :edit-render="{name: 'input', attrs: {type: 'text'}}"></vxe-table-column>
          <vxe-table-column field="goodColor" title="商品颜色" width="200" :edit-render="{name: '$select', options: colors}"></vxe-table-column>
          <vxe-table-column field="goodVersion" title="商品版本" width="150" :edit-render="{name: '$select', options: versions}"></vxe-table-column>
          <vxe-table-column field="buyWay" title="购买方式" width="100" :edit-render="{name: '$select', options: buyWays}"></vxe-table-column>
          <vxe-table-column field="price" title="商品价格" width="100" :edit-render="{name: '$input', props: {type: 'number'}}"></vxe-table-column>
          <vxe-table-column field="images" title="商品图片" width="131">
            <button @click.self="showImagesDialog($event)" class="addBtn">添加图片</button>
          </vxe-table-column>
        </vxe-table>

      </div>
      <div v-show="active===4">
        <template v-for="(item, index) in goodParameters">
          <div :key="index" style="display: flex">
            <el-input style="margin-right: 10px" placeholder="参数名" v-model="goodParameters[index].key"></el-input>
            <el-input placeholder="参数值" v-model="goodParameters[index].value"></el-input>
          </div>
        </template>
        <el-button type="primary" size="medium" @click="addGoodParameter">添加商品参数</el-button>
        <h2>商品详情列表</h2>
        <el-upload
          action="#"
          list-type="picture-card"
          ref="upload2"
          :http-request="uploadGoodDesc"
          :multiple="true"
          :auto-upload="false">
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{file}">
            <img
              class="el-upload-list__item-thumbnail"
              :src="file.url" alt=""
            >
            <span class="el-upload-list__item-actions">
        <span
          class="el-upload-list__item-preview"
          @click="handlePictureCardPreview(file)"
        >
          <i class="el-icon-zoom-in"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleRemove(file)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
          </div>
        </el-upload>
        <el-button type="success" icon="el-icon-upload" style="margin-top: 10px" @click="submitUpload2">上传详情图片</el-button>
        <div style="text-align: center">
          <el-button type="primary" icon="el-icon-upload2" style="margin-top: 20px" @click="addGood">上传商品</el-button>
        </div>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <el-dialog :visible.sync="addImagesDialogVisible" title="添加商品图片">
          <el-upload
            action="#"
            ref="upload"
            list-type="picture-card"
            :on-success="handleSuccess"
            :multiple="true"
            :file-list="fileList"
            :http-request="uploadFile"
            :auto-upload="false">
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{file}">
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url" alt=""
              >
              <span class="el-upload-list__item-actions">
        <span
          class="el-upload-list__item-preview"
          @click="handlePictureCardPreview(file)"
        >
          <i class="el-icon-zoom-in"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleRemove(file)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
            </div>
          </el-upload>
          <el-button type="success" icon="el-icon-upload" style="margin-top: 15px" @click="submitUpload">点击上传</el-button>
        </el-dialog>
      </div>

      <el-button style="margin-top: 12px;" @click="prev">上一步</el-button>
      <el-button style="margin-top: 12px;" @click="next">下一步</el-button>

    </el-card>
  </div>


</template>

<script>
import { getAllCate } from '@/api/addGood'
export default {
  name: 'index',
  data() {
    return {
      fileList: [],
      active: 0,
      selectCate: '',
      tdIndex: 0,
      id: 0,
      goodItem: [
        {
          id: 0,
          goodName: '小米10',
          goodColor: '五彩斑斓黑',
          goodVersion: '12G+512G',
          buyWay: '官方套餐',
          price: '5999',
          images: [],
        },
      ],
      cates: [],
      show: true,
      colors: [
        { label: '白色'},
      ],
      versions: [
        { label: '6GB+128GB'},
      ],
      buyWays: [
        { label: '官方标配'},
      ],
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      addImagesDialogVisible: false,
      tabIndex: '0',
      picPreviewDialogVisible: false,
      goodParameters: [
        { key: '品牌', value: 'xiaomi' },
      ],
      goodDesc: [],
      uploadForm: new FormData(),
      uploadForm2: new FormData(),
    };
  },
  created() {
    getAllCate().then((res) => {
      if (res.code === 2000) {
        this.cates = res.data;
      }
    });
  },
  computed:{
  },
  methods: {
    next() {
      if (this.active<=2)
        this.active ++;
    },
    prev() {
      if (this.active>=0)
     this.active--;
    },
    addColor() {
      this.colors.push({ label:'' });
    },
    addVersion() {
      this.versions.push({ label: ''});
    },
    addBuyWay() {
      this.buyWays.push({ label: ''});
    },
    addGoodItem() {
      this.id += 1;
      const temp = {
        id: this.id,
        goodName: '',
        goodColor: '',
        goodVersion: '',
        buyWay: '',
        price: '',
        images: [],
      };
      this.goodItem.push(temp);
    },
    showImagesDialog(event) {
      console.log(event.target.parentNode.parentNode.parentNode.querySelector('.index').querySelector('.vxe-cell').innerHTML * 1);
      this.tdIndex = event.target.parentNode.parentNode.parentNode.querySelector('.index').querySelector('.vxe-cell').innerHTML * 1;
      console.log(this.tdIndex);
      this.addImagesDialogVisible = true;
      this.fileList = this.goodItem[this.tdIndex - 1].images;
    },
    addGoodDesc(file, fileList) {
      console.log(file);
      this.goodDesc = fileList;
    },
    handleChange(file, fileList) {
      console.log('成功');
      console.log(file);
      console.log(fileList);
      this.addImage(fileList);
    },
    addImage(fileList) {
      this.goodItem[this.tdIndex - 1].images = fileList;
    },
    uploadFile(file) {
      this.uploadForm.append('files', file.file);
    },
    uploadGoodDesc(file) {
      this.uploadForm2.append('files', file.file);
    },
    submitUpload() {
      const conf = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      this.$refs.upload.submit();
      this.$axios({
        method: 'post',
        url: 'http://localhost:9000/file/upload',
        data: this.uploadForm,
        config: conf,
      }).then((res) => {
        console.log(res.data.data);
        if (res.data.code === 2000) {
          res.data.data.forEach((item) => {
            const temp = {
              name: '',
              url: item,
            };
            this.goodItem[this.tdIndex - 1].images.push(temp);
          });
          this.addImagesDialogVisible = false;
          this.submitSuccess();
          console.log('清空uploadForm');
          this.uploadForm = new FormData();
        }
      });
    },
    submitUpload2() {
      const conf = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      this.$refs.upload2.submit();
      this.$axios({
        method: 'post',
        url: 'http://localhost:9000/file/upload',
        data: this.uploadForm2,
        config: conf,
      }).then((res) => {
        console.log(res.data.data);
        if (res.data.code === 2000) {
          res.data.data.forEach((item) => {
            const temp = {
              name: '',
              url: item,
            };
            this.goodDesc.push(temp);
          });
          this.submitSuccess();
        }
      });
    },
    submitSuccess() {
      this.$message({
        type: 'success',
        message: '上传成功',
      });
    },
    addGood() {
      const {
        selectCate, colors, versions, buyWays, goodItem, goodParameters, goodDesc,
      } = this;
      const goods = {
        selectCate,
        colors,
        versions,
        buyWays,
        goodItem,
        goodParameters,
        goodDesc,
      };
      console.log(goods);
      const id = sessionStorage.getItem('bid');
      addGood({
        id, goods,
      }).then((res) => {
        if (res.code === 2000) {
          this.$message({
            type: 'success',
            message: '商品上架成功',
          });
          window.location.reload();
        }
      });
    },
  }
}
</script>

<style scoped>

</style>
