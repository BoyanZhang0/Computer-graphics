//TODO 在此处添加'绘制物体'的代码
//var graph=new Graph(name); 创建一个名为name的Graph对象
//setObj(filename,scale,reverse);	string 文件名,int 模型比例,bool 是否反转
function initContents(){
	
	//init...
	
		// //绘制60个正方体,组成简易粒子系统
		// for(var i=0;i<60;i++)
		// {
		// var cube=new Graph("cube"+i);
		// cube.setShape(0);//设置为正方体
		// cube.setPosition(vec3(Math.random()*200-100,20,-Math.random()*100));//随机位置
		// var rand=Math.random()*0.3+0.1;
		// cube.setScale(vec3(rand,rand,rand));//随机大小
		// cube.setMaterialRandom();//随机材质
		// //cube.setGraphTextureImg("src/daozhangl.jpg");
		// }
	
		 var bgcube=new Graph("bgcube");//创建背景盒子
		 bgcube.setShape(0);
		 bgcube.setMaterialofMetal();
		 bgcube.setScale(vec3(60,60,60));
		 bgcube.setPosition(vec3(0,200,0));
		 bgcube.setRotation(vec3(0,0,0));
		 bgcube.setGraphTextureImg("src/sky.jpg");

		//草莓
		var berry=new Graph("berry");//创建名为草莓的图形对象
		berry.setObj("src/草莓.obj",0.2,true);//读取obj文件
		berry.setMaterialofMetal();//金属材质？？
		berry.setPosition(vec3(-30,0,30));//设置位置
		berry.setRotation(vec3(0,0,0));//设置旋转
		berry.setGraphTextureImg("src/草莓.png");

		//剑
		//var sword=new Graph("sword");//创建名为sword的图形对象
		//sword.setObj("src/xh.obj",30,true);//读取obj文件
		//sword.setMaterialofMetal();//金属材质
		//sword.setPosition(vec3(30,0,-110));//设置位置
		//sword.setRotation(vec3(0,0,0));//设置旋转
		//sword.setGraphTextureImg("src/xianhe.jpg");

		// //笛子
		//var dizi=new Graph("dizi");//创建名为dizi的图形对象
		//dizi.setObj("src/dizi.obj",0.2,true);//读取obj文件
		//dizi.setMaterialRandom();//金属材质
		//dizi.setPosition(vec3(-40,0,0));//设置位置
		//dizi.setRotation(vec3(0,0,0));//设置旋转
		//dizi.setGraphTextureImg("src/dizi2.jpg");


		//Saber
		//saber模型有问题,必须最后一个定义才不报错。
		 //var saber=new Graph("saber");//创建名为saber的图形对象
		 //saber.setObj("src/daozhang.obj",10.80,true);//读取obj文件
		 //saber.setMaterialofMetal();//石头材质
		 //saber.setRotation(vec3(-45,0,0));//设置旋转
		 //saber.setPosition(vec3(0,-15,0));//设置位置
		// saber.setDaozhangTextrue();
		 //saber.setGraphTextureImg("src/daozhang.jpg");
		
	
		 //dizi.setParent(saber);

}

var posTheta=0;

//TODO 在此处添加'实时更新'的代码
//function getGraphByName(name) 可以根据对象名字返回图形类对象
function updateContents(){
	
	
	//update...
	    //var bgcube=getGraphByName("bgcube");
	    //bgcube.rotation[1]+=0.1;


		//sword旋转
		//var sword=getGraphByName("sword");
		//posTheta+=0.1;
		//sword.position[1]+=Math.sin(posTheta)*0.6;
		//sword.rotation[1]=(sword.rotation[1]+1)%360;


		//var dizi=getGraphByName("dizi");
		//dizi.rotation[1]=(dizi.rotation[1]+1)%360;
		//return;

		// //cube随机旋转
		// for(var i=0;i<60;i++)
		// {
			// var cube=getGraphByName("cube"+i);
			// var rand=Math.floor(Math.random()*3);
			// cube.rotation[rand]=(cube.rotation[rand]+3)%360;
			// cube.position[0]=(cube.position[0]+Math.random()*2+1+150)%300-150;
		// }

		// 'saber'材质不断改变
		//var saber=getGraphByName("sword");
		//for(var i=0;i<3;i++)
			//if(saber.materialSpecular[i]<1)
				//saber.materialSpecular[i]+=0.01;
			//else
				//saber.materialDiffuse[i]+=0.001;

	}

window.addEventListener("keydown",function(){
	//var saber=getGraphByName("saber");
	//var sword=getGraphByName("sword");
	//var bgcube=getGraphByName("bgcube");
	var berry=getGraphByName("berry");

	switch(event.keyCode){
		//dawsqe位移
		case 68:
		//saber.rotation[1]=90;
		berry.position[0]+=2;
		break;
		case 65:
		//saber.rotation[1]=-90;
		berry.position[0]-=2;
		break;
		case 87:
		//saber.rotation[1]=180;
		berry.position[2]-=2;
		break;
		case 83:
		//saber.rotation[1]=0;
		berry.position[2]+=2;
		break;
		case 81:
		berry.rotation[1]-=2;
		break
		case 69:
		berry.rotation[1]+=2;
		break;

        //旋转天空盒
		//90
		//case 57:
		//bgcube.rotation[2]+=2;
		//break;
		//case 48:
		//bgcube.rotation[2]-=2;
		//break;

		//ijkl
		//case 73:
		//sword.position[2]+=2;
		//break;
		//case 74:
		//sword.position[2]-=2;
		//break;
		//case 75:
		//sword.rotation[2]-=2;
		//break
		//case 76:
		//sword.rotation[2]+=2;
		//break;
	}

});