//灯光的位置与材质
var lightPosition = vec4(100, 400, 200, 0.0 );
var lightAmbient = vec4(1.0, 1.0, 1.0, 1.0 );
var lightDiffuse = vec4( 1.0, 1.0, 1.0, 1.0 );
var lightSpecular = vec4( 1.0, 1.0, 1.0, 1.0 );

//初始化
function initLights()
{
	
}

//实时更新
function updateLights()
{
	//例如:
	// var sword=getGraphByName("sword");
	// //灯光位置随着第一个图形的位置移动
	// lightPosition[0]=100*Math.cos(radians(sword.rotation[2]));
	// lightPosition[2]=100*Math.sin(radians(sword.rotation[2]))+100;
}