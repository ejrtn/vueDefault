<template>
    <Header/>
    <TableList url="http://localhost:8081/noticeList.do"/>
</template>


<script setup>
// @ is an alias to /src
import TableList from '@/components/TableList.vue'
import Header from '@/components/Header.vue'
</script>
