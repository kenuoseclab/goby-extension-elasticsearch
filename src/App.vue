<template>
    <el-container>
        <el-header style="height: 40px;">
            <el-input
                    v-model="search"
                    placeholder="输入index名称搜索..."
                    @input="querySearch"
                    clearable>
                <el-button slot="prepend" icon="el-icon-search" style="pointer-events: none;"></el-button>
            </el-input>
        </el-header>
        <el-main style="padding: 0">
            <el-table
                    :data="tableData"
                    v-loading="loading"
                    style="width: 100%">
                <el-table-column
                        prop="index"
                        label="Index">
                </el-table-column>
                <el-table-column
                        prop="count"
                        label="文档数量">
                </el-table-column>
                <el-table-column
                        prop="size"
                        label="占用空间">
                </el-table-column>
            </el-table>
        </el-main>
    </el-container>
</template>

<script>
    import request from "./utils/request";
    export default {
        name: 'App',
        data() {
            return {
                search: '',
                loading: false,
                indices: [],
                tableData: []
            }
        },
        mounted() {
            this.loading = true
            request({
                method: 'get',
                url: 'http://' + this.getIframeQueryString("hostinfo") + "/_cat/indices",
                params: {
                    format: "json"
                }
            }).then(response => {
                this.indices = response.data
                this.querySearch("")
            }).catch(error => {
                this.$message.error(error)
            })
            this.loading = false
        },
        methods: {
            querySearch(queryString) {
                this.loading = true
                this.tableData = []
                for (let i of this.indices) {
                    if (i.index.indexOf(queryString) !== -1) {
                        this.tableData.push({
                            index: i["index"],
                            count: i["docs.count"],
                            size: i["store.size"]
                        })
                    }
                }
                this.loading = false
            },
            getIframeQueryString(name) {
                let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
                let r =window.parent.document.getElementById("goby-iframe").contentWindow.location.search.substr(1).match(reg);
                if (r != null) {
                    return decodeURI(r[2]);
                }
                return null;
            }
        }
    }
</script>

<style>
    body {
        margin: 0;
    }
</style>
