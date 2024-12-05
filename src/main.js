import * as THREE from 
      "https://cdn.jsdelivr.net/npm/three@0.126.1/build/three.module.js";

import vertexShader from 'C:/Users/MOHAMMAD Aima/Documents/ThreeJS/earth/shaders/vertex.glsl'
import atmosphereVertexShader from 'C:/Users/MOHAMMAD Aima/Documents/ThreeJS/earth/shaders/atmosphereVertex.glsl'
import fragmentShader from 'C:/Users/MOHAMMAD Aima/Documents/ThreeJS/earth/shaders/fragment.glsl'
import atmosphereFragmentShader from 'C:/Users/MOHAMMAD Aima/Documents/ThreeJS/earth/shaders/atmosphereFragment.glsl'
import gsap from 'gsap'

const scene = new THREE.Scene()
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


// Creation atmosphère
const atmosphere = new THREE.Mesh(
  new THREE.SphereGeometry(5,50,50),
 new THREE.ShaderMaterial(
  {
  vertexShader: atmosphereVertexShader,  // ou bien jute vertexShader lorsque le nom de la propriété=nom de la variable
  fragmentShader:atmosphereFragmentShader,
  blending:THREE.AdditiveBlending,
  side:THREE.BackSide
}
)
)

atmosphere.scale.set(1.1,1.1,1.1)
scene.add(atmosphere)

const group = new THREE.Group()
group.add(sphere)
scene.add(group)


// Création étoiles
const starGeometry = new THREE.BufferGeometry()
const starMaterial= new THREE.PointsMaterial({color:0xffffff})

const starVertices = [] 
for(let i =0; i<10000; i++)
{
  const x=(Math.random()-0.5)*2000
  const y=(Math.random()-0.5)*2000
  const z=-Math.random()*2000
  starVertices.push(x,y,z)

  starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices,3))
}
const stars= new THREE.Points(starGeometry,starMaterial)
scene.add(stars)

camera.position.z=12

const mouse ={
  x:undefined,
  y:undefined
}
function animate()
{   requestAnimationFrame(animate)
    renderer.render(scene, camera)
    sphere.rotation.y+=0.003
    gsap.to(group.rotation, {
      y:mouse.x*0.5,
      x:-mouse.y*0.3,
      duration:2
    })
  }
animate()

addEventListener('mousemove',()=>
{
  mouse.x=(event.clientX/innerWidth)*2-1
  mouse.y=(event.clientY/innerHeight)*2+1
  console.log(mouse)

})

  
