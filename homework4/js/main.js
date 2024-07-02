var gl;
var program;


var g_normalMatrix = new mat4();

//各种观察矩阵
var modelView, projection;
var mvMatrix;
var pMatrix;


//阴影
var shadowMatrix = mat4();

window.onload = function init() {

	initCanvas();
	gl = WebGLUtils.setupWebGL(canvas);
	if (!gl) { console.log("WebGL isn't available"); }

	//  Configure WebGL


	gl.viewport(0, 0, 640, 640);
	gl.enable(gl.DEPTH_TEST);;
	//gl.clearColor( 0.0, 0.0, 0.0, 1.0 );

	//  Load shaders and initialize attribute buffers

	program = initShaders(gl, "vertex-shader", "fragment-shader");
	gl.useProgram(program);

	//TODO 绘制天空盒内容	见skybox.js
	initSkyBox();
	//TODO 绘制场景内容	见content.js
	initContents();
	//TODO 绘制灯光内容	见light.js
	initLights();
	//TODO 绘制照相机	见camera.js
	initCamera();


	//阴影矩阵
	shadowMatrix[3][3] = 0;
	shadowMatrix[3][1] = -1 / lightPosition[1];
	// 绘制
	draw();
	//setTimeout(draw,2000);

};

function draw() {
	//判断是否所有obj文件都已载入
	var ready = true;
	for (var i = 0; i < graphList.length; i++) {
		console.log(graphList[i]);
		if (graphList[i].ready == false) {
			ready = false;
			break;
		}
	}
	//如果已经载入则刷新,否则继续等待
	if (ready) {
		invalidate();
		setTimeout(render, 2000);
	}
	else {
		setTimeout(draw, 2000);
	}
}

// 渲染图形
function render() {

	requestAnimFrame(render);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	//TODO 动画(实时更新)
	updateSkyBox();
	updateContents();
	updateLights();
	updateCamera();

	//传递与场景绑定的uniform变量值
	convertSceneUniformVariable();

	/*逐层渲染*/
	var index = 0;
	for (var i = 0; i < graphList.length; i++) {
		//传递纹理图片
		configureTexture(i);
		//传递与图形绑定的uniform变量
		convertGraphUniformVariable(graphList[i]);
		//index为当前图形的首个顶点索引在数组的位置,num为当前图形的总顶点索引数
		var num = graphList[i].indices.length;
		gl.drawArrays(gl.TRIANGLES, index, num);
		// gl.drawElements( gl.TRIANGLES, num, gl.UNSIGNED_SHORT, index);
		//传递与图形阴影绑定的uniform变量
		convertGraphShadowUniformVariable(graphList[i]);
		gl.drawArrays(gl.TRIANGLES, index, num);
		//gl.drawElements( gl.TRIANGLES, num, gl.UNSIGNED_SHORT, index);
		index += num;
	}
}

//将作用域为'场景'的js变量的值传入uniform限定词变量中
function convertSceneUniformVariable() {

	gl.uniform4fv(gl.getUniformLocation(program, "lightPosition"),
		flatten(lightPosition));

	if (cameraDirty) {
		mvMatrix = lookAt(eye, at, up);
		//fovy, aspect, near, far
		pMatrix = perspective(fovy, aspect, near, far); //采用透视投影
		// projection = ortho(-1, 1, -1, 1, -500, 500);
		projection = mult(pMatrix, mvMatrix);
		gl.uniformMatrix4fv(gl.getUniformLocation(program, "projectionMatrix"),
			false, flatten(projection));
		//cameraDirty = false;
	}


}
//将作用域为'图形'的js变量的值传入uniform限定词变量中
function convertGraphUniformVariable(graph) {


	gl.uniform1i(gl.getUniformLocation(program, "shadow"),
		0);
	if (graph.materialDirty) {
		//传递材质
		var ambientProduct = mult(lightAmbient, graph.materialAmbient);
		var diffuseProduct = mult(lightDiffuse, graph.materialDiffuse);
		var specularProduct = mult(lightSpecular, graph.materialSpecular);
		gl.uniform4fv(gl.getUniformLocation(program, "ambientProduct"),
			flatten(ambientProduct));
		gl.uniform4fv(gl.getUniformLocation(program, "diffuseProduct"),
			flatten(diffuseProduct));
		gl.uniform4fv(gl.getUniformLocation(program, "specularProduct"),
			flatten(specularProduct));
		gl.uniform1f(gl.getUniformLocation(program,
			"shininess"), graph.materialShininess);
		materialDirty = false;
	}




	//节点方式实现层级建模
	var graphParent = graph;

	var transformDirty = false;
	while (graphParent) {
		if (graphParent.transformDirty) {
			transformDirty = true;
			break;
		}
		graphParent = graphParent.parent;
	}
	if (transformDirty) {
		graphParent = graph;
		var pos1 = vec3(0, 0, 0);
		var scale1 = vec3(0, 0, 0);
		var rotation1 = vec3(0, 0, 0);
		while (graphParent) {
			//console.log("init:"+pos1+"pp:"+graph.position);
			pos1[0] += graphParent.position[0];
			pos1[1] += graphParent.position[1];
			pos1[2] += graphParent.position[2];
			scale1[0] += graphParent.scale[0];
			scale1[1] += graphParent.scale[1];
			scale1[2] += graphParent.scale[2];
			rotation1[0] += graphParent.rotation[0];
			rotation1[1] += graphParent.rotation[1];
			rotation1[2] += graphParent.rotation[2];
			graphParent = graphParent.parent;
			//console.log("parentB:"+graphParent);
		}
	}


	//传递模视矩阵	
	modelView = mat4();
	modelView = mult(modelView, translate(pos1[0], pos1[1], pos1[2]));
	modelView = mult(modelView, scalem(scale1[0], scale1[1], scale1[2]));
	modelView = mult(modelView, rotate(rotation1[0], [1, 0, 0]));
	modelView = mult(modelView, rotate(rotation1[1], [0, 1, 0]));
	modelView = mult(modelView, rotate(rotation1[2], [0, 0, 1]));
	//modelView=mult(modelView,translate(graph.position[0],graph.position[1],graph.position[2]));
	gl.uniformMatrix4fv(gl.getUniformLocation(program,
		"modelViewMatrix"), false, flatten(modelView));



	//传递归一化矩阵
	g_normalMatrix = inverse(modelView);
	g_normalMatrix = transpose(g_normalMatrix);
	gl.uniformMatrix4fv(gl.getUniformLocation(program, "normalMatrix"),
		false, flatten(g_normalMatrix));
	gl.uniform4fv(gl.getUniformLocation(program, "lightPosition"),
		flatten(lightPosition));

}

