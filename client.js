import * as THREE from '/build/three.module.js';
import Stats from './jsm/libs/stats.module.js';
import { OrbitControls } from './jsm/controls/OrbitControls.js';
import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';
console.log(THREE);
console.log(OrbitControls);
console.log(GLTFLoader);

const canvas = document.querySelector('.web-gl');


// showing fps
const stats = new Stats();
document.body.appendChild(stats.domElement);

// Scene Setup
const scene = new THREE.Scene();
console.log(scene);

// Camera Setup
const fov = 70;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 5, 5);
scene.add(camera);
console.log(camera);

// Render Setup
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: canvas,
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
renderer.autoClear = false;
renderer.setClearColor = (0x000000, 0.0);
console.log(renderer);

// Adding orbit controls
let controls = new OrbitControls(camera, renderer.domElement);

controls.minDistance = 10;
controls.maxDistance = 40;


//lighting 
const light = new THREE.HemisphereLight( 0xffffff, 0xffffff, 3 );
light.position.set(0,5000,2);
scene.add( light );
const light2 = new THREE.PointLight( 0xffffff, 10, 100 );
light.position.set( 50, 10, 50 );
scene.add( light2 );


// loader for loading texture
let loader = new THREE.TextureLoader();

// array for holding all texutre
let textureArray = [];


const modelLoader = new GLTFLoader();

modelLoader.load( './model/scene.gltf', function ( gltf ) {

	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );

// all texture
// let frontTexture = loader.load('./model/polluted_earth/front.jpg');
// let backTexture = loader.load('./model/polluted_earth/back.jpg');
// let topTexture = loader.load('./model/polluted_earth/top.jpg');
// let bottomTexture = loader.load('./model/polluted_earth/bottom.jpg');
// let rightTexture = loader.load('./model/polluted_earth/left.jpg');
// let leftTexture = loader.load('./model/polluted_earth/right.jpg');

// textureArray.push(new THREE.MeshBasicMaterial({map: frontTexture}));
// textureArray.push(new THREE.MeshBasicMaterial({map: backTexture}));
// textureArray.push(new THREE.MeshBasicMaterial({map: topTexture}));
// textureArray.push(new THREE.MeshBasicMaterial({map: bottomTexture}));
// textureArray.push(new THREE.MeshBasicMaterial({map: rightTexture}));
// textureArray.push(new THREE.MeshBasicMaterial({map: leftTexture}));

// for(let i=0; i<textureArray.length; i++){
//     textureArray[i].side = THREE.BackSide;
// }

// // making cube
// const cubeGeometry = new THREE.BoxGeometry(100, 100, 100);
// const skyBox = new THREE.Mesh(cubeGeometry, textureArray);
// scene.add(skyBox);

// render function to render the scene
const render = ()=>{
    renderer.render(scene, camera);
}

// Recursion function for animation
// const animate = ()=>{
//     requestAnimationFrame(animate);
//     render();
//     stats.update();
// }

function animate ()
{
    requestAnimationFrame(animate);
    render();
    stats.update();
}
animate();

// Resizing window to make responsive
const windowResize = ()=>{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}

window.addEventListener('resize', windowResize, false);