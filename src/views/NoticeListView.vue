<template>
    <Header/>
    <TableList url="/api/noticeList.do"/>
</template>


<script setup>
import Header from '@/components/Header.vue'
import TableList from '@/components/TableList.vue'
</script>
