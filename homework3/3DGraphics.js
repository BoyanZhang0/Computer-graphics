function add(u,v){
	var result=vec4(0.0,0.0,0.0,0.0)

	result[0]=u[0]+v[0];
	result[1]=u[1]+v[1];
	result[2]=u[2]+v[2];
	result[3]=1;
	return result;
}

function triangle(a, b, c,vertexs,normals,indices,originalPoint){
	normals.push(vec3(a[0],a[1],a[2]));
	normals.push(vec3(b[0],b[1],b[2]));
	normals.push(vec3(c[0],c[1],c[2]));			
   
    vertexs.push(add(a,originalPoint));
	vertexs.push(add(b,originalPoint));      
    vertexs.push(add(c,originalPoint));
	
	indices.push(index1);
	index1=index1+1;
	indices.push(index1);
	index1=index1+1;	
	indices.push(index1);
	index1=index1+1;
}

function f(n,a,b,r){
	var a=Math.PI*a/n,b=2*Math.PI*b/n,l=Math.sin(a);
    return [r*Math.sin(b)*l,r*Math.cos(a),r*Math.cos(b)*l,1];
}

function drawSphere(n,r,vertexs,normals,indices,originalPoint){
	var i,j;
	for(i=1;i<=n;i++){
		for(j=1;j<=n;j++){
			triangle(f(n,i-1,j,r),f(n,i,j-1,r),f(n,i,j,r),vertexs,normals,indices,originalPoint);
			triangle(f(n,i-1,j-1,r),f(n,i,j-1,r),f(n,i-1,j,r),vertexs,normals,indices,originalPoint); 
		}	
	}
}

