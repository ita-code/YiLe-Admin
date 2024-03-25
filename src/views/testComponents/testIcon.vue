<script setup lang="ts">
import { ref } from "vue";
import { IconSelect } from "@/components/Icon";
import Grid from "@/components/Grid/index.vue";
import GridItem from "@/components/Grid/components/GridItem.vue";

import { useRenderIcon } from "@/components/Icon/src/hooks";

defineOptions({
  name: "IconSelect"
});

const icon = ref("ep:add-location");
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <span class="font-medium">图标案例演示</span>
      </div>
    </template>
    <IconSelect v-model="icon" class="w-[400px]" />
    <Grid :cols="2" :gap="20">
      <GridItem :span="2">
        <el-divider> 阿里系图片渲染 </el-divider>
      </GridItem>
      <GridItem>
        <el-divider> FontIcon/svg </el-divider>
        <FontIcon width="18px" height="18px" icon="zhibiaozhuangtai" :svg="true" />
        {{ `<FontIcon width="18px" height="18px" icon="zhibiaozhuangtai" :svg="true" />` }}
      </GridItem>
      <GridItem>
        <el-divider> FontIcon/icon </el-divider>
        <FontIcon style="font-size: 18px" icon="icon-suoxiao" />
        {{ `<FontIcon style="font-size: 18px" icon="icon-suoxiao" />` }}
      </GridItem>
      <GridItem>
        <el-divider> useRenderIcon: svg </el-divider>
        <component :is="useRenderIcon('al-zhibiaozhuangtai svg', { width: '18px', height: '18px' })" />
        {{ `<component :is="useRenderIcon('al-zhibiaozhuangtai svg', { width: '18px', height: '18px' })" />` }}
      </GridItem>
      <GridItem>
        <el-divider> useRenderIcon: icon </el-divider>
        <component :is="useRenderIcon('al-icon-suoxiao')" style="font-size: 18px" />
        {{ `<component :is="useRenderIcon('al-icon-suoxiao')" style="font-size: 18px" />` }}
      </GridItem>
      <GridItem :span="2">
        <el-divider> Element Plus </el-divider>
      </GridItem>
      <GridItem>
        <el-divider> useRenderIcon: ep:arrow-left-bold </el-divider>
        <component :is="useRenderIcon('ep:arrow-left-bold')" />
        {{ `<component :is="useRenderIcon('ep:arrow-left-bold')" />` }}
      </GridItem>
    </Grid>
  </el-card>
</template>
