<template>
    <div class="writer-editor">
        <div class="editor_title_writer">
            <div>
                <label>제목 : </label>
                <input type="text" class="title">
            </div>
            <div>
                <label>작성자 : </label>
                <input type="text" class="writer">
            </div>
        </div>
        <div id="editor-header">
            <img src="../assets/image.png" class="editor-image">
            <img src="../assets/video.png" class="editor-video">
            <!-- <img src="../assets/color.png" class="editor-color"> -->
        </div>
        <div id="editor">
            <div></div>
            <textarea id="editor_text"></textarea>
        </div>
    </div>
    <input type="file" accept="video/*" id="video_file" name="video_file" multiple hidden>
    <input type="file" accept="image/*" id="image_file" name="image_file" multiple hidden>
</template>

<script setup>

    import axios from "axios";
    import { defineProps } from "vue";
    
    const props = defineProps({
        file_upload_url: String
    });
    window.addEventListener('load', function(){
        
        
        editor_text_event();
        document.querySelector(".editor-image").addEventListener("click",function(e){
            document.querySelector("#image_file").click()
        })
        document.querySelector(".editor-video").addEventListener("click",function(e){
            document.querySelector("#video_file").click()
        })

        document.querySelector("#image_file").addEventListener("change",function(event){
            if(props.file_upload_url == null){
                alert("init 함수를 활용해 설정해주세요.")
                return false;
            }
            if(event.target.files.length > 0){
                file_server_push(event.target.files[0],'notice').then(path =>{
                    editor_el_add("<p style='align-items: center;'><img src='/api/getImage.do?type=notice&path="+encodeURI(path.data)+"'></p>")
                })
            }
        })
        document.querySelector("#video_file").addEventListener("change",function(event){
            if(props.file_upload_url == null){
                alert("init 함수를 활용해 설정해주세요.")
                return false;
            }
            if(event.target.files.length > 0){
                file_server_push(event.target.files[0],'notice').then(path =>{
                    editor_el_add("<p style='align-items: center;'><video src='/api/getVideo.do?type=notice&path="+encodeURI(path.data)+"' controls autoplay ></video></p>")
                })
            }
        })

        document.querySelector("#editor div").addEventListener("dblclick",function(e){
            if(e.target.className == "editor_text_label"){
                e.target.parentNode.innerHTML = "<input class='editor_text_input' type='input' value='"+e.target.textContent+"'>"
            }else if(e.target.children[0].className == "editor_text_label"){
                e.target.innerHTML = "<input class='editor_text_input' type='input' value='"+e.target.children[0].textContent+"'>"
            } 
        })
        document.addEventListener("click",function(e){
            if(e.target.className != "editor_text_input" && document.querySelector("#editor div p input") != null){
                document.querySelector("#editor div p input").parentNode.innerHTML = "<label class='editor_text_label'>"+document.querySelector("#editor div p input").value+"</label>"
            }
        })
    })
    
    function editor_text_event(){
        document.querySelector("#editor_text").addEventListener("input",function(e){
            e.target.style.height = 'auto'; //height 초기화
            e.target.style.height = e.target.scrollHeight + 'px';
        })
    }
    function editor_el_add(t){
        let editor_text = document.querySelector("#editor_text").value
        if(editor_text.replaceAll(" ","") != ""){
            for(let i=0;i<editor_text.split("\n").length;i++){
                document.querySelector("#editor div").innerHTML += "<p style='align-items: flex-start;'><label class='editor_text_label'>"+editor_text.split("\n")[i]+"</label></p>"
            }
            document.querySelector("#editor_text").value = ""
        }
        
        document.querySelector("#editor div").innerHTML += t
    }

    function file_server_push(file,type){
        let formData = new FormData(); // formData 객체를 생성한다.
        formData.append('file', file)
        formData.append('type', type)
        return axios.post(props.file_upload_url, formData,{
            header:{"Content-Type": `multipart/form-data`}
        })
    }
</script>

<style scope>
    .writer-editor{
        margin-top: 30px;
    }
    #editor-header{
        width: 930px;
        height: 30px;
        margin: 0 auto;
        border: 1px solid #8e8e8e;
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
        border: 1px solid #8e8e8e;
        margin: 0 auto;
    }
    #editor div{
        overflow-y: auto;
        max-height: 463px;
    }
    #editor p{
        text-align: center;
        display: flex;
        flex-flow: column;
        color: #8e8e8e;
        position: relative;
    }
    #editor p span{
        position: absolute;
        left: 0;
    }
    #editor img{
        height: 100px;
        width: 100px;
    }
    #editor video{
        height: 300px;
        width: 500px;
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
        background-color: #1f1f1f;
        color: #8e8e8e;
    }
    .display-none{
        display: none;
    }
    .editor_title_writer{
        width: 950px;
        display: flex;
        justify-content: space-between;
        color: skyblue;
        margin: 0 auto;
    }
    .editor_title_writer div{
        display: flex;
    }
    .editor_title_writer div label{
        margin-right: 10px;
    }
    .editor_title_writer div input{
        background: #737373;
        border: none;
        outline: none;
        color: skyblue;
    }

    .editor-form{
        display: flex;
        justify-content: center;
    }
    .editor-form .del{
        position: absolute;
        right: 0;
        height: 500px;
        width: 50px;
        display: flex;
        flex-flow: column;
        margin-top: 74px;
    }
    .editor-form .del p{
        margin: 0;
        font-size: 16px;
        font-weight: bold;
        padding: 0;
        text-align: center;
        color: #ff0000;
    }
</style>