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
	vec3 L = normalize(lightDirection); 

	vec3 Ambient = Ka * Ia;
	vec3 Diffuse = Kd * ((L.x * vNormal.x) + (L.y * vNormal.y) + (L.z * vNormal.z)) * Id;

	float dis = ((L.x - vNormal.x) * (L.x - vNormal.x)) + ((L.y - vNormal.y) * (L.y - vNormal.y)) + ((L.z - vNormal.z) * (L.z - vNormal.z));
	vec3 E = vNormal;

	//float iSpec = pow(E, specularPower);
	//vec3 Specular = Ks * Is;
	FragColour = vec4(color + Diffuse + Ambient, 1);
	

}