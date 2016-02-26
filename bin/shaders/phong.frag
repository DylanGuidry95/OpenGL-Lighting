// classic Phong equation
#version 410

in vec4 vPosition;
in vec4 vNormal;
in vec3 color;

uniform vec3 Ka;
uniform vec3 Kd;
uniform vec3 Ks;

uniform float specularPower;

uniform vec3 Ia;
uniform vec3 Id;
uniform vec3 Is;

uniform vec3 lightDirection;

uniform vec3 cameraPosition;

out vec4 FragColour;

void main() 
{
	vec3 PosNorm = normalize(vPosition.xyz);
	vec3 CamNorm = normalize(cameraPosition);
	vec3 L = normalize(lightDirection); 
	vec3 N = normalize(vNormal.xyz);
	vec3 CamDir = normalize(CamNorm + PosNorm);

	vec3 Ambient = Ka * Ia;
	vec3 Diffuse = Kd * dot(L,N) * Id;
	vec3 Reflection = 2 * Is * N - L;
	Reflection = normalize(Reflection);
	vec3 Specular = Ks * pow(dot(CamDir,Reflection), specularPower) * Is;
	FragColour = vec4(color  + Ambient + Specular , 1);
}