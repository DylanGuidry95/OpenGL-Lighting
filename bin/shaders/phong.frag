// a simple flat colour shader
#version 410

uniform vec3 Kd; // diffuse material colour

out vec4 FragColour;

void main() {
	FragColour = vec4(Kd,1);
}