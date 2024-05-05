<template>
    <div class="TableList">
        <div class="table-top">
            <div class="table-list-search">
                <select class="search-type">
                    <option value="title">제목</option>
                    <option value="writer">작성자</option>
                    <option value="all">전체</option>
                </select>
                <input type="text" class="search-text">
                <button>확인</button>
            </div>
            <button class="notice-add" onclick="location.href='/noticeWrite'">추가</button>
        </div>
        <table>
            <thead>
                <th>No</th><th>제목</th><th>작성자</th><th>수정날짜</th><th>조회수</th>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                    <td><router-link to="/noticeWrite?id=1" class="notice-change"></router-link></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </table>
        <div class="page-unit">
        </div>
    </div>
</template>

<script setup>
    import axios from 'axios';
    import { defineProps } from "vue";
    const props = defineProps({
        url: String
    });
    // console.log(props.url+"?pageNumber=1&resultType=json")
    
    window.onload = function(){
        dataLoad(1);
    }
    function dataLoad(num){

        console.log(num)
        axios.get(props.url+"?pageNumber="+num+"&resultType=json")
        .then(function (response) {
            console.log(response.data);
            let tableData = response.data.root.dataset.rows
            table_ui(tableData)
            let pageTotal = response.data.root.parameters.pageTotal
            let pageUnit = response.data.root.parameters.pageUnit

            let pageFirst;
            if(pageUnit <= 10){
                pageFirst = 1
            }else{
                pageFirst = (pageUnit - (pageUnit%10)) -1;
            }
            let pageEnd;
            if(pageUnit == pageTotal){
                pageEnd = pageUnit;
            }else{
                pageEnd = (pageUnit - (pageUnit%10)) + 10;
            }
            page_ui(pageUnit)


            
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    function table_ui(tableData){
        let t = ""
        for(let i=0;i<tableData.length;i++){
            t += "<tr>";
            t += "<td>"+(i+1)+"</td>"
            t += "<td><router-link to='/noticeWrite?id=1' class='notice-change'>"+(tableData[i]["title"]==null ? "" :tableData[i]["title"])+"</router-link></td>"
            t += "<td>"+(tableData[i]["writer"]==null ? "" :tableData[i]["writer"])+"</td>"
            t += "<td>"+(tableData[i]["udate"]==null ? "" :tableData[i]["udate"])+"</td>"
            t += "<td>"+(tableData[i]["click_cnt"]==null ? "" :tableData[i]["click_cnt"])+"</td>"
            t += "</tr>";
        }

        document.querySelector("tbody").innerHTML = t
    }
    function page_ui(pageUnit){
        document.querySelector(".page-unit").innerHTML = ""
        for(let i=0; i<pageUnit+4;i++){
            if(i == 0){ 
                document.querySelector(".page-unit").innerHTML += '<button onclick="dataLoad"><<</button>'
            }
            else if(i == 1){ 
                document.querySelector(".page-unit").innerHTML += '<button on:click="dataLoad">></button>' 
            }
            else if(i == pageUnit+2){ 
                document.querySelector(".page-unit").innerHTML += '<button on:click="dataLoad">></button>' 
            }
            else if(i == pageUnit+3){ 
                document.querySelector(".page-unit").innerHTML += '<button on:click="dataLoad">>></button>' 
            }
            else{ 
                document.querySelector(".page-unit").innerHTML += ('<button on:click="dataLoad">'+(i-1)+'</button>')
            }
        }
    }

</script>

<style scope>
    .TableList{
        display: flex;
        align-items: center;
        flex-flow: column;
        margin-top: 40px;
    }
    .table-top{
        height: 35px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 1280px;
        position: relative;
    }
    .table-list-search{
        display: flex;
        margin-bottom: 15px;
    }
    .search-type, .search-text, .table-list-search{
        font-size: 18px;
        
    }
    .search-type{
        
    }
    .search-text{
        margin-right: 10px;
    }
    .table-top button{
        background: none;
        border: 1px solid #000;
        font-size: 18px;
    }
    .TableList table{
        width: 1280px;
        height: 500px;
        border-collapse: collapse;
        border-spacing: 0;
    }
    .TableList table thead th{
        height: 30px;
        border: 1px solid black;
        text-align: center;
    }
    .TableList table tbody tr td{
        border: 1px solid black;
        text-align: center;
    }
    .TableList table tbody tr td:nth-child(1){
        width: 30px;
    }
    .TableList table tbody tr td:nth-child(4){
        width: 200px;
    }
    .TableList table tbody tr td:nth-child(5){
        width: 70px;
    }
    .TableList table tbody tr td .notice-change{
        color: #0000ff;
        text-decoration-line: none;
        cursor: pointer;
    }
    .notice-add{
        position: absolute;
        right: 0px;
        cursor: pointer;
    }

    .page-unit button{
        cursor: pointer;
        background: none;
        border: 1px solid #000;
        font-size: 18px;
        margin: 15px 5px;
    }
    .page-unit button:active{
        background: #c8c8c8;
    }
</style>