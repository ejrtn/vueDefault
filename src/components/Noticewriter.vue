<template>
    <div id="editor-header">
        <img src="../assets/image.png" class="editor-image">
        <img src="../assets/video.png" class="editor-video">
        <img src="../assets/color.png" class="editor-color">
    </div>
    <div id="editor">
        <div></div>
        <textarea id="editor_text"></textarea>
    </div>
    <input type="file" accept="video/*" id="select_video_file" class="display-none" multiple>
    <input type="file" accept="image/*" id="select_image_file" class="display-none" multiple>
</template>

<script setup>
    import axios from "axios";

    window.onload = function(){
        editor_text_event();
        document.querySelector(".editor-image").addEventListener("click",function(e){
            document.querySelector("#select_image_file").click()
        })
        document.querySelector(".editor-video").addEventListener("click",function(e){
            document.querySelector("#select_video_file").click()
        })

        document.querySelector("#select_image_file").addEventListener("change",function(){
            file_server_push(this.files[0])
            let t;
            const reader = new FileReader();
            reader.onload = (e) => {
                t = '<p><img src="'+e.target.result+'"></p>'
                editor_el_add(t)
            };
            reader.readAsDataURL(this.files[0]);
            
            
        })
        document.querySelector("#select_video_file").addEventListener("change",function(){
            file_server_push(this.files[0])
            let t;
            const reader = new FileReader();
            reader.onload = (e) => {
                t = '<video src="'+e.target.result+'">'
                editor_el_add(t)
            };
            
            
            reader.readAsDataURL(this.files[0]);
        })
    }
    
    function editor_text_event(){
        document.querySelector("#editor_text").addEventListener("input",function(e){
            e.target.style.height = 'auto'; //height 초기화
            e.target.style.height = e.target.scrollHeight + 'px';
        })
    }
    function editor_el_add(t){
        document.querySelector("#editor div").innerHTML += t
    }

    function file_server_push(file){
        let formData = new FormData(); // formData 객체를 생성한다.
        formData.append("file", file)
        axios.post('/api/fileUpload.do',formData,{
            header:{
                'Content-Type':'multipart/form-data'
            }
        })
        .then((res) => {
            console.log(res);
        });
    }
</script>

<style scope>
    #editor-header{
        width: 930px;
        height: 30px;
        margin: 0 auto;
        border: 1px solid black;
        border-bottom: none;
        padding: 10px;
    }
    #editor-header img{
        height: 100%;
        margin-right: 20px;
        cursor: pointer;
    }
    #editor{
        width: 950px;
        height: 500px;
        margin: 0 auto;
        border: 1px solid black;
    }
    #editor p{
        text-align: center;
    }
    #editor img{
        height: 100px;
        width: 100px;
    }
    #editor video{
        height: 100px;
        width: 100px;
    }
    #editor p{
        margin: 0;
        padding: 0;
    }
    #editor textarea{
        width: 100%;
        border: none;
        outline: none;
        resize: none;
        margin: 0;
        padding: 0;
        font-size: 16px;
    }
    .display-none{
        display: none;
    }
</style>