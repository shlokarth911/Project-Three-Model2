import "./style.css"; //import style
import * as THREE from "three"; //import three.js
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"; //import EffectComposer
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"; //import RenderPass
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass"; //import UnrealBloomPass
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"; //import GLTFLoader

// Initialize Lenis
const lenis = new Lenis();

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

raf();

//scene
const scene = new THREE.Scene();
//camera
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);

camera.position.z = 0;
camera.position.y = 0.2;
camera.position.x = -2;
camera.lookAt(scene.position);

//renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("canvas"),
  antialias: true,
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
const bloomPass = new UnrealBloomPass();
bloomPass.strength = 0.8;
bloomPass.radius = 0.2;
bloomPass.threshold = 0.1;
composer.addPass(bloomPass);

//controls
// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;

let model;
let targetRotationX = 0;
let targetRotationY = 0;
let currentRotationX = 0;
let currentRotationY = 0;
const rotationSpeed = 0.06;

// Load GLTF model
const loader = new GLTFLoader();
loader.load(
  "./scene.gltf",
  (gltf) => {
    model = gltf.scene;
    scene.add(model);
  },
  undefined,
  (error) => {
    console.error("An error occurred while loading the model", error);
  }
);

// Add lighting
const ambientLight = new THREE.AmbientLight("#fff", 3);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight("#fff", 0.5);
directionalLight.position.set(10, 10, 7.5);
scene.add(directionalLight);

const directionalLight2 = new THREE.DirectionalLight("#237fe7", 2);
directionalLight2.position.set(5, 3, -3);
scene.add(directionalLight2);

const directionalLight3 = new THREE.DirectionalLight("red", 0.7);
directionalLight3.position.set(10, 10, 8);
scene.add(directionalLight3);

//animation
function animate() {
  requestAnimationFrame(animate);

  if (model) {
    currentRotationX += (targetRotationX - currentRotationX) * rotationSpeed;
    currentRotationY += (targetRotationY - currentRotationY) * rotationSpeed;
    model.rotation.x = currentRotationX;
    model.rotation.y = currentRotationY;
  }

  composer.render();
}
animate();

window.addEventListener("mousemove", (event) => {
  const mouseX = (window.innerWidth / 2 - event.clientX) / 1000;
  const mouseY = (window.innerHeight / 2 - event.clientY) / 1000;
  // targetRotationX = -mouseY;
  targetRotationY = -mouseX * 3;
});

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
});
//render
composer.render();

const box1 = document.querySelector(".box1");

box1.addEventListener("click", () => {
  window.location.href = "https://shlokarth911.github.io/Project-Three-Model1/";
});
const box2 = document.querySelector(".box2");

box2.addEventListener("click", () => {
  window.location.href = "https://shlokarth911.github.io/Project-Three-Model3/";
});

//animation using gsap
const navBtn = document.querySelector(".nav-btn");
let flag = true;
navBtn.addEventListener("click", () => {
  if (flag == false) {
    flag = true;
    navBtn.textContent = "OPEN";
    let tl = gsap.timeline();

    tl.to(".nav-main a ", {
      fontSize: 0,
      duration: 0.1,
    });

    tl.to(".nav-main", {
      height: "2vw",
      width: "2vw",
      padding: "0vw",
      duration: 0.5,
      ease: "power1.out",
    });

    tl.to(".nav-main", {
      height: "0vw",
      width: "0vw",
      padding: "0vw",
      transform: "translate(0vw, -10vw)",
      duration: 0.5,
      ease: "power1.out",
    });
  } else if (flag == true) {
    flag = false;
    let tl = gsap.timeline();
    navBtn.textContent = "CLOSE";

    tl.to(".nav-main", {
      height: "2vw",
      width: "2vw",
      padding: "0vw",
      transform: "translate(0vw, 0vw)",
      duration: 0.5,
      ease: "power1.out",
    });

    tl.to(".nav-main", {
      height: "auto",
      width: "auto",
      padding: "1vw 3vw",
      duration: 0.5,
    });

    tl.to(".nav-main a ", {
      delay: -0.1,
      fontSize: "1.5vw",
      duration: 0.1,
    });
  }
});
