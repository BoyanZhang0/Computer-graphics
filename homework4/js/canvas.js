var canvas; 
function initCanvas(){
	canvas= document.getElementById( "gl-canvas" );
}


function showallcanvascolor() {
    document.getElementById("all-canvas-color").style.display="inline";
}

function showallfacecolor() {
    document.getElementById("all-face-color").style.display="inline";
}


//调整画布颜色
function changecanvascolor(index) {
    var cvs=document.getElementById("gl-canvas");
    var r=document.getElementById("id-canvas-color-r").value/1;
    var g=document.getElementById("id-canvas-color-g").value/1;
    var b=document.getElementById("id-canvas-color-b").value/1;
    var a=document.getElementById("id-canvas-color-a").value/1;
    switch (index) {
        case 1:
            cvs.style.background = "white";
            break;
        case 2:
            cvs.style.background = "black";
            break;
        case 3:
            cvs.style.background = "grey";
            break;
        case 4:
            cvs.style.background = "pink";
            break;
        case 5:
            cvs.style.background = "#BBFFBB";
            break;
        case 6:
            cvs.style.background = "#81C0C0";
            break;
        case 7:
            cvs.style.background = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
            break;
        default:
            break;
    }
}

//调整画布尺寸
function changecanvassize() {
     var cvs=document.getElementById("gl-canvas");
     var cvsc=document.getElementById("id-canvascontainer");
     var w=document.getElementById("id-canvas-width").value/1;
     var h=document.getElementById("id-canvas-height").value/1;
     cvs.style.width=w+"px";
     cvsc.style.width=w+"px";
     cvs.style.height=h+"px";
     cvsc.style.height=h+"px";
}