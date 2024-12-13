import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.126.1/build/three.module.js";
import vertexShader from 'C:/Users/MOHAMMAD Aima/Documents/ThreeJS/earth/shaders/vertex.glsl';
import atmosphereVertexShader from 'C:/Users/MOHAMMAD Aima/Documents/ThreeJS/earth/shaders/atmosphereVertex.glsl';
import fragmentShader from 'C:/Users/MOHAMMAD Aima/Documents/ThreeJS/earth/shaders/fragment.glsl';
import atmosphereFragmentShader from 'C:/Users/MOHAMMAD Aima/Documents/ThreeJS/earth/shaders/atmosphereFragment.glsl';
import gsap from 'gsap';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Création Terre
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(5, 50, 50),
  new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      globeTexture: {
        value: new THREE.TextureLoader().load('./image/earthblue.jpg')
      }
    }
  })
);

// Création atmosphère terrestre
const atmosphere = new THREE.Mesh(
  new THREE.SphereGeometry(5, 50, 50),
  new THREE.ShaderMaterial({
    vertexShader: atmosphereVertexShader,
    fragmentShader: atmosphereFragmentShader,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide
  })
);
atmosphere.scale.set(1.1, 1.1, 1.1);
scene.add(atmosphere);

const group = new THREE.Group();
group.add(sphere);
scene.add(group);

// Création étoiles
const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({ color: 0xffffff });
const starVertices = [];
for (let i = 0; i < 5000; i++) {
  const x = (Math.random() - 0.5) * 2000;
  const y = (Math.random() - 0.5) * 2000;
  const z = -Math.random() * 20 * 2000;
  starVertices.push(x, y, z);
}
starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

camera.position.z = 10; //taille de la Terre

const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();
let isZooming = false;
let isZoomedIn = false;
let initialCameraPosition = camera.position.clone();

function onMouseMove(event) {
  mouse.x = (event.clientX / innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / innerHeight) * 2 + 1;
}

function onMouseClick(event) {
  if (isZooming) return;

  if (isZoomedIn) {
    resetZoom();
  } else {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(sphere);
    if (intersects.length > 0) {
      const point = intersects[0].point;
      zoomTo(point);
    }
  }
}

// Zoomer
function zoomTo(target) {
  isZooming = true;
  isZoomedIn = true;

  // Stopper la rotation
  gsap.to(group.rotation, { x: 0, y: 0, duration: 1 });

  const distance = 8; //distance de zoom
  const targetPosition = target.clone().normalize().multiplyScalar(distance);

  gsap.to(camera.position, {
    x: targetPosition.x,
    y: targetPosition.y,
    z: targetPosition.z,
    duration: 2,
    onUpdate: () => {
      camera.lookAt(0, 0, 0);  // Centrée sur la Terre
    },
    onComplete: () => {
      isZooming = false;
    }
  });
}

// Dézoomer
function resetZoom() {
  isZooming = true;
  isZoomedIn = false;

  // Retour de la caméra sur la position initiale
  gsap.to(camera.position, {
    x: initialCameraPosition.x,
    y: initialCameraPosition.y,
    z: initialCameraPosition.z,
    duration: 2,
    onUpdate: () => {
      camera.lookAt(0, 0, 0);
    },
    onComplete: () => {
      isZooming = false;
    }
  });
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  if (!isZooming && !isZoomedIn) { // Rotation de la Terre seulement hors champs zoom
    sphere.rotation.y += 0.006; 
    gsap.to(group.rotation, {
      y: -mouse.x * 0.8,
      x: mouse.y * 0.9,
      duration: 2
    });
  }
}

addEventListener('mousemove', onMouseMove);
addEventListener('click', onMouseClick);

animate();