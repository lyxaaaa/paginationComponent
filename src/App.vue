<template>
<div class="container">
    <OPagination
        :total="totalItems"
        :page-sizes="opageSizes"
        :current-page="ocurrentPage"
        layout="sizes,prev,pager,next,jumper"
        :page-size="opageSize"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
    >
    </OPagination>
</div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import OPagination from './pagination'

export default defineComponent({
    components: {
        OPagination,
    },
    data() {
        return {
            totalItems: 500, // 总项目数
            opageSize: 10,    // 每页显示的项目数
            ocurrentPage: 1,  // 当前页
            opageSizes: [10, 20, 30], // 每页显示项目数选项
        }
    },
    methods: {
        handleCurrentChange(newPage) {
            this.ocurrentPage = newPage
            // 在这里可以处理页码变化后的逻辑

        },
        handleSizeChange(newSize){
            this.opageSize = newSize
            console.log(newSize)
        }
    },
})
</script>

<style lang="scss" scoped>
.container {
    width: 100vw;
    height: 60vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5f6f8;
}
</style>