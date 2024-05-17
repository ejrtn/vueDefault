<template>
    <Header/>
    <Noticewriter file_upload_url='/api/fileUpload.do'/>
    <div class="notice_write_result">
        <button class="notice-ok">{{pageType}}</button>
        <button class="notice-cancel">취소</button>
    </div>
</template>

<script setup>
    import axios from 'axios';
    import Header from '@/components/Header.vue'
    import Noticewriter from '@/components/Noticewriter.vue'
    import { defineProps } from "vue";

    const props = defineProps({
        url: String
    });
    let pageType = location.search=="" ? "저장" : "수정"
    let mediaIng = []

    window.onload = function(){
        document.querySelector(".writer").value = sessionStorage.getItem("id")

        const urlParams = new URLSearchParams(location.search);
        if(pageType == "수정"){
            axios.get("/api/noticeGet.do",{
                params:{
                    id:urlParams.get('id'),
                    resultType:"json"
                }
            })
            .then(function (response) {
                document.querySelector(".title").value = response.data.root.dataset.rows[0].title
                document.querySelector(".writer").value = response.data.root.dataset.rows[0].writer
                document.querySelector("#editor div").innerHTML = response.data.root.dataset.rows[0].content

                let editor = document.querySelectorAll("#editor div p")

                for(let i=0;i<editor.length;i++){
                    if(editor[i].childNodes[0].tagName == "IMG" || editor[i].childNodes[0].tagName == "VIDEO"){
                        mediaIng.push(editor[i].childNodes[0].src)
                    }
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }

        

        document.querySelector(".notice-ok").addEventListener("click",function(){
            if(document.querySelector(".title").value.replaceAll(" ","") == ""){
                alert("제목 입력해주세요.");
                return false;
            }
            if(document.querySelector(".writer").value.replaceAll(" ","") == ""){
                alert("작성자 입력해주세요.");
                return false;
            }

            let editor_text = document.querySelector("#editor_text").value
            if(editor_text.replaceAll(" ","") != ""){
                for(let i=0;i<editor_text.split("\n").length;i++){
                    document.querySelector("#editor div").innerHTML += "<p style='align-items: flex-start;'><label class='editor_text_label'>"+editor_text.split("\n")[i]+"</label></p>"
                }
            }

            let notice = {
                'title' : document.querySelector(".title").value,
                'writer' : document.querySelector(".writer").value,
                'content' : document.querySelector("#editor div").innerHTML.replaceAll('"',"'"),
                'resultType' : 'json',
            }
            let url = "noticeSave.do"
            if(urlParams.get('id') != null){
                notice["id"] = urlParams.get('id')
                url = "noticeUpdate.do"
            }
            axios.post("/api/"+url,JSON.stringify(notice),{
                headers: {
                    "Content-Type": `application/json`,
                },
            })
            .then(function (response) {
                if(response.data.root.dataset.rows[0].result == 'success'){
                    alert(response.data.root.dataset.rows[0].result)
                    location.href = "/noticeList"
                }else{
                    alert(response.data.root.dataset.rows[0].result)
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        })

        document.querySelector(".notice-cancel").addEventListener("click",function(){
            if(pageType == "저장"){
                let srcs = ""
                let editor = document.querySelectorAll("#editor div p")
                for(let i=0;i<editor.length;i++){
                    if(editor[i].childNodes[0].tagName == "IMG" || editor[i].childNodes[0].tagName == "VIDEO"){
                        srcs += decodeURI(editor[i].childNodes[0].src).replace("http://localhost:8080/api/","")
                    }
                    if(i != editor.length-1){
                        srcs += '\n'
                    }
                }

                axios.post('/api/fileDelete.do',{
                    srcs:srcs,
                    type:'notice'
                }).then(res=>{
                    location.href = '/noticeList'
                })
            }else{
                let srcs = ""
                let editor = document.querySelectorAll("#editor div p")
                for(let i=0;i<editor.length;i++){
                    if(editor[i].childNodes[0].tagName == "IMG" || editor[i].childNodes[0].tagName == "VIDEO"){
                        let ch = 0;
                        for(let x=0;x<mediaIng.length;x++){
                            if(mediaIng[x] == editor[i].childNodes[0].src){
                                ch = 1;
                            }
                        }
                        if(ch == 0){
                            srcs += decodeURI(editor[i].childNodes[0].src).replace("http://localhost:8080/api/","")
                            if(i != editor.length-1){
                                srcs += '\n'
                            }
                        }   
                    }
                }
                axios.post('/api/fileDelete.do',{
                    srcs:srcs,
                    type:'notice'
                }).then(res=>{
                    location.href = '/noticeList'
                })
                location.href = '/noticeList'
            }
        })
    }
    

    function init(){
        let editor = document.querySelectorAll("#editor div p")
        for(let i=0;i<editor.length;i++){
            if(editor[i].childNodes[0].tagName == "IMG" || editor[i].childNodes[0].tagName == "VIDEO"){
                mediaIng.push(decodeURI(editor[i].childNodes[0].src).replace("http://localhost:8080/api/",""))
            }
        }
    }
</script>

<style scope>
    .notice_write_result{
        width: 950px;
        margin: 0 auto;
        text-align: center;
    }

    .notice_write_result button{
        background: none;
        padding: 10px;
        border: none;
        color: skyblue;
        cursor: pointer;
        text-align: center;
        font-size: 30px;
        font-weight: 500;
        margin: 0px 67px;
    }

</style>