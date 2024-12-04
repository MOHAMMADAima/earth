import * as THREE from 
      "https://cdn.jsdelivr.net/npm/three@0.126.1/build/three.module.js";

import vertexShader from 'C:/Users/MOHAMMAD Aima/Documents/ThreeJS/earth/shaders/vertex.glsl'
import fragmentShader from 'C:/Users/MOHAMMAD Aima/Documents/ThreeJS/earth/shaders/fragment.glsl'

console.log(fragmentShader)

const scene= new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight,0.1,1000)

const renderer = new THREE.WebGLRenderer(
    {antialias:true}
  )
renderer.setSize(innerWidth,innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.domElement)
  

  //Creation sphère
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(5,50,50),
   new THREE.ShaderMaterial(
    {
    vertexShader,  // ou bien jute vertexShader lorsque le nom de la propriété=nom de la variable
    fragmentShader,
    uniforms: {
      globeTexture : {
        value : new THREE.TextureLoader().load('./image/globe2.jpg')
      }
    }
    }
  ))

scene.add(sphere)

// Creation atmosphère
const atmosphere = new THREE.Mesh(
  new THREE.SphereGeometry(5,50,50),
 new THREE.ShaderMaterial(
  {
  vertexShader,  // ou bien jute vertexShader lorsque le nom de la propriété=nom de la variable
  fragmentShader}))

atmosphere.scale.set(1.1,1.1,1.1)

camera.position.z=12

function animate()
{   requestAnimationFrame(animate)
    renderer.render(scene, camera)
  }
animate()
  
  
