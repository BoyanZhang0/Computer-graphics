var canvas;
var gl;
var program;

var lightObjectPosition = vec4(0.0, 5.0, -10.0, 1.0);//绘制虚拟光源位置
var lightx = 0,lighty = 0,lightz = 0;//光源偏移位置
var lightPosition = lightObjectPosition;//真实光源位置
var lightAmbient = vec4(0.2, 0.2, 0.2, 1.0);//环境光
var lightDiffuse = vec4(1.0, 1.0, 1.0, 1.0);//漫反射光
var lightSpecular = vec4(1.0, 1.0,1.0, 1.0);//镜面反射光

var materialAmbient = vec4(1.0, 0.0, 0.8, 1.0);//环境光材质
var materialDiffuse = vec4(1.0, 0.0, 0.0, 1.0);//漫反射材质
var materialSpecular = vec4(1.0, 1.0, 1.0, 1.0);//镜面反射材质
var materialShininess = 100.0;//镜面反射光强  材料高光系数

var materialAmbient2 = vec4(0.941, 1.0, 1.0, 1.0);//环境光材质2
var materialDiffuse2 = vec4(0.0, 0.0, 0.0, 1.0);//漫反射材质2
var materialSpecular2 = vec4(0.0, 0.0, 0.0, 1.0);//镜面反射材质2
var materialShininess2 = 100.0;//镜面反射光强2 材料高光系数

var normalMatrix, normalMatrixLoc;
var viewMatrix, viewMatrixLoc;

var index1 = 0;//物体1数组下标

var pointsArray = [];//物体1坐标点数组
var indicesArray = [];//物体1的坐标索引
var colorsArray = [];//物体1颜色数组

var pointsArray2 = [];//物体2的坐标点数组
var colorsArray2 = [];//物体2的颜色数组
var indicesArray2 = [];//物体2的坐标索引

var normalsArray = [];//法向量数组1
var normalsArray2 = [];//法向量数组2

//对象1各部件中心点初始位置
var initx1 = 10;
var inity1 = 0;
var initz1 = -10;
var initPositionBodya = vec3(initx1,1.2,initz1-0.3);//身体
var initPositionBut = vec3(initx1,-4.35,initz1-2);///嘴部
var initPositionHead = vec3(initx1,1.1,initz1-3.9);//头
var initPositionEyeBall2 = vec3(initx1-1.8,0.65,initz1-3.7);//右眼球
var initPositionEyeBall1 = vec3(initx1-1.0,-0.5,initz1-3.7);//左眼球
var initPositionTail = vec3(initx1,3.8,initz1-0.1);//尾巴
var initFrameA1 = vec4();



//对象1形变参数
var scale = 1.0;//缩放倍数
var step = vec3(0.0,0.0,0.0);//位移大小

var theta = 0.0;//绕X轴旋转角度
var phi = 0.0;//绕Y轴旋转角度
var gamma = 90.0;//绕Z轴旋转角度


//投影矩阵视区
var near = 0.1;
var far = 100;
var fovy = 90;
var aspect = 1000/700;

//模视矩阵和投影矩阵
var modelViewMatrix;
var modelViewMatrix2;
var modelViewMatrixLoc, projectionMatrixLoc;

//视图矩阵参数
var eye = vec3(0.0,2.3,3.0);
var at = vec3(0.0,1.0,-10.0);
var up = vec3(0.0,1.0,0.0);

//虚拟跟踪球实现参数
var rotationMatrix,rotationMatrix2;//旋转矩阵
var angle = 0.0;//旋转角度
var axis = [0, 0, 1];//旋转轴
var trackingMouse = false;
var trackballMove = false;
var lastPos = [0, 0, 0];
var curx, cury;

//将二维坐标点映射为虚拟跟踪球的三维坐标点	
function trackballView(x, y){
    var d, a;
    var v = [];

    v[0] = x;
    v[1] = y;

    d = v[0]*v[0] + v[1]*v[1];
    if (d < 1.0)
      v[2] = Math.sqrt(1.0 - d);
    else {
      v[2] = 0.0;
      a = 1.0 /  Math.sqrt(d);
      v[0] *= a;
      v[1] *= a;
    }
    return v;
}

