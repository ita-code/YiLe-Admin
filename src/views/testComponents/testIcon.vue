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
const iconEp = `<component :is="useRenderIcon('ep:arrow-left-bold') />`;
const iconAl = `<component :is="useRenderIcon('IF-zhibiaozhuangtai svg', { width: '18px', height: '18px' })" />`;
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <span class="font-medium">图标选择器</span>
      </div>
    </template>
    <IconSelect v-model="icon" class="w-[200px]" />
    <Grid :cols="2" :gap="20">
      <GridItem>
        <el-divider>
          useRenderIcon
          <el-tooltip :content="iconEp" placement="top" effect="light">
            <component :is="useRenderIcon('ep:warning-filled')" />
          </el-tooltip>
        </el-divider>
        <component :is="useRenderIcon('ep:arrow-left-bold')" />
      </GridItem>
      <GridItem>
        <el-divider>
          useRenderIcon
          <el-tooltip :content="iconAl" placement="top" effect="light">
            <component :is="useRenderIcon('ep:warning-filled')" />
          </el-tooltip>
        </el-divider>
        <component :is="useRenderIcon('al-zhibiaozhuangtai svg', { width: '18px', height: '18px' })" />
      </GridItem>
    </Grid>
  </el-card>
</template>
