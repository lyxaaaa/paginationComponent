<template>
    <div class="container">
        <NewPagination
            :disabled="false"
            :hideOnSinglePage="false"
            :simple="false"
            :total="totalItems"
            :page-sizes="opageSizes"
            :current-page="ocurrentPage"
            :page-size="opageSize"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
        >
        </NewPagination>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { NewPagination } from './pagination'

export default defineComponent({
    components: {
        NewPagination
    },
    data() {
        return {
            totalItems: 500, // 总条目数
            opageSize: 10,    // 每页显示的条目数
            ocurrentPage: 1,  // 当前页
            opageSizes: [10, 20, 30, 50], // 每页显示条目数选项
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
}
</style>