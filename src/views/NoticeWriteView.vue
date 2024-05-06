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
        <div>
            <button class="notice-ok notice-btn">{{pageType}}</button>
            <button class="notice-cancel notice-btn">취소</button>
        </div>
    </div>
</template>

<script setup>
    import axios from 'axios';
    import Header from '@/components/Header.vue'
    import { defineProps } from "vue";
    const props = defineProps({
        url: String
    });
    let pageType = location.search=="" ? "저장" : "수정"

    window.onload = function(){
        const urlParams = new URLSearchParams(location.search);
        if(pageType == "수정"){
            axios.get("http://localhost:8081/noticeGet.do",{
                params:{
                    id:urlParams.get('id'),
                    resultType:"json"
                }
            })
            .then(function (response) {
                document.querySelector(".title").value = response.data.root.dataset.rows[0].title
                document.querySelector(".writer").value = response.data.root.dataset.rows[0].writer
                document.querySelector(".notice-write-text").value = response.data.root.dataset.rows[0].content
            })
            .catch(function (error) {
                console.log(error);
            });
        }

        document.querySelector(".notice-ok").addEventListener("click",function(){
            
            let params={
                    title:document.querySelector(".title").value,
                    writer:document.querySelector(".writer").value,
                    content:document.querySelector(".notice-write-text").value,
                    resultType:"json"
                }
            let url = "noticeSave.do"
            if(urlParams.get('id') != null){
                params[id] = urlParams.get('id')
                url = "noticeUpdate.do"
            }
            
            axios.get("http://localhost:8081/"+url,{
                params:params
            })
            .then(function (response) {
                if(response.data.root.dataset.rows[0].result == 'success'){
                    alert(response.data.root.dataset.rows[0].result)
                    location.href = "/noticeList"
                }else{
                    alert(response.data.root.dataset.rows[0].result)
                    console.log(response.data.root.dataset.rows[0].msg)
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        })

        document.querySelector(".notice-cancel").addEventListener("click",function(){
            location.href = "/noticeList"
        })
    }

    
    
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