
var index=0;


// 动态增加
function addimg() {



	var g=createGraph();

	invalidate();
	updateData();
}

function setIndex(num)
{
	
	index=num;
	var a=document.getElementById("num");
	a.innerText="Graph"+num;
	updateData();
	
	
}
function updateData()
{
	var r=document.getElementById("color-r-id");
	var g=document.getElementById("color-g-id");
	var b=document.getElementById("color-b-id");
	var a=document.getElementById("color-a-id");
	var x=document.getElementById("id-face-x");
	var y=document.getElementById("id-face-y");
	var o=document.getElementById("id-face-o");
	var sx=document.getElementById("id-face-sx");
	var sy=document.getElementById("id-face-sy");
	var rot=document.getElementById("id-face-r");
	var v=document.getElementById("id-face-v");
	graph=getChosenGraph();
	r.value=graph.color[0];
	g.value=graph.color[1];
	b.value=graph.color[2];
	a.value=graph.color[3];
	x.value=graph.position[0]*100;
	y.value=graph.position[1]*100;
	o.value=graph.order;
	sx.value=graph.scale[0]*10;
	sy.value=graph.scale[1]*10;
	rot.value=graph.rotation;
	v.checked=!graph.visible;
}
function getChosenGraph()
{

	for(var i=0;i<graphList.length;i++)
	{
		if(graphList[i].ID==index)
			return graphList[i];
	}
}
function getChosenGraphID()
{

	for(var i=0;i<graphList.length;i++)
	{
		if(graphList[i].ID==index)
			return i;
	}
}
function onShape(shapeID)
{
	var graph=getChosenGraph();
	setShape(graph,shapeID);
	invalidate();
}

function onColor(color)
{

	var graph=getChosenGraph();
	setColor(graph,color);
	invalidate();
	updateData();
}

function onColorDetail()
{
	 var r=document.getElementById("color-r-id").value;
	 var g=document.getElementById("color-g-id").value;
	 var b=document.getElementById("color-b-id").value;
	 var a=document.getElementById("color-a-id").value;
	 onColor(vec4(r,g,b,a));
	 
}

function onPosition()
{
	var graph=getChosenGraph();
	var x=document.getElementById("id-face-x").value/100;
	var y=document.getElementById("id-face-y").value/100;
	//alert("12:"+x+"  "+y);
	setPosition(graph,x,y);

	invalidate();
}

function onOrder()
{
		var graph=getChosenGraph();
	var o=document.getElementById("id-face-o").value;
	setOrder(graph,o);
	invalidate();
	
}

function onScale()
{
		var graph=getChosenGraph();
	var sx=document.getElementById("id-face-sx").value;
	var sy=document.getElementById("id-face-sy").value;
	setScale(graph,vec2(sx,sy));
	invalidate();
}

function onRotation()
{
		var graph=getChosenGraph();
	var r=document.getElementById("id-face-r").value;
	setRotation(graph,r);
	invalidate();
}

function onVisible()
{
	alert("123");
		var graph=getChosenGraph();
	var v=document.getElementById("id-face-v").checked;
	
	
	setVisible(graph,!v);
	invalidate();
}



function runAnime(type,direction)
{
	animeID=type*10+direction;
}