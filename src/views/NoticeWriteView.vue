<template>
    <Header/>
    <Noticewriter/>
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

    window.onload = function(){
        const urlParams = new URLSearchParams(location.search);
        if(pageType == "수정"){
            axios.get("/api/noticeGet.do",{
                params:{
                    id:urlParams.get('id'),
                    resultType:"json"
                }
            })
            .then(function (response) {
                // document.querySelector(".title").value = response.data.root.dataset.rows[0].title
                // document.querySelector(".writer").value = response.data.root.dataset.rows[0].writer
                // document.querySelector(".write_area").value = response.data.root.dataset.rows[0].content
            })
            .catch(function (error) {
                console.log(error);
            });
        }

        // document.querySelector(".notice-ok").addEventListener("click",function(){
            
        //     let params={
        //             title:document.querySelector(".title").value,
        //             writer:document.querySelector(".writer").value,
        //             content:document.querySelector(".write_area").value,
        //             resultType:"json"
        //         }
        //     let url = "noticeSave.do"
        //     if(urlParams.get('id') != null){
        //         params[id] = urlParams.get('id')
        //         url = "noticeUpdate.do"
        //     }
            
        //     axios.get("http://localhost:8081/"+url,{
        //         params:params
        //     })
        //     .then(function (response) {
        //         if(response.data.root.dataset.rows[0].result == 'success'){
        //             alert(response.data.root.dataset.rows[0].result)
        //             location.href = "/noticeList"
        //         }else{
        //             alert(response.data.root.dataset.rows[0].result)
        //             console.log(response.data.root.dataset.rows[0].msg)
        //         }
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
        // })

        // document.querySelector(".notice-cancel").addEventListener("click",function(){
        //     location.href = "/noticeList"
        // })
    }

    
    
</script>

<style scope>
</style>