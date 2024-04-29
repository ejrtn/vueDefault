<template>
    <Header/>
    <div class="notice-write">
        <div class="notice-write-conf">
            <div>
                <span>제목 : </span>
                <input type="text" placeholder="제목" class="title">
            </div>
            <div>
                <span>작성자 : </span>
                <input type="text" placeholder="작성자" class="writer">
            </div>
        </div>
        <textarea class="notice-write-text"></textarea>
        <nav>
            <router-link to="/noticeList" class="notice-btn">{{pageType}}</router-link>
            <router-link to="/noticeList" class="notice-btn">취소</router-link>
        </nav>
    </div>
</template>

<script setup>
    import Header from '@/components/Header.vue'
    let pageType = location.search=="" ? "저장" : "수정"
    console.log("http://localhost:8080/noticeGet"+location.search)
</script>

<style scope>
    .notice-write{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column;
        width: 1280px;
        margin: 0 auto;
        margin-top: 40px;
    }
    .notice-write-conf{
        display: flex;
        width: 100%;
        justify-content: space-between;
        font-size: 18px;
        margin-bottom: 5px;
    }
    .notice-write-conf div{
        display: flex;
    }
    .notice-write-conf div input{
        font-size: 18px;
        margin-left: 5px;
    }
    .notice-write-text{
        width: 100%;
        height: 500px;
        resize: none;
        outline: none;
        font-size: 18px;
        padding: 5px;
        box-sizing: border-box;
        overflow-y: auto;
    }
    .notice-btn{
        text-decoration-line: none;
        font-size: 25px;
        width: 200px;
        border: 1px solid #000;
        display: inline-block;
        text-align: center;
        margin: 30px 40px;
        cursor: pointer;
        padding: 10px 20px;
    }
</style>