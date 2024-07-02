"use strict";

var canvas;
var gl;
var pd=false
var numVertices  =378;
var rotate = false;
var rotateLoc;
var xStart,yStart;
var xEnd,yEnd;
var rotateByMouse;
var theta3 = [0,0,0];
var axis = 0;
var xAxis = 0;
var yAxis =1;
var zAxis = 2;
var axis1 = 0;
var x1Axis = 0;
var y1Axis =1;
var z1Axis = 2;
var  sudu1;
var theta = [ 0, 0, 0 ];
var theta1 = [ 0, 0, 0 ];
var thetaLoc;
var thetaLoc1;
var sudu;
var Zoom = [1];
var zoom;
var constsd=1;
var move=[0,0,0];
var theta3Loc;
var movet
var glo=[0,0,0];
var glot;
var vertices = [
    vec3( -0.2, -0.2,  0.2 ),
    vec3( -0.2,  0.5,  0.2 ),
    vec3(  0.2,  0.5,  0.2 ),
    vec3(  0.2, -0.2,  0.2 ),
    vec3( -0.2, -0.2, -0.2 ),
    vec3( -0.2,  0.5, -0.2 ),
    vec3(  0.2,  0.5, -0.2 ),
    vec3(  0.2, -0.2, -0.2 ),//7脸

    vec3( -0.3, -0.6,  0.3 ),
    vec3( -0.3,  -0.1,  0.3 ),
    vec3(  0.3,  -0.1,  0.3 ),
    vec3(  0.3, -0.6,  0.3 ),
    vec3( -0.3, -0.6, -0.7 ),
    vec3( -0.3,  -0.1, -0.7 ),
    vec3(  0.3,  -0.1, -0.7 ),
    vec3(  0.3, -0.6, -0.7 ),//15身子

    vec3( 0.7,0.15,0),
    vec3( 0.2,-0.5,0),//17右耳朵

    vec3(-0.7,0.15,0),
    vec3(-0.2,-0.5,0),//19左耳朵


    vec3(-0.15,0.35,0.20001),
    vec3(-0.11,0.38,0.20001),
    vec3(-0.11,0.32,0.20001),//22左眼睛1

    vec3(-0.05,0.35,0.20001),
    vec3(-0.09,0.38,0.20001),
    vec3(-0.09,0.32,0.20001),//25左眼睛2


    vec3(0.15,0.35,0.20001),
    vec3(0.11,0.38,0.20001),
    vec3(0.11,0.32,0.20001),//28右眼睛1

    vec3(0.05,0.35,0.20001),
    vec3(0.09,0.38,0.20001),
    vec3(0.09,0.32,0.20001),//31右眼睛2

    vec3(-0.6,0.0,0.20001),
    vec3(-0.6,0.01,0.20001),
    vec3(-0.6,0.01,0.20001),
    vec3(-0.6,-0.02,0.20001),
    vec3(-0.6,-0.01,0.20001),
    vec3(-0.6,-0.01,0.20001),
    vec3(-0.6,-0.04,0.20001),
    vec3(-0.6,-0.03,0.20001),
    vec3(-0.6,-0.03,0.20001),
    vec3(0.6,0.0,0.20001),
    vec3(0.6,0.01,0.20001),
    vec3(0.6,0.01,0.20001),
    vec3(0.6,-0.02,0.20001),
    vec3(0.6,-0.01,0.20001),
    vec3(0.6,-0.01,0.20001),
    vec3(0.6,-0.04,0.20001),
    vec3(0.6,-0.03,0.20001),
    vec3(0.6,-0.03,0.20001),
    vec3(0.15,0.2,0.20001),//50
    vec3(0.05,0.12,0.20001),//51
    vec3(-0.05,0.12,0.20001),//52
    vec3(-0.15,0.2,0.20001),//53嘴1

    vec3(-0.025,0.22,0.20001),
    vec3(0.025,0.22,0.20001),
    vec3(-0.005,0.26,0.20001),
    vec3(0.005,0.26,0.20001),//57鼻子

    vec3(-0.29,-0.99,0.2),
    vec3(-0.29,-0.5,0.2),
    vec3(-0.1,-0.5,0.2),
    vec3(-0.1,-0.99,0.2),
    vec3(-0.29,-0.99,0),
    vec3(-0.29,-0.5,0),
    vec3(-0.1,-0.5,0),
    vec3(-0.1,-0.99,0),//65左前腿

    vec3(0.29,-0.99,0.2),
    vec3(0.29,-0.5,0.2),
    vec3(0.1,-0.5,0.2),
    vec3(0.1,-0.99,0.2),
    vec3(0.29,-0.99,0),
    vec3(0.29,-0.5,0),
    vec3(0.1,-0.5,0),
    vec3(0.1,-0.99,0),//73右前腿

    vec3(-0.29,-0.99,-0.4),
    vec3(-0.29,-0.5,-0.4),
    vec3(-0.1,-0.5,-0.4),
    vec3(-0.1,-0.99,-0.4),
    vec3(-0.29,-0.99,-0.6),
    vec3(-0.29,-0.5,-0.6),
    vec3(-0.1,-0.5,-0.6),
    vec3(-0.1,-0.99,-0.6),//65左后腿

    vec3(0.29,-0.99,-0.4),
    vec3(0.29,-0.5,-0.4),
    vec3(0.1,-0.5,-0.4),
    vec3(0.1,-0.99,-0.4),
    vec3(0.29,-0.99,-0.6),
    vec3(0.29,-0.5,-0.6),
    vec3(0.1,-0.5,-0.6),
    vec3(0.1,-0.99,-0.6),//73右后腿

    vec3(0.0375,-0.5,-0.3),
    vec3(0.0375,-0.41,-0.3),
    vec3(0.0375,-0.35,-0.15),
    vec3(0.0375,-0.4,-0.15),
    vec3(-0.0375,-0.5,-0.3),
    vec3(-0.0375,-0.41,-0.3),
    vec3(-0.0375,-0.35,-0.15),
    vec3(-0.0375,-0.4,-0.15),//97尾巴

    vec3(0.0,-0.455,-1),//98尾巴尖

    vec3( -0.15,  -0.2,  0.15001 ),
    vec3(  0.15,  -0.2,  0.15001 ),
    vec3( -0.15,  -0.22,  0.15001 ),
    vec3(  0.15,  -0.22,  0.15001 ),//102
    vec3( -0.15001,  -0.2,   0.15 ),
    vec3( -0.15001,  -0.2,   0.05 ),
    vec3( -0.15001,  -0.22,  0.05 ),
    vec3( -0.15001,  -0.22,  0.15 ),//106
    vec3( -0.15001,  -0.2,   -0.15 ),
    vec3( -0.15001,  -0.2,   -0.05 ),
    vec3( -0.15001,  -0.22,  -0.05 ),
    vec3( -0.15001,  -0.22,  -0.15 ),//110
    vec3( -0.15,  -0.2,  -0.15001 ),
    vec3(  0.15,  -0.2,  -0.15001 ),
    vec3( -0.15,  -0.22,  -0.15001 ),
    vec3(  0.15,  -0.22,  -0.15001 ),//114
    vec3( 0.15001,  -0.2,   0.15 ),
    vec3( 0.15001,  -0.2,   0.05 ),
    vec3( 0.15001,  -0.22,  0.05 ),
    vec3( 0.15001,  -0.22,  0.15 ),//118
    vec3( 0.15001,  -0.2,   -0.15 ),
    vec3( 0.15001,  -0.2,   -0.05 ),
    vec3( 0.15001,  -0.22,  -0.05 ),
    vec3( 0.15001,  -0.22,  -0.15 ),//122
    vec3(  0.0,  -0.22,  0.15001 ),
    vec3(0.03,-0.25,0.15001),
    vec3(-0.03,-0.25,0.15001),//125
    vec3(  0.0,  -0.23,  0.15002 ),
    vec3(0.015,-0.26,0.15002),
    vec3(-0.015,-0.26,0.15002),//128


];

