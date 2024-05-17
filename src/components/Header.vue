<template>
    <header>
        <h1>TEST</h1>
        <nav>
            <router-link class="header-menu" to="/noticeList">NOTICE</router-link>
            <router-link class="header-menu" to="/workEn">WORD-EN</router-link>
            <router-link class="header-menu" to="#">MENU1</router-link>
            <router-link class="header-menu" to="#">MENU1</router-link>
        </nav>
        <div class="user-info">
            user
            <div>
                <router-link class="path" v-if="user" to="/">login</router-link>
                <router-link class="path" v-else to="/">logout</router-link>
                <router-link class="path" to="#">info</router-link>
            </div>
        </div>
    </header>
</template>

<script setup>
    let user = false
    const logLogin = () =>{
        location.href = "/"
    }
</script>

<style scope>
    header{
        color: skyblue;
        width: 100%;
        height: 85px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0px 20px 0px 10px;
        box-sizing: border-box;
        font-weight: bold;
    }
    h1{
        font-size: 40px;
        font: bold;
        cursor: pointer;
        flex-shrink: 0;
    }
    nav{
        display: flex;
        justify-content: space-evenly;
        width: 100%;
    }
    .header-menu{
        font-size: 18px;
        text-decoration-line: none;
        padding: 10px 50px;
        border: 1px solid #8e8e8e;
        color: skyblue;
    }
    .user-info{
        border-radius: 50%;
        border: 1px solid #8e8e8e;
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-bottom: 5px;
        box-sizing: border-box;
        flex-shrink: 0;
        position: relative;
    }
    .user-info div{
        position: absolute;
        list-style-type: none;
        font-size: 18px;
        color: black;
        display: none;
        padding: 0;
        padding-top: 139px;
        flex-flow: column;
        z-index: 10;
    }
    .user-info:hover div{
        display: flex;
    }
    .user-info div:hover{
        display: flex;
    }
    .user-info div .path{
        text-decoration-line: none;
        cursor: pointer;
        padding: 8px 10px;
    }
    .user-info div .path:hover{
        color: blue;
    }
</style>