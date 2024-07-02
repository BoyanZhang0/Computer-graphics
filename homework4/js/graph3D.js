//图形类对象数组
var graphList=new Array(0); 
//当前图形对象的数量
var graphNum=0;


//定义Graph类
var Graph = function(graphName) {
  
  //名字,不能重复
  this.name = graphName;
  //基本属性
  this.indices = new Array(0);      // Initialize the property for Indices
  this.colors = new Array(0);   // Initialize the property for Colors
  this.vertices = new Array(0);  // Initialize the property for Vertex
  this.normals = new Array(0);   // Initialize the property for Normal
  this.texCoords = new Array(0);
  
  //变换属性
  this.position=vec3(0,0,0);
  this.scale=vec3(1.0,1,1);
  this.rotation=vec3(0,0,0);
  this.color=vec4(0,0,0,1); //temporarily unused
  this.anchorPoint=vec3(0,0,0);
  this.contentSize=vec3(0,0,0);
  this.transformDirty=true;
   
  //材质属性
  this.materialAmbient = vec4( 0.0, 0.0, 0.0, 1.0 );
  this.materialDiffuse = vec4( 0, 0, 0, 1.0);
  this.materialSpecular = vec4( 0.0, 0.0, 0.0, 1.0 );
  this.materialShininess = 100.0;
  this.materialDirty=true;
  
  //纹理属性
  this.texImg = new Image(); 
  this.texDirty=true;//纹理的脏位
  
  //结构属性
  this.order=0;
  this.ID=graphNum;
  graphNum++;	
  graphList.push(this);
  
  //父子节点关系
  this.parent=null;
  
  //判断obj是否载入完成
  this.ready=true;
  
  
  // addGraphIndex(); 
  console.log("graph create Success!"+"ID:"+this.ID+"Name:"+this.name);
  
}
Graph.prototype.setParent= function(graph)
{
		this.parent=graph;
} 

//设置当前图形的形状（仅限基本形状）
Graph.prototype.setShape= function(shapeID) 
{
		this.ready=true;
		var data=drawCube();
		this.vertices =data[0];
		this.normals =data[1];
		this.indices=data[2];
		this.texCoords=data[3];
		console.log("setShape End");
	
}
//设置当前图形的形状（obj文件导入）
Graph.prototype.setObj= function(fileName,scale,reverse) 
{
		if(!scale){scale=1.0;} 
		if(!reverse){reverse=true;} 
		this.ready=false;
		readOBJFile(fileName,scale,reverse,this.ID);
		setObjCallBack(this.ID);
}
//obj导入回调
function setObjCallBack (graphID)
{
	var i;
	for(i=0;i<g_objDoc.length;i++)
		if(g_objDoc[i].graphID==graphID)
			break;

	if (g_objDoc[i] != null && g_objDoc[i].isMTLComplete())
	{ // OBJ and all MTLs are available
				var drawingInfo = g_objDoc[i].getDrawingInfo();
				//console.log("setObj "+drawingInfo.vertices.length);
				graphList[graphID].vertices=drawingInfo.vertices;
				graphList[graphID].indices=drawingInfo.indices;
				graphList[graphID].normals =drawingInfo.normals;
				graphList[graphID].colors=drawingInfo.colors;
				graphList[graphID].texCoords=drawingInfo.texCoords;
				graphList[graphID].ready=true;

				console.log("setObj End");
				//g_objDoc[i] = null;
				
	}
	else
	{
		console.log("graph"+graphID+"is loading Obj...");
		setTimeout("setObjCallBack("+graphID+")",500);
	}
}

//设置材质
Graph.prototype.setMaterial= function(ambient,diffuse,specular,shininess)
{
	if(!shininess)
		shininess=100;
  this.materialAmbient = ambient;
  this.materialDiffuse = diffuse;
  this.materialSpecular = specular;
  this.materialShininess = shininess;
} 

