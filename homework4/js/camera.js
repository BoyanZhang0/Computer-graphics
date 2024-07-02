var eye = vec3(0.0, 0.0, 250.0);
var at = vec3(0.0, 0.0, 0.0);
var up = vec3(0.0, 10.0, 0.0);
var fovy = 30.0;
var aspect;
var near = 1.0;
var far = 5000;
var cameraDirty = true;//若以上变量值发生改变,需要把cameraDirty置为true,否则无法显示改变

var rotMat = [
	vec3(1, 0, 0),
	vec3(0, 1, 0),
	vec3(0, 0, 1)
];

var tmpEye = vec3(0, 0, 0); //镜头位置变换中间变量
var tmpAt = vec3(0, 0, 0);	//镜头焦点位置变换中间变量
var sum = 0;	//处理镜头变换速度标量所用到的总量
var speed = Math.PI / 300;	//镜头变换速度

function initCamera() {
	aspect = canvas.width / canvas.height;
	for (var i = Math.PI / 300; i < Math.PI; i = i + Math.PI / 300)
		sum = sum + Math.sin(i);
}

function makeRotmat(phi) {
	console.log("phi ", phi);
	phi = phi * Math.PI / 2 / sum;
	rotMat = [
		vec3(Math.cos(phi), 0, -Math.sin(phi)),
		vec3(0, 1, 0),
		vec3(Math.sin(phi), 0, Math.cos(phi))
	];
}

//变换镜头位置
function changEye() {
	tmpEye = vec3(0, 0, 0);
	for (var i = 0; i < 3; ++i)
		for (var j = 0; j < 3; ++j)
			tmpEye[i] = tmpEye[i] + eye[j] * rotMat[j][i];
	eye = tmpEye;
}

//变换镜头焦点位置
function changAt() {
	tmpAt = vec3(0, 0, 0);
	for (var i = 0; i < 3; ++i)
		for (var j = 0; j < 3; ++j)
			tmpAt[i] = tmpAt[i] + at[j] * rotMat[j][i];
	at = tmpAt;
}

//实时更新
function updateCamera() {

	
	if (speed < Math.PI) {
		makeRotmat(Math.sin(speed));
		changEye();
		//changAt();
		speed = speed + Math.PI / 300;
	}
	if (speed >= Math.PI) {
		speed = Math.PI / 300;
		//cameraDirty = false;
	}
}
