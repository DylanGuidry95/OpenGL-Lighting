// classic Phong equation
#version 410

in vec4 vPosition;
in vec4 vNormal;
in vec3 color;

uniform vec3 Ka;
uniform vec3 Kd;
uniform vec3 Ks;

uniform float specularPower;

uniform vec3 Ia; //LightAmbient
uniform vec3 Id; //LightDiffuse
uniform vec3 Is; //LightSpecular

uniform vec3 lightPosition;

uniform vec3 cameraPosition;

out vec4 FragColour;

void main() 
{
	//vec3(5,5,0)
	vec3 SurfaceToLight = lightPosition - vPosition.xyz; 
	SurfaceToLight = normalize(SurfaceToLight); 

	vec3 SurfaceNormal = normalize(vec3(vNormal));
	 

	vec3 SurfaceToEye = cameraPosition - vPosition.xyz;
	SurfaceToEye = normalize(SurfaceToEye);

	float diffuse = max(0, dot(SurfaceNormal, SurfaceToLight));

	vec3 H = normalize(SurfaceToLight + SurfaceToEye);
	float specularTerm = max(0.0, dot(H, SurfaceNormal));
 
 
	specularTerm = pow(specularTerm, 5);
		
	
	vec3 Ambient = Ka * Ia;
	vec3 Diffuse = Kd * Id * diffuse * .5f;
	vec3 Specular = Ks * Is * specularTerm * .5f;

	FragColour = vec4( Ambient + Diffuse + Specular , 1);
}