//预设:石头材质
Graph.prototype.setMaterialofStone= function()
{
  this.materialAmbient = vec4( 0.0, 0.0, 0.0, 1.0 );
  this.materialDiffuse = vec4( 112/255, 128/255, 105/255, 1.0);
  this.materialSpecular = vec4( 0.0, 0.0, 0.0, 1.0 );
  this.materialShininess = 100.0;
} 

//预设：金属材质
Graph.prototype.setMaterialofMetal= function()
{
  this.materialAmbient = vec4( 220/255, 220/255,220/255, 1.0 );
  this.materialDiffuse = vec4( 220/255,230/255,240/255, 1.0);
  this.materialSpecular = vec4( 220/255,230/255,240/255, 1.0 );
  this.materialShininess = 100.0;
} 
//随机材质
Graph.prototype.setMaterialRandom= function()
{
	console.log("233"+Math.random() );
  this.materialAmbient = vec4( Math.random() ,Math.random() ,Math.random() , 1.0 );
  this.materialDiffuse = vec4( Math.random() ,Math.random() ,Math.random() , 1.0);
  this.materialSpecular = vec4( Math.random() ,Math.random() ,Math.random() , 1.0 );
  this.materialShininess = Math.random()*100.0;
} 

//设置图形纹理（图像文件导入）
Graph.prototype.setGraphTextureImg= function(fileName){
	
	this.texImg.src=fileName;
	var image1 = new Image(); 
	image1.src = fileName;
	image1.onload = function() {
		setTexImgCallBack( image1 ); }
	
	


}
//把图像定义为纹理
function setTexImgCallBack( image1 ) {
	for(var i=0;i<graphList.length;i++)
		if(graphList[i].texImg.src==image1.src)
		{
			graphList[i].texImg=image1;
		}
	
	//console.log("img:"+graphList[0].texImg);
}

//设置图形纹理（背景图片）
// Graph.prototype.setGraphTextureBgImg= function(fileName){
// 	var image = document.getElementById("bgImage");
//     configureTexture( image );
// }

//设置图形大小
Graph.prototype.setScale=function(scale)
{
	this.scale=scale;

}
//设置图形旋转度
Graph.prototype.setRotation=function(value)
{
	this.rotation=value;
}
//设置图形位置
Graph.prototype.setPosition=function(position)
{
	this.position=position;

}

//根据图形的名字获取图形
function getGraphByName(graphName){
	for(var i=0;i<graphList.length;i++)
		if(graphList[i].name==graphName)
			return graphList[i];
}

