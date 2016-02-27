// // classic Phong equation
#version 410

layout( location = 0 ) in vec4 Position;
layout( location = 2 ) in vec4 Normal;

out vec4 vPosition;
out vec4 vNormal;

uniform vec3 UpperHeimisphere;
uniform vec3 topColor;
uniform vec3 botColor;

uniform mat4 ProjectionViewModel;

// we need the model matrix seperate
uniform mat4 ModelMatrix;

// we need this matrix to transform the normal (it's the inverse transposed model matrix!)
uniform mat4 NormalMatrix;

out vec3 color;

void main() 
{
	vec4 upHeim = vec4(0,1,0,1);
	vec3 tCol = vec3(0,0,1);
	vec3 bCol = vec3(0,1,0);

	vPosition = ModelMatrix * Position;
	vNormal = NormalMatrix * Normal;

	float NdotL = (upHeim.x  * vNormal.x) + (upHeim.y * vNormal.y) + (upHeim.z * vNormal.z);
	float influence = NdotL * .5 + .5;
	
	color = mix(tCol, bCol, influence);

	gl_Position = ProjectionViewModel * Position;
}