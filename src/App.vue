<template>
<div class="container">
    <OPaginationPC
        :total="totalItems"
        :page-sizes="opageSizes"
        :current-page="ocurrentPage"
        layout="total,sizes,prev,pager,next,slot,jumper"
        :page-size="opageSize"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
    >
        <div class="opagination-slot">
            {{ ocurrentPage }}/{{ Math.ceil(totalItems/opageSize) }}
        </div>
    </OPaginationPC>
</div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { OPaginationPC } from './pagination'

export default defineComponent({
    components: {
        OPaginationPC,
    },
    data() {
        return {
            totalItems: 500, // 总项目数
            opageSize: 10,    // 每页显示的项目数
            ocurrentPage: 1,  // 当前页
            opageSizes: [10, 20, 30, 50], // 每页显示项目数选项
        }
    },
    methods: {
        handleCurrentChange(newPage) {
            this.ocurrentPage = newPage
            // 之后可以处理页码变化后的逻辑

        },
        handleSizeChange(newSize){
            this.opageSize = newSize
            // 之后可以处理每页容量变化后的逻辑
        },
    },
})
</script>

<style lang="scss" scoped>
.container {
    width: 98vw;
    height: 96vh;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5f6f8;
    .opagination-slot {
        font-size: 14px;
        margin: 0 8px;
    }
}
</style>