//建立正方体
function drawCube()
 {
    var vertices = [
        vec3( -5, -5,  5 ),
        vec3( -5,  5,  5 ),
        vec3(  5,  5,  5 ),
        vec3(  5, -5,  5 ),
        vec3( -5, -5, -5 ),
        vec3( -5,  5, -5 ),
        vec3(  5,  5, -5 ),
        vec3(  5, -5, -5 )
    ];
	

	var texCoord = [
		vec2(0, 0),
    	vec2(0, 1),
    	vec2(1, 1),
    	vec2(1, 0)
	];
	
	var v=new Array(0);
	var n=new Array(0);
	var vt=new Array(0);
	quad( vertices,texCoord,v,n,vt,1, 0, 3, 2 );
    quad( vertices,texCoord,v,n,vt,2, 3, 7, 6 );
    quad( vertices,texCoord,v,n, vt,3, 0, 4, 7 );
    quad( vertices,texCoord,v,n, vt,6, 5, 1, 2 );
    quad( vertices,texCoord,v,n,vt,4, 5, 6, 7 );
    quad( vertices,texCoord,v,n,vt,5, 4, 0, 1 );
	
	
	var indices=new Array(0);
	for(var i=0;i<v.length;i++)
		indices.push(i);
	return [v,n,indices,vt];
}
//计算法向量
function quad(vertices,texCoord,pointsArray,normalsArray,texCoordsArray,a, b, c, d) {

     var t1 = subtract(vertices[b], vertices[a]);
     var t2 = subtract(vertices[c], vertices[b]);
     var normal = cross(t1, t2);
     var normal = vec3(normal);


     pointsArray.push(vertices[a]);
	 texCoordsArray.push(texCoord[0]);
     normalsArray.push(normal);
     pointsArray.push(vertices[b]);
	 texCoordsArray.push(texCoord[1]);
     normalsArray.push(normal);
     pointsArray.push(vertices[c]);
	 texCoordsArray.push(texCoord[2]);
     normalsArray.push(normal);

	 if(d)
	 {
		 pointsArray.push(vertices[a]);
		 texCoordsArray.push(texCoord[0]);
		 normalsArray.push(normal);
		 pointsArray.push(vertices[c]);
		 texCoordsArray.push(texCoord[2]);
		 normalsArray.push(normal);
		 pointsArray.push(vertices[d]);
		 texCoordsArray.push(texCoord[3]);
		 normalsArray.push(normal);
	 }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////暂时无用代码/////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//设置图形颜色
Graph.prototype.setColor=function (color)
{
	this.color=color;
}

//设置图层顺序
function setOrder(graph,order)
{

	graph.order=order;
}

//设置图形可见性
function setVisible(graph,value)
{
	graph.visible=value;
}




//清空图形列表
function emptyGraphList()
{
	graphList=null;
}

//建立三棱锥
function drawPyramid()
{
	var vertices = [
		vec3(-0.25, 0.25, -0.5),
        vec3( -0.3, 0.3,  -0.4 ),
        vec3( -0.3,  0.2,  -0.4 ),
        vec3( -0.2,  0.3,  -0.4 ),
        vec3( -0.2, -0.2,  -0.4 )
    ];
	var indices = [
    0, 1, 2,
    0, 1, 3,
    0, 1, 4,
    1, 2, 3,
    3, 4, 2
	];
	return [vertices,indices];
}


//建立圆柱体
function drawCylinder()
{
	
}

//绘制球体
function drawSphere()
{
	alert("drawing Sphere...")
	var point_limit=12;//每一层点的数量
	var vertices;
	var theta=2.0*Math.PI/point_limit;
	var x,y,z,r=0;
	var h1=-1;
	alert("theta"+theta);
	for(var i=0;i<point_limit+1;i++ )
	{
		h1+=2.0/(point_limit);
		var r=Math.sqrt(1-h1*h1);
		y=i==0?-1:(2.0*i/(point_limit*1.0)-1.0);
	
		alert("y:"+y);
		alert("r:"+r);
		for(var j=0;j<point_limit;j++)
		{
			
			x=r*Math.cos(theta*j);
			z=r*Math.sin(theta*j);
			if(vertices)
				vertices.push(vec3(x,y,z));
			else
				vertices=[vec3(x,y,z)];
		}
	}
	alert("vertices:"+vertices);
	var indices=[];
	var end=point_limit*(point_limit);
	//var end=point_limit;
	for(var i=0;i<end;i++)
	{	
		var point1=i;
		var point2=(i+1)%point_limit==0?i+1-point_limit:i+1;
		var point3=point1+point_limit;
		var point4=point2+point_limit;
		
		indices.push(point2);//,point1,point3);
		indices.push(point1);
		indices.push(point3);
		indices.push(point3);
		indices.push(point4);
		indices.push(point2);
		//indices.push(point3,point4,point2);
	}
	
	
	return [vertices,indices];
}

//Graph.prototype.setColor=function (color)


/*在索引栏添加图形*/
function addGraphIndex()
{
	var addnewimg=document.getElementById("id-list");
    var a = document.createElement("a");
	
	var num=0;
	if(graphList)
		num=graphList.length;
    a.innerText="Graph"+num; 
	a.addEventListener("click", function(){setIndex(num);});
	//setIndex(num);
    addnewimg.appendChild(a);
}