var vertexColors = [

    vec4( 0.9333, 0.9098, 0.6667, 1 ),//左前下＊
    vec4(  0.7412, 0.7176, 0.4196, 1 ),//左前上
    vec4(  0.7412, 0.7176, 0.4196, 1 ),//右前上
    vec4(  0.9333, 0.9098, 0.6667,1 ),//右前下＊
    vec4(  0.9333, 0.9098, 0.6667, 1 ),//左后下＊
    vec4(  0.7412, 0.7176, 0.4196, 1 ),//左后上
    vec4(  0.7412, 0.7176, 0.4196, 1 ),//右后上
    vec4( 0.9333, 0.9098, 0.6667, 1 ),//右后下＊   脸

    vec4( 0.7216, 0.5254, 0.0431, 0.5 ),//左前下＊
    vec4( 0.2, 0.0, 0.0, 0.5 ),//左前上
    vec4( 0.2, 0.0, 0.0, 0.5 ),//右前上
    vec4( 0.7216, 0.5254, 0.0431, 0.5 ),//右前下＊
    vec4( 0.7216, 0.5254, 0.0431, 0.5 ),//左后下＊
    vec4( 0.2, 0.0, 0.0, 0.5 ),//左后上
    vec4( 0.2, 0.0, 0.0, 0.5 ),//右后上
    vec4( 0.7216, 0.5254, 0.0431, 0.5 ),//右后下＊   身子



    vec4( 1, 0.6471, 0, 1 ),
    vec4( 0.4, 0.0, 0.2, 1.0 ),
    vec4( 1, 0.6471, 0, 1 ), //耳朵
    vec4( 0.4, 0.0, 0.2, 1.0 ),

    vec4( 1, 1, 1, 1 ),
    vec4( 0, 0, 0,0.8 ),
    vec4( 0, 0, 0, 0.8   ),
    vec4( 1, 1, 1, 1 ),
    vec4( 0, 0, 0, 0.8  ),
    vec4( 0, 0, 0, 0.8  ),

    vec4( 1, 1, 1, 1 ),
    vec4( 0, 0, 0,0.8 ),
    vec4( 0, 0, 0, 0.8   ),
    vec4( 1, 1, 1, 1 ),
    vec4( 0, 0, 0, 0.8  ),
    vec4( 0, 0, 0, 0.8  ),//眼睛

    vec4( 0.0, 0.0, 0.0, 1.0 ),
    vec4( 0.0, 0.0, 0.0, 1.0 ),
    vec4( 0.0, 0.0, 0.0, 1.0 ),
    vec4( 0.0, 0.0, 0.0, 1.0 ),
    vec4( 0.0, 0.0, 0.0, 1.0 ),
    vec4( 0.0, 0.0, 0.0, 1.0 ),
    vec4( 0.0, 0.0, 0.0, 1.0 ),
    vec4( 0.0, 0.0, 0.0, 1.0 ),
    vec4( 0.0, 0.0, 0.0, 1.0 ),
    vec4( 0.0, 0.0, 0.0, 1.0 ),
    vec4( 0.0, 0.0, 0.0, 1.0 ),
    vec4( 0.0, 0.0, 0.0, 1.0 ),
    vec4( 0.0, 0.0, 0.0, 1.0 ),
    vec4( 0.0, 0.0, 0.0, 1.0 ),
    vec4( 0.0, 0.0, 0.0, 1.0 ),
    vec4( 0.0, 0.0, 0.0, 1.0 ),
    vec4( 0.0, 0.0, 0.0, 1.0 ),
    vec4( 0.0, 0.0, 0.0, 1.0 ),
    vec4( 0.0, 0.0, 0.0, 1.0 ),
    vec4( 0.0, 0.0, 0.0, 1.0 ),
    vec4( 0.0, 0.0, 0.0, 1.0 ),
    vec4( 0.0, 0.0, 0.0, 1.0 ),
    vec4( 0.0, 0.0, 0.0, 1.0 ),
    vec4( 0.0, 0.0, 0.0, 1.0 ),
    vec4( 0.0, 0.0, 0.0, 1.0 ),
    vec4( 0.0, 0.0, 0.0, 1.0 ),//嘴



    vec4( 0.6470, 0.1647, 0.1647, 1.0),//左前下＊
    vec4( 0.2, 0.0, 0.0, 0.5 ),//左前上
    vec4( 0.2, 0.0, 0.0, 0.5 ),//右前上
    vec4( 0.6470, 0.1647, 0.1647, 1.0),//右前下＊
    vec4( 0.6470, 0.1647, 0.1647, 1.0),//左后下＊
    vec4( 0.2, 0.0, 0.0, 0.5 ),//左后上
    vec4( 0.2, 0.0, 0.0, 0.5 ),//右后上
    vec4( 0.6470, 0.1647, 0.1647, 1.0),//右后下＊      左腿

    vec4( 0.6470, 0.1647, 0.1647, 1.0),//左前下＊
    vec4( 0.2, 0.0, 0.0, 0.5 ),//左前上
    vec4( 0.2, 0.0, 0.0, 0.5 ),//右前上
    vec4( 0.6470, 0.1647, 0.1647, 1.0),//右前下＊
    vec4( 0.6470, 0.1647, 0.1647, 1.0),//左后下＊
    vec4( 0.2, 0.0, 0.0, 0.5 ),//左后上
    vec4( 0.2, 0.0, 0.0, 0.5 ),//右后上
    vec4( 0.6470, 0.1647, 0.1647, 1.0),//右后下＊     右腿

    vec4( 0.8235, 0.4118, 0.1176, 1.0 ),//左前下＊
    vec4( 0.2, 0.0, 0.0, 0.5 ),//左前上
    vec4( 0.2, 0.0, 0.0, 0.5 ),//右前上
    vec4( 0.8235, 0.4118, 0.1176, 1.0 ),//右前下＊
    vec4( 0.8235, 0.4118, 0.1176, 1.0 ),//左后下＊
    vec4( 0.2, 0.0, 0.0, 0.5 ),//左后上
    vec4( 0.2, 0.0, 0.0, 0.5 ),//右后上
    vec4( 0.8235, 0.4118, 0.1176, 1.0 ),//右后下＊   左后腿

    vec4( 0.8235, 0.4118, 0.1176, 1.0 ),//左前下＊
    vec4( 0.2, 0.0, 0.0, 0.5 ),//左前上
    vec4( 0.2, 0.0, 0.0, 0.5 ),//右前上
    vec4( 0.8235, 0.4118, 0.1176, 1.0 ),//右前下＊
    vec4( 0.8235, 0.4118, 0.1176, 1.0 ),//左后下＊
    vec4( 0.2, 0.0, 0.0, 0.5 ),//左后上
    vec4( 0.2, 0.0, 0.0, 0.5 ),//右后上
    vec4( 0.8235, 0.4118, 0.1176, 1.0 ),//右后下＊   右后腿


    vec4( 0.4, 0.2, 0.3, 1.0 ),//左前下
    vec4( 0.2, 0.0, 0.0, 0.5 ),//左前上
    vec4( 0.2, 0.0, 0.0, 0.5 ),//右前上
    vec4( 0.4, 0.2, 0.3, 1.0 ),//右前下
    vec4( 0.4, 0.2, 0.3, 1.0 ),//左后下
    vec4( 0.2, 0.0, 0.0, 0.5 ),//左后上
    vec4( 0.2, 0.0, 0.0, 0.5 ),//右后上
    vec4( 0.4, 0.2, 0.3, 1.0 ),//右后下     尾巴

    vec4( 0.4, 0.2, 0.3, 1.0 ),//尾巴尖

    vec4( 1.0, 1.0, 0.0, 1.0 ),
    vec4( 1.0, 1.0, 0.0, 1.0 ),
    vec4( 1.0, 1.0, 0.0, 1.0 ),
    vec4( 1.0, 1.0, 0.0, 1.0 ),
    vec4( 1.0, 1.0, 0.0, 1.0 ),
    vec4( 1.0, 1.0, 0.0, 1.0 ),
    vec4( 1.0, 1.0, 0.0, 1.0 ),
    vec4( 1.0, 1.0, 0.0, 1.0 ),
    vec4( 1.0, 1.0, 0.0, 1.0 ),
    vec4( 1.0, 1.0, 0.0, 1.0 ),
    vec4( 1.0, 1.0, 0.0, 1.0 ),
    vec4( 1.0, 1.0, 0.0, 1.0 ),
    vec4( 1.0, 1.0, 0.0, 1.0 ),
    vec4( 1.0, 1.0, 0.0, 1.0 ),
    vec4( 1.0, 1.0, 0.0, 1.0 ),
    vec4( 1.0, 1.0, 0.0, 1.0 ),
    vec4( 1.0, 1.0, 0.0, 1.0 ),
    vec4( 1.0, 1.0, 0.0, 1.0 ),
    vec4( 1.0, 1.0, 0.0, 1.0 ),
    vec4( 1.0, 1.0, 0.0, 1.0 ),
    vec4( 1.0, 1.0, 0.0, 1.0 ),
    vec4( 1.0, 1.0, 0.0, 1.0 ),
    vec4( 1.0, 1.0, 0.0, 1.0 ),
    vec4( 1.0, 1.0, 0.0, 1.0 ),
    vec4( 1.0, 1.0, 0.0, 1.0 ),
    vec4( 1.0, 1.0, 0.0, 1.0 ),
    vec4( 1.0, 1.0, 0.0, 1.0 ),
    vec4( 0.0, 0.0, 0.0, 1.0 ),
    vec4( 0.0, 0.0, 0.0, 1.0 ),
    vec4( 0.0, 0.0, 0.0, 1.0 ),

    vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
    vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
    vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
    vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
    vec4( 1.0, 0.0, 1.0, 1.0 ),  // magenta
    vec4( 1.0, 1.0, 1.0, 1.0 ),  // white
    vec4( 0.0, 1.0, 1.0, 1.0 )  // cyan

];

