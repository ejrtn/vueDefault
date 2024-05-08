<template>
    <div class="writer-header">
        <img src="../assets/img.png">
        <img src="../assets/video.png">
        <div class="writer-color">
            <img src="../assets/color.png">
            <div id="js-picker" class="colorPicker">
                <div class="twod">
                    <div class="twod-pointer">
                        <div class="twod-shape"></div>
                    </div>
                    <div class="bg"></div>
                </div>
                <div class="oned">
                    <div class="oned-pointer" style="top: 10px;">
                    </div>
                    <div class="bg"></div>
                </div>
                <div class="extras">
                    <div class="currentColorContainer">
                        <div class="currentColor" style="background: rgb(166, 163, 202);"></div>
                    </div>
                    <div class="hex">
                        <label>#</label>
                        <input type="text" maxlength="7">
                    </div>
                    <div class="colorFields">
                        <div class="color r">
                            <label>r</label>
                            <input type="text" maxlength="3">
                        </div>
                        <div class="color g">
                            <label>g</label>
                            <input type="text" maxlength="3">
                        </div>
                        <div class="color b">
                            <label>b</label>
                            <input type="text" maxlength="3">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="write_area" class="write_area" contenteditable="true" ondragenter="return false;" ondrop="return false;" ondragover="return false;"></div>
</template>

<script setup>
    import html2canvas from 'html2canvas';

    let twod = false;
    let oned = false;
    window.onload = function(){
        let num = 11
        let r = 255
        let g = 255
        let b = 255

        // for(let y=0; y<128; y++){
        //     document.querySelector(".twod .bg").innerHTML += "<div style='display:flex;width:100%;height:2px;' class='x_line_"+y+"'></div>"
        //     for(let x=256;x>-1;x--){
        //         color_ui(255,x,x,y);
        //         x -= 1;
        //     }
        // }

        for(let i=0;i<290;i++){
            if(i < num*1){
                document.querySelector(".oned .bg").innerHTML += '<div style="background:rgb('+102+','+0+','+0+'); width:100%; height:1px;"></div>';
            }else if(i < num*2){
                document.querySelector(".oned .bg").innerHTML += '<div style="background:rgb('+153+','+0+','+0+'); width:100%; height:1px;"></div>';
            }else if(i < num*3){
                document.querySelector(".oned .bg").innerHTML += '<div style="background:rgb('+204+','+0+','+0+'); width:100%; height:1px;"></div>';
            }else if(i < num*4){
                document.querySelector(".oned .bg").innerHTML += '<div style="background:rgb('+255+','+0+','+0+'); width:100%; height:1px;"></div>';
            }
            else if(i < num*5){
                document.querySelector(".oned .bg").innerHTML += '<div style="background:rgb('+r+','+51+','+0+'); width:100%; height:1px;"></div>';
            }else if(i < num*6){
                document.querySelector(".oned .bg").innerHTML += '<div style="background:rgb('+r+','+102+','+0+'); width:100%; height:1px;"></div>';
            }else if(i < num*7){
                document.querySelector(".oned .bg").innerHTML += '<div style="background:rgb('+r+','+153+','+0+'); width:100%; height:1px;"></div>';
            }else if(i < num*8){
                document.querySelector(".oned .bg").innerHTML += '<div style="background:rgb('+r+','+204+','+0+'); width:100%; height:1px;"></div>';
            }else if(i < num*9){
                document.querySelector(".oned .bg").innerHTML += '<div style="background:rgb('+r+','+255+','+0+'); width:100%; height:1px;"></div>';
            }

            else if(i < num*10){
                document.querySelector(".oned .bg").innerHTML += '<div style="background:rgb('+0+','+255+','+0+'); width:100%; height:1px;"></div>';
            }else if(i < num*11){
                document.querySelector(".oned .bg").innerHTML += '<div style="background:rgb('+0+','+204+','+0+'); width:100%; height:1px;"></div>';
            }else if(i < num*12){
                document.querySelector(".oned .bg").innerHTML += '<div style="background:rgb('+0+','+153+','+0+'); width:100%; height:1px;"></div>';
            }else if(i < num*13){
                document.querySelector(".oned .bg").innerHTML += '<div style="background:rgb('+0+','+102+','+0+'); width:100%; height:1px;"></div>';
            }else if(i < num*14){
                document.querySelector(".oned .bg").innerHTML += '<div style="background:rgb('+0+','+51+','+0+'); width:100%; height:1px;"></div>';
            }
            else if(i < num*15){
                document.querySelector(".oned .bg").innerHTML += '<div style="background:rgb('+0+','+0+','+51+'); width:100%; height:1px;"></div>';
            }else if(i < num*16){
                document.querySelector(".oned .bg").innerHTML += '<div style="background:rgb('+0+','+0+','+102+'); width:100%; height:1px;"></div>';
            }else if(i < num*17){
                document.querySelector(".oned .bg").innerHTML += '<div style="background:rgb('+0+','+0+','+153+'); width:100%; height:1px;"></div>';
            }else if(i < num*18){
                document.querySelector(".oned .bg").innerHTML += '<div style="background:rgb('+0+','+0+','+204+'); width:100%; height:1px;"></div>';
            }else if(i < num*19){
                document.querySelector(".oned .bg").innerHTML += '<div style="background:rgb('+0+','+0+','+255+'); width:100%; height:1px;"></div>';
            }
            else if(i < num*20){
                document.querySelector(".oned .bg").innerHTML += '<div style="background:rgb('+0+','+51+','+255+'); width:100%; height:1px;"></div>';
            }else if(i < num*21){
                document.querySelector(".oned .bg").innerHTML += '<div style="background:rgb('+0+','+102+','+255+'); width:100%; height:1px;"></div>';
            }else if(i < num*22){
                document.querySelector(".oned .bg").innerHTML += '<div style="background:rgb('+0+','+153+','+255+'); width:100%; height:1px;"></div>';
            }else if(i < num*23){
                document.querySelector(".oned .bg").innerHTML += '<div style="background:rgb('+0+','+204+','+255+'); width:100%; height:1px;"></div>';
            }else if(i < num*24){
                document.querySelector(".oned .bg").innerHTML += '<div style="background:rgb('+0+','+255+','+255+'); width:100%; height:1px;"></div>';
            }
        }

        document.querySelector(".twod").addEventListener("mousemove",function(e){
            if(twod && e.target.className != 'twod-shape' && e.target.className != 'twod-pointer' ){

                twodCheck(e.offsetY,e.offsetX)
                document.querySelector(".twod-pointer").style.top = (e.offsetY-7)+"px"
                document.querySelector(".twod-pointer").style.left = (e.offsetX-7)+"px"
                
            }
        })

        document.querySelector(".oned").addEventListener("mousemove",function(e){
            // console.log(e.target.classList)
            if(oned  && e.target.className != 'oned-pointer' && e.target.className ==''){
                console.log(e.target.style.backgroundColor)
                document.querySelector(".twod").style.backgroundColor = e.target.style.backgroundColor
                document.querySelector(".oned-pointer").style.top = (e.layerY)+"px";
            }
        })

        document.body.addEventListener("mouseup",function(){
            twod = false;
            oned = false;
        })
        document.querySelector(".twod").addEventListener("mousedown",function(){
            twod = true;
        })
        document.querySelector(".twod").addEventListener("mouseup",function(){
            twod = false;
        })

        document.querySelector(".oned").addEventListener("mousedown",function(){
            oned = true;
        })
        document.querySelector(".oned").addEventListener("mouseup",function(){
            oned = false;
        })
    }

    function color_ui(r,g,b,y) {
        document.querySelector(".twod .bg .x_line_"+y).innerHTML += '<div style="width:2px;height:2px;background:rgb('+r+','+g+','+b+')"></div>'
    }