//鼠标移动
function mouseMotion(x, y){
    var dx, dy, dz;

    var curPos = trackballView(x, y);
    if(trackingMouse) {
		dx = curPos[0] - lastPos[0];
		dy = curPos[1] - lastPos[1];
		dz = curPos[2] - lastPos[2];

		if (dx || dy || dz) {
			angle = -50 * Math.sqrt(dx*dx + dy*dy + dz*dz);
			axis[0] = lastPos[1]*curPos[2] - lastPos[2]*curPos[1];
			axis[1] = lastPos[2]*curPos[0] - lastPos[0]*curPos[2];
			axis[2] = lastPos[0]*curPos[1] - lastPos[1]*curPos[0];

			lastPos[0] = curPos[0];
			lastPos[1] = curPos[1];
			lastPos[2] = curPos[2];
		}
   }
}

//鼠标按下
function startMotion(x, y){
    trackingMouse = true;
   	curx = x;
	cury = y;

    lastPos = trackballView(x, y);
	trackballMove=true;	
}

//鼠标弹起
function stopMotion(x, y){
	trackingMouse = false;
	trackballMove = false;
}

//视口的调整	
window.onresize = function(){
	var min=window.innerHeight;
	if(window.innerWidth<min){
		min=window.innerWidth;
	}
	if(min<canvas.width||min<canvas.height){
		gl.viewport((canvas.width-min)/2,(canvas.height-min)/2,min,min);
	}else{
		gl.viewport(0, 0, canvas.width, canvas.height );
	}
}

//对象1的建模
function buildObject1(){
	
	var col=0;

	drawSphere(34,2.8,pointsArray,normalsArray,indicesArray,initPositionBodya);//身体
    for(var i=col;i<pointsArray.length;i++)
	{
		colorsArray.push(vec4(0.941,1,1,1));
	}
	col=pointsArray.length;

	drawSphere(34,1.8,pointsArray,normalsArray,indicesArray,initPositionHead);//脑袋
	for(var i=col;i<pointsArray.length;i++)
	{
		colorsArray.push(vec4(1,1,1,1));
	}
	col=pointsArray.length;

    for(var i=col;i<pointsArray.length;i++)
	{
		colorsArray.push(vec4(0.5,0.25,0,1));
	}
	col=pointsArray.length;
	
	//灰白色	
    drawSphere(15,0.20,pointsArray,normalsArray,indicesArray,initPositionEyeBall1);//左眼球
	drawSphere(15,0.20,pointsArray,normalsArray,indicesArray,initPositionEyeBall2);//右眼球
	
	//黑色
	for(var i=col;i<pointsArray.length;i++)
	{
		colorsArray.push(vec4(0,0,0,1));
	}
	col=pointsArray.length;
}

//对象2的建模（同时为光源）
function buildObjectLight(){
	var col=0;
	drawSphere(20,0.3,pointsArray2,normalsArray2,indicesArray2,lightObjectPosition);
	for(var i=col;i<pointsArray2.length;i++)
	{
		colorsArray2.push(vec4(1,1,1,0.5));
	}
}


function loadObject1(){
	for(i=0;i<colorsArray.length;i++){
		colorsArray[i]=mult(lightDiffuse,colorsArray[i]);
	}	
	var nBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, nBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colorsArray), gl.STATIC_DRAW);
    
	var vColor = gl.getAttribLocation(program, "diffuseProduct");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);
	
	var nBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, nBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(normalsArray), gl.STATIC_DRAW);
    
    var vNormal = gl.getAttribLocation(program, "vNormal");
    gl.vertexAttribPointer(vNormal, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray( vNormal);
	
    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW);
    
	var iBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indicesArray), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);
	
}

