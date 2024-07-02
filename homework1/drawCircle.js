var canvas;
var gl;
var vPosition;
var u_transMat;
var u_FragColor;
var redraw = false;
var colors = [
        [1.0, 0.843, 0.0, 1.0], //金黄色
        [1.0, 0.647, 0.0, 1.0], //橙色
        [0.824, 0.412, 0.118, 1.0], //巧克力色
        [0.0, 0.0, 0.0, 1.0] //黑色
    ];
var Tx = 0.0;
var Ty = 0.0;
var Tz = 0.0;//偏移量
var x = 0.0;
var y = 0.0;//拖动的初始位置
var head_if = true;//是否拖动头
var mouth_if = true;//是否拖动嘴
var eye_if = true;//是否拖动眼睛
var jump_if = false;//是否跳跃

var keepX_eye = 0.0;
var keepY_eye = 0.0;

var keepX_head = 0.0;
var keepY_head = 0.0;

var keepX_mouth = 0.0;
var keepY_mouth = 0.0;

// 画圆
// 半径r 面数m 度数c
function getCircleVertex(r, m, c) {
    var arr = [];
    var addAng = c / m;
    var angle = 0;
    for (var i = 0; i < m; i++) {
        arr.push(Math.sin(Math.PI / 180 * angle) * r, Math.cos(Math.PI / 180 * angle) * r, 0, 1.0);
        arr.push(0.0, 0.0, 0.0, 1.0);
        angle = angle + addAng;
        arr.push(Math.sin(Math.PI / 180 * angle) * r, Math.cos(Math.PI / 180 * angle) * r, 0, 1.0);
    }
    return arr;
	}


window.onload = function init () {
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
	
	//菜单的功能
	var m = document.getElementById("mymenu");
    m.addEventListener("click", function() {
        cindex = m.selectedIndex;
	    switch(cindex) {
			case 0:
			    head_if = true;
			    mouth_if = true;
			    eye_if = true;
				break;
			case 1:
		        head_if = true;
		        mouth_if = false;
		        eye_if = false;
				break;
			case 2:
		        head_if = false;
		        mouth_if = false;
		        eye_if = true;
				break;
			case 3:
		        head_if = false;
		        mouth_if = true;
		        eye_if = false;
				break;
	    }
    });
	
	//检测鼠标的拖动
	canvas.addEventListener("mousedown", function(event){
	  if(!redraw) {
		redraw = true;
	    x = event.clientX;
		y = event.clientY;//第一次点击的位置
	  }
    });
    canvas.addEventListener("mouseup", function(event){
      redraw = false;
    });
	canvas.addEventListener("mousemove", function(event){
        if(redraw) {
          var dx = event.clientX - x;
		  var dy = event.clientY - y;//比初次点击移动了多少
		  x = event.clientX;
		  y = event.clientY;
		  Tx += 2*dx/canvas.width;
		  Ty -= 2*dy/canvas.height;//换算成偏移量
		  if(eye_if)
		  {
			  keepX_eye = Tx;
			  keepY_eye = Ty;
		  }
		  if(mouth_if)
		  {
			  keepX_mouth = Tx;
			  keepY_mouth = Ty;
		  }
		  if(head_if)
		  {
			  keepX_head = Tx;
			  keepY_head = Ty;
		  }
      }
    });
	
	    canvas.addEventListener("mouseup", () => {
        isDragging = false;
    });

    // 键盘控制功能
    document.addEventListener("keydown", (e) => {
        switch (e.key) {
            case "ArrowRight":
				keepX_eye += 0.1;
				keepX_mouth += 0.1;
				keepX_head += 0.1;
                break;
            case "ArrowLeft":
				keepX_eye -= 0.1;
				keepX_mouth -= 0.1;
				keepX_head -= 0.1;
                break;
            case "ArrowUp":
				keepY_eye += 0.1;
				keepY_mouth += 0.1;
				keepY_head += 0.1;
				jump_if = true;
                break;
			case "ArrowDown":
				keepY_eye -= 0.1;
				keepY_mouth -= 0.1;
				keepY_head -= 0.1;
                break;
        }

    });
	
    // 设置窗口大小
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    // 初始化着色器
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // 获取vPosition变量的存储位置
    vPosition = gl.getAttribLocation(program, "vPosition");
    if (vPosition < 0) {
        console.log('Failed to get the storage location of vPosition');
        return;
    }

    // 获取u_transMat变量的存储位置
    u_transMat = gl.getUniformLocation(program, "u_transMat");
    if (u_transMat < 0) {
        console.log('Failed to get the storage location of u_transMat');
        return;
    }

    // 获取u_FragColor变量的存储位置
    u_FragColor = gl.getUniformLocation(program, 'u_FragColor');
    if (!u_FragColor) {
        console.log('Failed to get the storage location of u_FragColor');
        return;
    }

    render();	
};


function render() {
	gl.clear( gl.COLOR_BUFFER_BIT );
	
	// 画鸡嘴（三角形）
    var vertices = [
        -0.392, -0.04, 0.0, 1.0,
        -0.42, -0.08, 0.0, 1.0,
        -0.36, -0.08, 0.0, 1.0
    ];
	var mat4 = new Float32Array([
		1.0, 0.0, 0.0, 0.0,
		0.0, 1.0, 0.0, 0.0,
		0.0, 0.0, 1.0, 0.0,
		keepX_mouth, keepY_mouth, 0.0, 1.0
    ]);
	
    var buffer = gl.createBuffer(); // 为顶点创建的缓存
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer); // 绑定缓冲区
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    gl.uniform4f(u_FragColor, colors[1][0], colors[1][1], colors[1][2], colors[1][3]);
    gl.uniformMatrix4fv(u_transMat, false, mat4);

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    // 画鸡头（圆）
    var ms = 180; // 组成圆的划分三角形个数
    var vertices = getCircleVertex(0.1, ms, 360);

	var mat4 = new Float32Array([
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        keepX_head-0.3, keepY_head, 0.0, 1.0
    ]);
	
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW); // 向缓冲区写入顶点数据
    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
    gl.uniform4f(u_FragColor, colors[0][0], colors[0][1], colors[0][2], colors[0][3]);
    gl.uniformMatrix4fv(u_transMat, false, mat4);
    gl.drawArrays(gl.TRIANGLES, 0, ms*3);

    // 画鸡眼睛（圆）
    var vertices = getCircleVertex(0.01, ms, 360);
	
	var mat4 = new Float32Array([
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        keepX_eye-0.35, keepY_eye-0.015, 0.0, 1.0
    ]);

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW); // 向缓冲区写入顶点数据
    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
    gl.uniform4f(u_FragColor, colors[3][0], colors[3][1], colors[3][2], colors[3][3]);
    gl.uniformMatrix4fv(u_transMat, false, mat4);
    gl.drawArrays(gl.TRIANGLES, 0, ms*3);
	
	window.requestAnimFrame(render);
    }