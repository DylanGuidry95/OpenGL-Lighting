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
	vec3 N = normalize(vNormal.xyz);
	vec3 CamRelative = normalize(cameraPosition - vPosition.xyz);

	vec3 Ambient = Ka * Ia;
	vec3 Diffuse = Kd * ((L.x * N.x) + (L.y * N.y) + (L.z * N.z)) * Id;
	vec3 Reflection = (2 * specularPower * N ) - L;
	Reflection = normalize(Reflection);
	vec3 Specular = Ks * pow((Reflection.x * CamRelative.x) + (Reflection.y * CamRelative.y) + (Reflection.z * CamRelative.z), specularPower) * Is;
	FragColour = vec4(color + Diffuse + Ambient + (Specular / 2), 1);
}