function loadObject2(){
	for(i=0;i<colorsArray2.length;i++){
		colorsArray2[i]=mult(lightDiffuse,colorsArray2[i]);
	}
	var nBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, nBuffer );
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colorsArray2), gl.STATIC_DRAW);
    
	var vColor3 = gl.getAttribLocation(program, "diffuseProduct" );
    gl.vertexAttribPointer(vColor3, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor3);
	
	var nBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, nBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(normalsArray2), gl.STATIC_DRAW);
    
    var vNormal = gl.getAttribLocation(program, "vNormal");
    gl.vertexAttribPointer(vNormal, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vNormal);
	
    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(pointsArray2), gl.STATIC_DRAW);
	
	var iBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indicesArray2), gl.STATIC_DRAW);
    
    var vPosition3 = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition3, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition3);
}
//事件响应
function actionListener(){
	
	//按钮设置
	document.getElementById("Button1").onclick = function(){
		lightPosition[2]+=1;
		lightz+=1;
    };
	document.getElementById("Button2").onclick = function(){
		lightPosition[2]-=1;
	    lightz-=1;
    };
	document.getElementById("Button3").onclick = function(){
		lightPosition[0]-=1;
        lightx-=1;
    };
	document.getElementById("Button4").onclick = function(){
		lightPosition[0]+=1;
	    lightx+=1;					
    };
	document.getElementById("Button5").onclick = function(){
		lightPosition[1]+=1;
        lighty+=1;
    };
	document.getElementById("Button6").onclick = function(){
		lightPosition[1]-=1;
	    lighty-=1;
    };

	document.getElementById("Button7").onclick = function(){
			scale = 1.0;//缩放倍数
			step = vec3(0.0,0.0,0.0);//初始位移量
			theta = 0.0;//绕X轴旋转角度
			phi = 0.0;//绕Y轴旋转角度
			gamma = 90.0;//绕Z轴旋转角度
			angle = 0.0;
			axis = [0, 0, 1];
			rotationMatrix = mat4();
			controls.step1 = 1.0;
			controls.scale1 = 1.0;
			controls.gamma1 = 90.0;
			controls.phi1 = 0.0;
			controls.theta1 = 0.0;
    };

	//鼠标事件
	 canvas.addEventListener("mousedown", function(event){
      var x = 2*event.clientX/canvas.width-1;
      var y = 2*(canvas.height-event.clientY)/canvas.height-1;
      startMotion(x, y);
	  event.preventDefault();
    },false);

    canvas.addEventListener("mouseup", function(event){
      var x = 2*event.clientX/canvas.width-1;
      var y = 2*(canvas.height-event.clientY)/canvas.height-1;
      stopMotion(x, y);
	  event.preventDefault();
    });
	
	canvas.addEventListener("mouseout", function(event){
      var x = 2*event.clientX/canvas.width-1;
      var y = 2*(canvas.height-event.clientY)/canvas.height-1;
      stopMotion(x, y);
	 event.preventDefault();
    },false);

    canvas.addEventListener("mousemove", function(event){
      var x = 2*event.clientX/canvas.width-1;
      var y = 2*(canvas.height-event.clientY)/canvas.height-1;

      mouseMotion(x, y);
	  event.preventDefault();
    } ,false);

	//键盘事件
	window.addEventListener("keydown",function (event) {
		switch (event.keyCode){
			case 37://左，按键左
				eye[0] += 0.2;
				at[0]+=0.2;
				break;
			case 38://上，按键上
				eye[1] -= 0.2;
				at[1] -=0.2;
				break;
			case 39://右，按键右
				eye[0] -= 0.2;
				at[0] -= 0.2;
				break;
			case 40://下，按键下
				eye[1] += 0.2;
				at[1] +=0.2;
				break;
			case 79://里，按键P
				eye[2] -= 0.2;
				at[2] -= 0.2;
				break;
			case 80://外，按键O
				eye[2] += 0.2;
				at[2]+=0.2;
				break;
		}
	});
}