</script>

<style scope>
    .main{
        display: flex;
        width: 100%;
    }

    .writer-header{
        width: 100%;
        margin-top: 30px;
        display: flex;
    }

    .writer-header .writer-color{
        position: relative;
    }
    
    
    .writer-header img{
        height: 50px;
        margin: 0px 10px;
        cursor: pointer;
    }

    .write_area{
        width: 100%;
        height: 500px;
        resize: none;
        outline: none;
        font-size: 18px;
        padding: 5px;
        box-sizing: border-box;
        overflow-y: auto;
        border: 1px solid black;
    }

    .colorPicker {
        width: 518px;
        height: 265px;
        display: flex;
        border: 1px solid black;
        padding: 10px;
    }

    .colorPicker .twod {
        position: relative;
        border-radius: 3px;
        width: 256px;
        height: 256px;
    }

    .colorPicker .twod .bg {
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 3px;
    }

    .colorPicker .twod .bg1 {
        z-index: 0;
    }

    .colorPicker .twod .twod-pointer {
        position: absolute;
        z-index: 2;
        width: 11px;
        height: 11px;
        background-color: #fff;
        border-radius: 9px;
        padding: 2px;
    }

    .colorPicker .twod .twod-pointer .twod-shape {
        width: 5px;
        height: 5px;
        border: 3px solid #000;
        border-radius: 9px;
    }

    .colorPicker .oned {
        width: 12.5%;
        padding: 0 1.5em;
        float: left;
        border-radius: 3px;
        position: relative;
    }

    .colorPicker .oned .bg {
        width: 100%;
        border-radius: 3px
    }

    .colorPicker .oned .oned-pointer {
        position: absolute;
        width: 67px;
        margin-left: -6px;
        margin-top: -4px;
        height: 2px;
        border: 3px solid #3f3844;
        -moz-border-radius: 3px;
        border-radius: 3px;
        z-index: 2;
    }

    .colorPicker .extras {
        position: relative;
        width: 106px;
        height: 242px;
        float: left;
        border-radius: 3px;
        border-right: 1px solid #eaeaea;
        border-left: 1px solid #eaeaea;
        border-bottom: 1px solid #eaeaea;
        flex-shrink: 0;
        color: #c3c3c3;
        font-weight: 600;
    }

    .colorPicker .extras .currentColorContainer {
        margin: 0px 0px 30px 0px;
    }

    .colorPicker .extras .currentColor {
        cursor: pointer;
        height: 86px;
        margin-left: -1px;
        border-top-right-radius: 3px;
        border-top-left-radius: 3px;
    }

    .colorPicker .extras div.hex,.colorPicker .extras div.colorFields {
        padding-bottom: 10px;
    }
    .colorPicker .extras div.hex,.colorPicker .extras div.colorFields .color {
        margin-bottom: 10px;
    }

    .colorPicker .extras label,.colorPicker .extras input {
        font-family: "proxima-soft", "Proxima Soft", "Proxima Nova Soft", Helvetica, Arial, sans-serif;
        font-style: normal;
        text-transform: uppercase;
        font-size: 14px;
        font-size: 15px;
    }

    .colorPicker .extras label {
        padding-right: 10px;
        
    }

    .colorPicker .extras input {
        width: 80px;
        border: none;
        font-weight: 700;
        border-radius: 3px;
        border: 1px solid white;
        background-color: transparent;
        display: none;
    }

</style>