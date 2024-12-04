import * as THREE from 
      "https://cdn.jsdelivr.net/npm/three@0.126.1/build/three.module.js";

import vertexShader from 'C:/Users/MOHAMMAD Aima/Documents/ThreeJS/earth/shaders/vertex.glsl'
import fragmentShader from   'C:/Users/MOHAMMAD Aima/Documents/ThreeJS/earth/shaders/fragment.glsl'

console.log(vertexShader)


  const scene= new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight,0.1,1000)

  const renderer = new THREE.WebGLRenderer(
    {antialias:true}
  )
  renderer.setSize(innerWidth,innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)

  document.body.appendChild(renderer.domElement)
  

  //Creation dune sphere
  const sphere = new THREE.Mesh(new THREE.SphereGeometry(5,50,50),
   new THREE.ShaderMaterial(
    {
    vertexShader: vertexShader,  // ou bien jute vertexShader lorsque le nom de la propriété=nom de la variable
    fragmentShader,
    uniform: {
      globeTexture:{
        value : new THREE.TextureLoader().load('C:/Users/MOHAMMAD Aima/Documents/ThreeJS/earth/image/globe.jpg')
      }
    }
    }
  ))

scene.add(sphere)
camera.position.z=12

  function animate(){requestAnimationFrame(animate)
    renderer.render(scene, camera)
  }
  animate()
  
  
