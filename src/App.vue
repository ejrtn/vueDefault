<template>
    <router-view/>
</template>

<script setup>
if(sessionStorage.getItem("id") == null) sessionStorage.setItem("id", 'test'); // 저장
</script>


<style>
html,body,#app{
    height: 100%;
    background-color: #1f1f1f;
}
body{
    margin: 0;
    padding: 0;
}
#app {
}
</style>
