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
                <button class='search-ok'>확인</button>
            </div>
            <button class="notice-add" onclick="location.href='/noticeWrite'">추가</button>
        </div>
        <table>
            <thead>
                <th>No</th><th>제목</th><th>작성자</th><th>수정날짜</th><th>조회수</th>
            </thead>
            <tbody>
            </tbody>
        </table>
        <div class="page-unit">
            
        </div>
    </div>
</template>

<script setup>
    let tableData;
    let pageNumber;
    let pageTotal;
    let pageUnit;
    let pageFirst;
    let pageEnd;

    import axios from 'axios';
    import { defineProps } from "vue";
    import {onMounted} from 'vue';
    const props = defineProps({
        url: String
    });
    
    onMounted(()=>{
        dataLoad(1);
        document.querySelector(".page-unit").addEventListener("click",function(e){
            if(e.target.tagName=="BUTTON"){
                if(e.target.textContent == "<<") dataLoad(1);
                else if(e.target.textContent == "<") dataLoad(pageFirst-1 < 1 ? 1 : pageFirst-1);
                else if(e.target.textContent == ">") dataLoad(pageEnd+1 > pageTotal ? pageTotal : pageEnd+1);
                else if(e.target.textContent == ">>") dataLoad(pageTotal);
                else dataLoad(e.target.textContent);
            }
        })

        document.querySelector(".table-top button").addEventListener("click",function(){
            dataLoad(1);
        })
    })
    const dataLoad = (num) => {
        let params = {
            pageNumber:num,
            resultType:'json',
        }

        params[
            document.querySelector(".search-text").value.replaceAll(" ","") == '' ? 'all' : document.querySelector(".search-type").value
        ] = document.querySelector(".search-text").value
        
        axios.get(props.url,{
            params:params
        }).then(function (response) {
            if(response.data.root.dataset.rows.length > 0 && response.data.root.dataset.rows[0].result == 'error'){
                console.log(response.data.root.dataset.rows[0].msg)
            }else{
                tableData = response.data.root.dataset.rows
                pageTotal = response.data.root.parameters.pageTotal
                pageUnit = response.data.root.parameters.pageUnit

                pageFirst = num - (num%pageUnit) + 1
                if(pageTotal > num - (num%pageUnit) + pageUnit){
                    pageEnd = parseInt(num - (num%pageUnit) + pageUnit)
                }else{
                    pageEnd = parseInt(pageTotal)
                }
                let tt = "";
                for(let i=pageFirst; i<pageEnd+5;i++){
                    console.log(i)
                    if(i == pageFirst){
                        tt += '<button><<</button>'
                    }
                    else if(i == pageFirst+1){ 
                        tt += '<button><</button>' 
                    }
                    else if(i == pageEnd+3){ 
                        tt += '<button>></button>' 
                    }
                    else if(i == pageEnd+4){ 
                        tt += '<button>>></button>' 
                    }
                    else{ 
                        tt += ('<button>'+(i-1)+'</button>')
                    }
                }
                document.querySelector(".page-unit").innerHTML = tt

                let t = "";
                
                for(let i=0;i<tableData.length;i++){
                    t += "<tr>";
                    t += "<td>"+(i+1)+"</td>"
                    t += "<td><a href='/noticeWrite?id="+tableData[i]["id"]+"' class='notice-change'>"+(tableData[i]["title"]==null ? "" :tableData[i]["title"])+"</a></td>"
                    t += "<td>"+(tableData[i]["writer"]==null ? "" :tableData[i]["writer"])+"</td>"
                    t += "<td>"+(tableData[i]["udate"]==null ? "" :tableData[i]["udate"])+"</td>"
                    t += "<td>"+(tableData[i]["click_cnt"]==null ? "" :tableData[i]["click_cnt"])+"</td>"
                    t += "</tr>";
                    
                }
                for(let i=0;i<20-tableData.length;i++){
                    t += "<tr>";
                    t += "<td></td>"
                    t += "<td></td>"
                    t += "<td></td>"
                    t += "<td></td>"
                    t += "<td></td>"
                    t += "</tr>";
                }
                document.querySelector("tbody").innerHTML = t
                
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }


</script>

<style scope>
    .TableList{
        display: flex;
        align-items: center;
        flex-flow: column;
        margin-top: 40px;
        color:skyblue;
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
    .table-list-search input{

    }
    .search-type, .search-text, .table-list-search{
        font-size: 18px;
        border: none;
        color: skyblue;
    }
    .search-type, .search-text{
        background: #8e8e8e;
    }
    .search-type{
        margin-right: 10px;
    }
    .table-top button{
        background: none;
        border: none;
        font-size: 18px;
        cursor: pointer;
        color: skyblue;
    }
    .TableList table{
        width: 1280px;
        height: 500px;
        border-collapse: collapse;
        border-spacing: 0;
    }
    .TableList table thead th{
        height: 30px;
        border: 1px solid #8e8e8e;
        text-align: center;
    }
    .TableList table tbody tr td{
        height: 22px;
        border: 1px solid #8e8e8e;
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
        border: 1px solid #8e8e8e;
        font-size: 18px;
        margin: 15px 5px;
        color: skyblue;
    }
    .page-unit button:active{
        background: #c8c8c8;
    }
</style>