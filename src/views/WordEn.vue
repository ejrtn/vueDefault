<template>
    <Header/>
    <div class="word-en-main">
        <img src="">
        <div class="word-text">
            <input type="text">
            <button>확인</button>
        </div>
        <div class="word-hint">
            <label class="hint">hint :</label>
            <label class="hint-text"></label>
        </div>
    </div>
</template>

<script setup>
    import axios from 'axios';
    import Header from '@/components/Header.vue'
    import { onMounted } from "vue";
    let size = 1;

    onMounted(()=>{
        imageRandomName();

        document.querySelector(".word-text button").addEventListener("click",function(){
            let alt = document.querySelector("img").alt.split("")
            let text = ""
            for(let i=0;i<size;i++){
                text += alt[i]
            }
            document.querySelector(".hint-text").textContent = text
            size += 1;
            if(size > alt.length){
                size = alt.length
            }

            if(document.querySelector("img").alt == document.querySelector(".word-text input").value){
                imageRandomName();
                document.querySelector(".word-text input").textContent = ""
                document.querySelector(".hint-text").textContent = ""
            }
        })
    })
    function imageRandomName(){
        axios.get("/api/imageRandomName.do",{
            params:{type:'english'}
        }).then(res=>{
            document.querySelector("img").src = "/api/getImage.do?type=english&path="+encodeURI(res.data)
            let alt = ""
            for(let i=0;i<res.data.split(".").length-1;i++){
                alt += res.data.split(".")[i]
            }
            document.querySelector("img").alt = alt
        })
    }
</script>

<style>
    .word-en-main{
        margin-top: 30px;
        display: flex;
        flex-flow: column;
        align-items: center;
    }
    
    .word-en-main img{
        width: 620px;
        height: 400px;
    }

    .word-en-main .word-text{
        display: flex;
        margin-top: 20px;
        width: 311px;
    }
    .word-en-main .word-text input{
        background: #8e8e8e;
        border: none;
        outline: none;
        color: skyblue;
        /* margin-right: 10px; */
        font-size: 20px;
        padding: 5px;
        margin-right: 5px;
    }
    .word-en-main .word-text button{
        background: none;
        border: none;
        outline: none;
        color: skyblue;
        cursor: pointer;
        font-size: 20px;
        
    }

    
    .word-en-main .word-hint{
        display: flex;
        margin-top: 5px;
        color: skyblue;
        width: 311px;
    }
    .word-en-main .word-hint .hint{
        margin-right: 5px;
    }
</style>