// indices of the 12 triangles that compise the cube

var indices = [
     1, 0, 3,
    3, 2, 1,
    2, 3, 7,
    7, 6, 2,
    3, 0, 4,
    4, 7, 3,
    6, 5, 1,
    1, 2, 6,
    4, 5, 6,
    6, 7, 4,
    5, 4, 0,
    0, 1, 5,//脸


    9,8,11,
    11,10,9,
    10,11,15,
    15,14,10,
    11,8,12,
    12,15,11,
    14,13,9,
    9,10,14,
    12,13,14,
    14,15,12,
    13,12,8,
    8,9,13,//身体

    2,6,16,
    2,16,17,
    6,16,17,//右耳朵

    1,5,18,
    1,18,19,
    5,18,19,//左耳朵

    20,21,22,
    23,24,25,
    21,24,22,
    22,24,25,//左眼睛


    26,27,28,
    29,30,31,
    27,28,30,
    30,31,28,//右眼睛

    32,33,34,
    35,36,37,
    38,39,40,
    41,42,43,
    44,45,46,
    47,48,49,

    50,51,52,
    52,53,51,
    54,55,56,
    55,56,57,//右嘴

    59,58,61,
    61,60,59,
    60,61,65,
    65,64,60,
    61,58,62,
    62,65,61,
    64,63,59,
    59,60,64,
    62,63,64,
    64,65,62,
    63,62,58,
    58,59,63,//左腿

    67,66,69,
    69,68,67,
    68,69,73,
    73,72,68,
    69,66,70,
    70,73,69,
    72,71,67,
    67,68,72,
    70,71,72,
    72,73,70,
    71,70,66,
    66,67,71,//右腿


    75,74,77,
    77,76,75,
    76,77,81,
    81,80,76,
    77,74,78,
    78,81,77,
    80,79,75,
    75,76,80,
    78,79,80,
    80,81,78,
    79,78,74,
    74,75,79,//左后腿


    83,82,85,
    85,84,83,
    84,85,89,
    89,88,84,
    85,82,86,
    86,89,85,
    88,87,83,
    83,84,88,
    86,87,88,
    88,89,86,
    87,86,82,
    82,83,87,//右后腿

    91,90,93,
    93,92,91,
    92,93,97,
    97,96,92,
    93,90,94,
    94,97,93,
    96,95,91,
    91,92,96,
    94,95,96,
    96,97,94,
    95,94,90,
    90,91,95,//尾巴

    91,96,98,
    90,94,98,
    95,94,98,
    91,90,98,//尾巴尖

    99,100,101,
    100,101,102,
    103,104,105,
    103,105,106,
    107,108,109,
    107,109,110,
    111,112,113,
    112,113,114,
    115,116,117,
    115,117,118,
    119,120,121,
    119,121,122,
    123,124,125,
    126,127,128,


];