function convertGraphShadowUniformVariable(graph) {



	modelView = mat4();
	modelView = mult(modelView, translate(lightPosition[0], lightPosition[1], lightPosition[2]));
	modelView = mult(modelView, shadowMatrix);
	modelView = mult(modelView, translate(-lightPosition[0], -lightPosition[1],
		-lightPosition[2]));

	gl.uniform1i(gl.getUniformLocation(program, "shadow"),
		1);
	gl.uniformMatrix4fv(gl.getUniformLocation(program,
		"modelViewMatrix"), false, flatten(modelView));
}



// 刷新,即重新绘制
function invalidate() {
	console.log("begin");


	//最终的顶点与顶点颜色数组
	var vertexColors = new Array(0);
	var vertices = new Array(0);
	var normals = new Array(0);
	var indices = new Array(0);
	var texCoords = new Array(0);
	var curIndicesNum = 0;
	//console.log(graphList.length);
	for (var i = 0; i < graphList.length; i++) {
		var gra = graphList[i];
		curIndicesNum = indices ? indices.length : 0;

		for (var j = 0; j < gra.indices.length; j++) {
			var indice = gra.indices[j] + curIndicesNum;
			indices.push(indice);
		}

		for (var j = 0; j < gra.vertices.length; j++) {

			var vertice;
			vertice = gra.vertices[j];
			if (Array.isArray(vertice)) {
				vertices.push(vertice[0]);
				vertices.push(vertice[1]);
				vertices.push(vertice[2]);
			}
			else
				vertices.push(vertice);

		}

		for (var j = 0; j < gra.colors.length; j++) {
			vertexColors.push(graphList[i].colors[j]);
		}

		for (var j = 0; j < gra.normals.length; j++) {
			var normal;
			normal = gra.normals[j];
			if (Array.isArray(normal)) {
				normals.push(normal[0]);
				normals.push(normal[1]);
				normals.push(normal[2]);
			}
			else
				normals.push(normal);

		}

		// 纹理坐标
		for (var j = 0; j < gra.texCoords.length; j++) {
			var texCoord;
			texCoord = gra.texCoords[j];
			if (Array.isArray(texCoord)) {
				texCoords.push(texCoord[0]);
				texCoords.push(texCoord[1]);
			}
			else
				texCoords.push(texCoord);

		}
	}

	//console.log("indices: length:"+indices);
	//console.log("vertices: length:"+vertices);


	// array element buffer
	//索引数组
	var iBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);


	//本次不需要传颜色
	// color array atrribute buffer

	// var cBuffer = gl.createBuffer();
	// gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
	// gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexColors), gl.STATIC_DRAW);

	// var vColor = gl.getAttribLocation(program, "vColor");
	// gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
	// gl.enableVertexAttribArray(vColor);

	//顶点数组
	var vbuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vbuffer);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

	var vPosition = gl.getAttribLocation(program, "vPosition");
	gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(vPosition);


	//法向量数组
	var nbuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, nbuffer);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(normals), gl.STATIC_DRAW);
	var vNormal = gl.getAttribLocation(program, "vNormal");
	gl.vertexAttribPointer(vNormal, 3, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(vNormal);

	//纹理坐标数组
	var tBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, tBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(texCoords), gl.STATIC_DRAW);
	var vTexCoord = gl.getAttribLocation(program, "vTexCoord");
	gl.vertexAttribPointer(vTexCoord, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(vTexCoord);

	var texture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, texture);
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB,
		gl.RGB, gl.UNSIGNED_BYTE, graphList[0].texImg);
	gl.generateMipmap(gl.TEXTURE_2D);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,
		gl.NEAREST_MIPMAP_LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

	//渲染
	render();
	console.log("ok!");
}


//传递纹理图片
function configureTexture(graphID) {
	//判断是否有必要传递
	if (!graphList[graphID].texDirty)
		return;
	graphList[graphID].texDirty = true;

	//传递
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB,
		gl.RGB, gl.UNSIGNED_BYTE, graphList[graphID].texImg);
	gl.generateMipmap(gl.TEXTURE_2D);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,
		gl.NEAREST_MIPMAP_LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	gl.uniform1i(gl.getUniformLocation(program, "texture"), 0);
}

