<template>
  <el-card>
    <ve-line :data="chartData" :settings="chartSettings"></ve-line>
  </el-card>
</template>

<script>
import { adminChart } from '@/api/admin'
import { getAllCate } from '@/api'

export default {
  data() {
    this.chartSettings = {
      yAxisType: ['0.[00]a', '0.[00]%'],
      axisSite: {
        right: ['下单率']
      },
      yAxisName: ['数值轴', '比率轴']
    }
    return {
      chartData: {
        columns: ['日期', '注册用户', '下单用户', '下单率'],
        rows: [
          { '日期': '4/1', '注册用户': 1393, '下单用户': 1093, '下单率': 0.32 },
          { '日期': '4/2', '注册用户': 3530, '下单用户': 3230, '下单率': 0.26 },
          { '日期': '4/3', '注册用户': 2923, '下单用户': 2623, '下单率': 0.76 },
          { '日期': '4/4', '注册用户': 1723, '下单用户': 1423, '下单率': 0.49 },
          { '日期': '4/5', '注册用户': 3792, '下单用户': 3492, '下单率': 0.323 },
          { '日期': '4/6', '注册用户': 4593, '下单用户': 4293, '下单率': 0.78 }
        ]
      }
    }
  },
  created() {
    let day = this.$moment(this.currentTime(),"YYYY-MM-DD");
    let data={
      date:[]
    }
    data.date.push(this.$moment(day).format('YYYY-MM-DD'))
    for (let i = 1; i < 7; i++) {
      let tmp=day.subtract(1, 'days')
      let tmpDay=this.$moment(tmp).format('YYYY-MM-DD')
      data.date.push(tmpDay)
    }
     adminChart(data).then((res)=>{
       let arr=res.data
       let map = {
         'date': '日期',
         'registers': '注册用户',
         'orders':'下单用户',
         'rate':'下单率'
       }
       arr.forEach((item) => {
         for (let k1 in item) {
           if (item.hasOwnProperty(k1)) {
             item[map[k1]] = item[k1]
             delete item[k1]
           }
         }
       })
       // this.chartData.rows=arr
     })
    this.test()
  },
  methods:{
    currentTime(){
      var now = new Date();
      var year = now.getFullYear();       //年
      var month = now.getMonth() + 1;     //月
      var day = now.getDate();            //日
      var clock = year + "-";
      if(month < 10)
        clock += "0";
      clock += month + "-";
      if(day < 10)
        clock += "0";
      clock += day + " ";
      return(clock);
    },
    test(){
    }
  }
}
</script>
<style scoped>

</style>
