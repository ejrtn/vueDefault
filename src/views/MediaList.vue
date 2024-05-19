<template>
    <Header/>
    <div>
        <div class="media-header">
            <div>폴더 목록</div>
            <div>
                <div>
                    <label>경로 : </label><label></label>
                </div>
                파일 목록
            </div>
        </div>
        <div class="media-list">
            <div class="folder-list">
                <ul class="tree">
                    <li>
                        <input type="checkbox" id="root">
                        <label for="root"><img src="../assets/folder.png">media</label>
                        <ul>
                            <li>
                                <input type="checkbox" id="node1">
                                <label for="node1"><img src="../assets/folder.png">images</label>
                                <ul>
                                    <li>
                                        <input type="checkbox" id="node21">
                                        <label for="node21" class="lastTree" id="images-notice"><img src="../assets/folder.png">notice</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="node21">
                                        <label for="node21" class="lastTree" id="images-english"><img src="../assets/folder.png">english</label>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <input type="checkbox" id="node2">
                                <label for="node2"><img src="../assets/folder.png">videos</label>
                                <ul>
                                    <li>
                                        <input type="checkbox" id="node21">
                                        <label for="node21" class="lastTree" id="videos-notice"><img src="../assets/folder.png">notice</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="node21">
                                        <label for="node21" class="lastTree" id="videos-english"><img src="../assets/folder.png">english</label>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="file-list"></div>
        </div>
    </div>
</template>

<script setup>
    import Header from '@/components/Header.vue'
    import axios from 'axios';
    import { onMounted } from "vue";

    onMounted(()=>{
        fileLoad("image","notice")
        document.querySelector(".tree").addEventListener("click",function(e){
            if(e.target.id == "images-notice"){
                fileLoad("image","notice")
            }else if(e.target.id == "images-english"){
                fileLoad("image","english")
            }else if(e.target.id == "videos-notice"){
                fileLoad("video","notice")
            }else if(e.target.id == "videos-english"){
                fileLoad("video","english")
            }
        })
    })
    
    function fileLoad(path, type){
        axios.post("/api/fileList.do",{
            path: path,
            type: type
        }).then((res)=>{
            // console.log(res.data)
            if(res.data != ""){
                let fileList = res.data.split("\n")
                let t = ""
                for(let i=0;i<fileList.length;i++){
                    t += "<div><img class='"+path+"' src='"+require('@/assets/'+path+'.png')+"' ><label>"+fileList[i]+"</label></div>"
                }
                document.querySelector(".file-list").innerHTML = t
            }else{
                document.querySelector(".file-list").innerHTML = ""
            }
            document.querySelectorAll(".media-header div")[1].querySelectorAll("div label")[1].textContent = '/'+path+"/"+type+"/"
        })
    }
</script>

<style>
    .media-header{
        display: flex;
        justify-content: center;
        margin-top: 50px;
        color: skyblue;
        font-weight: bold;
        font-size: 18px;
    }
    .media-header div:nth-child(1){
        width: 200px;
    }
    .media-header div:nth-child(2){
        width: 750px;
        display: flex;
        justify-content: space-between;
    }
    .media-list{
        display: flex;
        height: 500px;
        justify-content: center;
    }
    .folder-list{
        width: 200px;
        background: #828282;
        border-right: 1px solid black;
    }
    .file-list{
        width: 740px;
        height: 490px;
        background: #828282;
        padding: 5px;
        overflow: auto;
    }
    .file-list img{
        margin-right: 5px;
        height: 20px;
    }
    .file-list div{
        margin-bottom: 15px;
        display: flex;
        align-items: center;
    }
    .file-list div label{
        white-space: nowrap;
    }

    .tree{
        margin-top: 5px;
        list-style: none; /* 기본 리스트 스타일 제거 */
        padding-left:10px;
    }
    .tree img{
        height: 25px;
        margin-right: 5px;
    }
    .tree ul{
        list-style: none; /* 기본 리스트 스타일 제거 */
        padding-left:20px;
    }
    .tree *:before{
        width:15px;
        height:15px;
        display:inline-block;
    }
    .tree label{
        cursor: pointer;
        font-family: NotoSansKrMedium, sans-serif !important;
        font-size: 14px;
        color: #0055CC;
        display: flex;
        align-items: center;
        font-size: 18px;
        margin-bottom: 5px;
    }
    .tree label:hover{
        color: #00AACC;
    }
    /* .tree label:before{
        content: ''
    }
    .tree label.lastTree:before{
        content:'';
    }
    .tree label:hover:before{
        content: ''
    }
    .tree label.lastTree:hover:before{
        content:'';
    } */
    .tree input[type="checkbox"] {
        display: none;
    }
    .tree input[type="checkbox"]:checked~ul {
        display: none;
    }
    /* .tree input[type="checkbox"]:checked+label:before{
        content: ''
    }
    .tree input[type="checkbox"]:checked+label:hover:before{
        content: ''
    }

    .tree input[type="checkbox"]:checked+label.lastTree:before{
        content: '';
    }
    .tree input[type="checkbox"]:checked+label.lastTree:hover:before{
        content: '';
    } */
</style>