window.onload = function init(){
    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }	
    gl.clearColor( 0.66, 0.66, 0.66, 1.0 );
    gl.enable(gl.DEPTH_TEST);
	program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program);
	
	ambientProduct = mult(lightAmbient, materialAmbient2);
    specularProduct = mult(lightSpecular, materialSpecular2);

	buildObject1();
	buildObjectLight();
	
	actionListener();
	rotationMatrix=mat4();

	modelViewMatrixLoc = gl.getUniformLocation( program, "modelViewMatrix" );
	projectionMatrixLoc = gl.getUniformLocation( program, "projectionMatrix" );

	gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(perspective( fovy, aspect, near, far)) );
	gl.uniformMatrix3fv(normalMatrixLoc, false, flatten(normalMatrix) );
	
	normalMatrixLoc = gl.getUniformLocation( program, "normalMatrix" );
	viewMatrixLoc=gl.getUniformLocation(program,"viewMatrix");

	//雾化设置
	var u_FogColor = gl.getUniformLocation(program,"FogColor");
	var u_FogDist = gl.getUniformLocation(program,"FogDist");
	gl.uniform3fv(u_FogColor,new Float32Array([0.137,0.231,0.423]));
	gl.uniform2fv(u_FogDist,new Float32Array([5,30]));

	gl.uniform4fv( gl.getUniformLocation(program, 
       "ambientProduct"),flatten(ambientProduct) );
    gl.uniform4fv( gl.getUniformLocation(program, 
       "specularProduct"),flatten(specularProduct) );
    gl.uniform1f( gl.getUniformLocation(program, 
       "shininess"),materialShininess2 );
    render();
	window.onresize();
}

function render(){
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.uniform4fv(gl.getUniformLocation(program,"lightPosition"),flatten(lightPosition) );
	viewMatrix=lookAt(eye,at,up);
	gl.uniformMatrix4fv(viewMatrixLoc, false, flatten(viewMatrix) );
	render1();
	render2();
	window.requestAnimFrame(render);	
}

function render1(){
	loadObject1();
	
	modelViewMatrix=lookAt(eye,at,up);
	var tmp=vec3(-1*initPositionBodya[0],-1*initPositionBodya[1],-1*initPositionBodya[2]);
	var move=vec3(step[0]+initPositionBodya[0],step[1]+initPositionBodya[1],step[2]+initPositionBodya[2]);
	modelViewMatrix=mult(modelViewMatrix,translate(move));

	modelViewMatrix=mult(modelViewMatrix,rotateZ(gamma));
	modelViewMatrix=mult(modelViewMatrix,rotateX(-1*phi));
	modelViewMatrix=mult(modelViewMatrix, rotateY(theta-90));
		
	if(trackballMove) {		
      axis = normalize(axis);
	  rotationMatrix=mult(rotationMatrix, rotate(angle, axis));     
    }
	modelViewMatrix=mult(modelViewMatrix, rotationMatrix);
	modelViewMatrix=mult(modelViewMatrix, scalem( scale,scale,scale ));
	modelViewMatrix=mult(modelViewMatrix, translate(tmp));
	
	normalMatrix = [
        vec3(modelViewMatrix[0][0], modelViewMatrix[0][1], modelViewMatrix[0][2]),
        vec3(modelViewMatrix[1][0], modelViewMatrix[1][1], modelViewMatrix[1][2]),
        vec3(modelViewMatrix[2][0], modelViewMatrix[2][1], modelViewMatrix[2][2])
    ];
	
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
	
	gl.drawElements(gl.TRIANGLES, indicesArray.length, gl.UNSIGNED_SHORT,0);
}

function render2(){
	loadObject2();
	modelViewMatrix2=lookAt(eye,at,up);
	modelViewMatrix2=mult(modelViewMatrix2,translate(lightx,lighty,lightz));
	normalMatrix = [
        vec3(modelViewMatrix2[0][0], modelViewMatrix2[0][1], modelViewMatrix2[0][2]),
        vec3(modelViewMatrix2[1][0], modelViewMatrix2[1][1], modelViewMatrix2[1][2]),
        vec3(modelViewMatrix2[2][0], modelViewMatrix2[2][1], modelViewMatrix2[2][2])
    ];
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix2));
    
    for(var i=0; i<pointsArray2.length; i+=3) 
        gl.drawArrays(gl.TRIANGLES, i, 3);
}
