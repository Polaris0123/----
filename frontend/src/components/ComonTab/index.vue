<template>
    <div class="tags">
     <!--使用el-tag，for循环遍历 tagList（也是一个保存路由信息的数组）在下面定义-->
      <!--closable表示是否可以移除，如果这个页面的name是home就不可以移除-->
      <!--effect表示颜色，如果当前路由和item的name一致，那么表示当前显示的页面就是这个tag对应的，让他高亮-->
      <el-tag
        v-for="(item, index) in tagList"
        :key="item.name"
        :closable="item.name != 'home'"
        :disable-transitions="false"
        :effect="route.name == item.name ? 'dark' : 'plain'"
        @click="changeMenu(item)"
        @close="deleteMenu(item, index)"
      >
      <!--click和close方法，就是点击和关闭时的方法，需要传递item进去-->
        {{ item.name }}
      </el-tag>
    </div>
  </template>
  
  <script setup>
  import { useStore } from "vuex";
  import { useRoute, useRouter } from "vue-router";
  import { computed, ref } from "vue";
  let store = useStore();
  let route = useRoute();
  let router = useRouter();
  //tagList 我们选择保存在vux中，因为需要多个组件联调
  let tagList = store.state.tabList;
  //当点击时触发changeMenu方法
  let changeMenu = (item) => {
    //会触发一个store的selectMenu(之前定义过)方法，把item传进去，也就是tag对应的路由信息
    store.commit("selectMenu", item);
    //然后跳转到item保存的path中
    router.push({
      path: item.path,
    });
  };
  //当点击关闭时触发deleteMenu 方法
  let deleteMenu = (item, index) => {
     //会触发一个store的deleteMenu方法，把item传进去，这个方法会删除taglist对应的元素
    store.commit("deleteMenu", item);
    //下面是处理关闭后tag和面包屑的显示，有两种情况一种是删除的是最后一个元素（这元素也有两种情况如果删除的是当前页面和不是当前页面），第二种是不是最后一个元素（这个也有两种情况，如果删除的是当前页面，和不是当前页面）
    
    //注意index是点击时的索引，此时taglist中已经删除了此元素
    //那么如果这个index等于taglist的长度，那么就说明他是之前的最后一个，如果他还当前页面--index，然后调到前一个页面
    if (index == tagList.length) {
      if(item.name==route.name){
      store.commit("selectMenu", tagList[--index]);
      router.push({
        path: tagList[index].path,
      });
      }
    } else {
    //那么如果不是最后一个，如果删除后，判断是当前页面，删除后调到后面一个页面中，如果不是当前页面，则不变
        if(item.name==route.name){
      store.commit("selectMenu", tagList[index]);
      router.push({
        path: tagList[index].path,
      });
      }
    }
  };
  </script>
  
  <style lang="less" scoped>
  .tags {
    width: 100%;
    margin-bottom: 30px;
    .el-tag {
      margin-right: 10px;
    }
  }
  </style>
  
  