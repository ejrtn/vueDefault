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
                <tr v-for="(item, index) in tableData " :key="index">
                    <td>{{index+1}}</td>
                    <td><router-link to="/noticeWrite?id=1" class="notice-change">{{item.title}}</router-link></td>
                    <td>{{item.writer}}</td>
                    <td>{{item.udate}}</td>
                    <td>{{item.count_cnt}}</td>
                </tr>
            </tbody>
        </table>
        <div class="page-unit">
            <button v-for="item in pageUnit " :key="item" v-on:click="dataLoad" >{{item}}</button>
        </div>
    </div>
</template>

<script setup>
    import { defineProps } from "vue";

    const props = defineProps({
        url: String
    });
    
    let tableData = []
    for(let i=0; i<20; i++){
        let d = {}
        if(i<=10){
            d["title"] = "title_"+(i+i)
            d["writer"] = "title_"+(i+i)
            d["udate"] = "0000-00-00 00:00:00"
            d["count_cnt"] = (i+i)
        }else{
            d["title"] = ""
            d["writer"] = ""
            d["update"] = ""
            d["count_cnt"] = ""
        }
        tableData.push(d)
    }
    let pageUnitNum = 14
    let pageUnit = []
    for(let i=0; i<pageUnitNum;i++){
        if(i == 0){ pageUnit.push("<<") }
        else if(i == 1){ pageUnit.push("<") }
        else if(i == pageUnitNum-2){ pageUnit.push(">") }
        else if(i == pageUnitNum-1){ pageUnit.push(">>") }
        else{ pageUnit.push(i-1) }
    }

    function dataLoad(e){
        let number = e.target.textContent
        if(number == "<<"){ pageUnit.push(1) }
        else if(number == "<"){ pageUnit.push(2) }
        else if(number == ">"){ pageUnit.push(pageUnitNum-2) }
        else if(number == ">>"){ pageUnit.push(pageUnitNum-1) }
        pageUnit.push(number)
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
        height: 30px;
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