window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0, 1.0, 1.0, 1.0 );

    gl.enable(gl.DEPTH_TEST);


    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // array element buffer

    var iBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices), gl.STATIC_DRAW);

    // color array atrribute buffer

    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertexColors), gl.STATIC_DRAW );

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    // vertex array attribute buffer

    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

sudu1=0;
sudu=2;
/////改变
    thetaLoc1 = gl.getUniformLocation(program, "theta1");
    thetaLoc = gl.getUniformLocation(program, "theta");
    zoom = gl.getUniformLocation(program, "zoom");
    movet = gl.getUniformLocation(program, "move");
    glot = gl.getUniformLocation(program, "glo");
    theta3Loc = gl.getUniformLocation(program, "theta3");
    //event listeners for buttons
    document.getElementById("scaling").addEventListener("change",function(e){

    Zoom[0] = e.target.value;
});
    document.getElementById("vec").addEventListener("change",function(e){

       constsd = e.target.value;
    });
    document.getElementById("xrotate").addEventListener("change",function(e){
        axis = xAxis;
        sudu1=0;
        theta[axis] =e.target.value;



    });
    document.getElementById("yrotate").addEventListener("change",function(e){
        axis = yAxis;
        sudu1=0;
        theta[axis] =e.target.value;

    });
    document.getElementById("zrotate").addEventListener("change",function(e){
        axis = zAxis;
        sudu1=0;
        theta[axis] =e.target.value;

    });
    document.getElementById( "3Button" ).onclick = function () {
        Zoom[0] *= 0.95;
        sudu=0;
        sudu1=0;
    };

    document.getElementById( "5Button" ).onclick = function () {
        Zoom[0] /= 0.95;
        sudu=0;sudu1=0;
    };


    document.getElementById( "axButton" ).onclick = function () {


        pd=true
        axis1 = x1Axis;



    };
    document.getElementById( "ayButton" ).onclick = function () {
        axis1 = y1Axis;
        pd=true
    };
    document.getElementById( "azButton" ).onclick = function () {
        axis1 = z1Axis;

        pd=true
    };
    document.getElementById( "4Button" ).onclick = function () {
        var x= vertices[1][0]- vertices[2][0];
        var y= vertices[1][1]- vertices[2][1];
        var z= vertices[1][2]- vertices[2][2];
        move[0]+=0.2;
        move[1]-=0;
        move[2]-=0;
        sudu=0;sudu1=0;
    };
    document.getElementById( "uButton" ).onclick = function () {
        var x= vertices[1][0]- vertices[0][0];
        var y= vertices[1][1]- vertices[0][1];
        var z= vertices[1][2]- vertices[0][2];
        move[0]+=0;
        move[1]+=0.2;
        move[2]+=0;
        sudu=0;sudu1=0;
    };
    document.getElementById( "dButton" ).onclick = function () {
        var x= vertices[1][0]- vertices[0][0];
        var y= vertices[1][1]- vertices[0][1];
        var z= vertices[1][2]- vertices[0][2];
        move[0]-=0;
        move[1]-=0.2;
        move[2]-=0;
        sudu=0;sudu1=0;
    };
    document.getElementById( "1Button" ).onclick = function () {
        var x= vertices[1][0]- vertices[2][0];
        var y= vertices[1][1]- vertices[2][1];
        var z= vertices[1][2]- vertices[2][2];
        move[0]-=0.2;
        move[1]+=0;
        move[2]+=0;
        sudu=0;sudu1=0;
    };
    document.getElementById( "fButton" ).onclick = function () {
        var x= vertices[4][0]- vertices[0][0];
        var y= vertices[4][1]- vertices[0][1];
        var z= vertices[4][2]- vertices[0][2];
        move[0]-=0;
        move[1]-=0;
        move[2]-=0.2;
        sudu=0;
        sudu1=0;
    };
    document.getElementById( "vButton" ).onclick = function () {
    var x= vertices[4][0]- vertices[0][0];
    var y= vertices[4][1]- vertices[0][1];
    var z= vertices[4][2]- vertices[0][2];
    move[0]+=0;
    move[1]+=0;
    move[2]+=0.2;
    sudu=0;
        sudu1=0;
};  /*
    document.getElementById("forwardButton").addEventListener("click",function(e){
        rotate = false;
        glo += 0.1 * Math.cos(radians(theta[1]));
    });
    document.getElementById("backButton").addEventListener("click",function(e){
        rotate = false;
        glo -= 0.1 * Math.cos(radians(theta[1]));
    });
 */
    document.getElementById( "forwardButton" ).onclick = function () {
        var x= vertices[4][0]- vertices[0][0];
        var y= vertices[4][1]- vertices[0][1];
        var z= vertices[4][2]- vertices[0][2];


       glo[0]-=x*constsd;
        glo[1]-=y*constsd;
        glo[2]-=z*constsd;
        sudu=0;
        sudu1=0;
         /*
        glo[0]=glo[0]+0.01*Math.cos(theta[1]/180*Math.PI)*Math.cos(theta[2]/180*Math.PI);//
        glo[1]=glo[1]-0.01*Math.cos(theta[1]/180*Math.PI)*Math.sin(theta[2]/180*Math.PI);//
        */
    };
    document.getElementById( "backButton" ).onclick = function () {
        var x= vertices[4][0]- vertices[0][0];
        var y= vertices[4][1]- vertices[0][1];
        var z= vertices[4][2]- vertices[0][2];
        glo[0]+=x*constsd;
        glo[1]+=y*constsd;
        glo[2]+=z*constsd;
        sudu=0;

        sudu1=0;
    };


    document.getElementById( "upButton" ).onclick = function () {
        var x= vertices[1][0]- vertices[0][0];
        var y= vertices[1][1]- vertices[0][1];
        var z= vertices[1][2]- vertices[0][2];
        glo[0]-=x*constsd;
        glo[1]-=y*constsd;
        glo[2]-=z*constsd;

        sudu=0;
        sudu1=0;
    };
    document.getElementById( "downButton" ).onclick = function () {
        var x= vertices[1][0]- vertices[0][0];
        var y= vertices[1][1]- vertices[0][1];
        var z= vertices[1][2]- vertices[0][2];
        glo[0]+=x*constsd;
        glo[1]+=y*constsd;
        glo[2]+=z*constsd;

        sudu=0;
        sudu1=0;
    };

    document.getElementById( "leftButton" ).onclick = function () {
        var x= vertices[1][0]- vertices[2][0];
        var y= vertices[1][1]- vertices[2][1];
        var z= vertices[1][2]- vertices[2][2];
        glo[0]-=x*constsd;
        glo[1]-=y*constsd;
        glo[2]-=z*constsd;

        sudu=0;
        sudu1=0;
    };
    document.getElementById( "rightButton" ).onclick = function () {
        var x= vertices[1][0]- vertices[2][0];
        var y= vertices[1][1]- vertices[2][1];
        var z= vertices[1][2]- vertices[2][2];
        glo[0]+=x*constsd;
        glo[1]+=y*constsd;
        glo[2]+=z*constsd;

        sudu=0;
        sudu1=0;
    };

    canvas.addEventListener("mousedown", function(e){
        rotateByMouse = true;
        xStart = windowsToCanvas(e.clientX);
        yStart = windowsToCanvas(e.clientY);
    });
    canvas.addEventListener("mousemove",function(e){
        if(rotateByMouse){
            xEnd = windowsToCanvas(e.clientX);
            yEnd = windowsToCanvas(e.clientY);
            theta3[1] += 1*(xEnd - xStart)/canvas.width;
            theta3[0] += 1*(yEnd - yStart)/canvas.height;
        }
    });
    canvas.addEventListener("mouseup",function(e){
        rotateByMouse = false;
    });
    render();


}
function windowsToCanvas(pos){
    var rect = canvas.getBoundingClientRect();
    return(pos - rect.left*(canvas.width/rect.width));
}

function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    if(pd==true)
    {
        sudu1=2;
        sudu=0;
        theta1[axis1] += sudu1;
        if( theta1[axis1]==360)
        {
            pd=false;
            sudu1=0;
            sudu=0;
            theta1[axis1]=0;
        }
    }
  //  theta[axis] += sudu;
  //  theta1[axis1] += sudu1;
///改变
    gl.uniform3fv(thetaLoc, theta);
    gl.uniform1fv(zoom,flatten(Zoom) );
    gl.uniform3fv(movet,move);
    gl.uniform3fv(glot,glo);
    gl.uniform3fv(thetaLoc1, theta1);
    if(rotateByMouse){
        gl.uniform3fv(theta3Loc,flatten(theta3));
    }



    gl.drawElements( gl.TRIANGLES, numVertices, gl.UNSIGNED_BYTE, 0 );

    requestAnimFrame( render );
}

