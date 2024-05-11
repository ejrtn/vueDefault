<template>
    <div class="login-div">
        <div class="login-input-div">
            <span>로그인</span>
            <input type="text" placeholder="로그인" class="id">
        </div>
        <div class="login-input-div">
            <span>비밀번호</span>
            <input type="text" placeholder="비밀번호" class="pw">
        </div>
        <button class="login-ok">로그인</button>
    </div>
</template>

<script setup>
import axios from 'axios';
window.onload = function(){
    
    document.querySelector(".login-ok").addEventListener("click",function(){
        axios.post("/api/login.do",{
            id:document.querySelector(".id").value,
            pw:document.querySelector(".pw").value,
            resultType:"json"
        })
        .then(function (response) {
            if(response.data.root.dataset.rows[0].result == 'success'){
                location.href = "/noticeList"
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    })
}
</script>
<style scoped>
    .login-div{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-flow: column;
        height: 100%;
    }
    .login-div .login-input-div{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 345px;
        height: 60px;
        font-size: 18px;
        margin-bottom: 10px;
    }
    span{
        padding: 0px 5px;
    }
    input{
        font-size: 18px;
        padding: 13px 5px;
        width: 245px;
        border-radius: 10px;
        border: 1px solid #000;
    }
    .login-ok{
        text-decoration-line: none;
        color: #000;
        width: 345px;
        text-align: center;
        padding: 13px 0px;
        border-radius: 10px;
        border: 1px solid #000;
    }
</style>
