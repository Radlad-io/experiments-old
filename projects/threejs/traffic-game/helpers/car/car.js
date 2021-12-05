import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Stats from "three/examples/jsm/libs/stats.module";
import { GUI } from "dat.gui";

const scene = new THREE.Scene();
scene.add(new THREE.AxesHelper(5));

const wheelGeometry = new THREE.BoxBufferGeometry(12, 33, 12);
const wheelMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });

function getCarFrontTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 32;
  const context = canvas.getContext("2d");

  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, 64, 32);

  context.fillStyle = "#666666";
  context.fillRect(8, 8, 48, 24);

  return new THREE.CanvasTexture(canvas);
}

function getCarSideTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 32;
  const context = canvas.getContext("2d");

  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, 128, 32);

  context.fillStyle = "#666666";
  context.fillRect(10, 8, 38, 24);
  context.fillRect(58, 8, 60, 24);

  return new THREE.CanvasTexture(canvas);
}

function Wheel() {
  const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
  wheel.position.z = 6;
  wheel.castShadow = false;
  wheel.receiveShadow = false;
  return wheel;
}

function Headlight() {
  // Headlight geometry
  const headlight = new THREE.Mesh(
    new THREE.BoxBufferGeometry(1, 5, 4),
    new THREE.MeshStandardMaterial({ color: 0xdbe5ff, emissive: 0xdbe5ff })
  );

  // Headlight spotlight
  const distance = 25;
  const angle = Math.PI / 4.0;
  const penumbra = 0.5;
  const decay = 1;
  const spotlight = new THREE.SpotLight(
    0xdbe5ff,
    1,
    distance,
    angle,
    penumbra,
    decay
  );
  spotlight.position.set(5, 0, 0);
  spotlight.target.position.set(0, 0, 0);
  headlight.add(spotlight);
  // Visualizes light
  const helper = new THREE.DirectionalLightHelper(spotlight, 5);
  scene.add(helper);
  return headlight;
}

function Convertible() {
  const convertible = new THREE.Group();
  const color = 0xfd4058;
  const main = new THREE.Mesh(
    new THREE.BoxBufferGeometry(60, 30, 15),
    new THREE.MeshLambertMaterial({ color })
  );
  main.position.z = 12;
  main.castShadow = true;
  main.receiveShadow = true;
  convertible.add(main);

  const carFrontTexture = getCarFrontTexture();
  carFrontTexture.center = new THREE.Vector2(0.5, 0.5);
  carFrontTexture.rotation = Math.PI / 2;

  const carBackTexture = getCarFrontTexture();
  carBackTexture.center = new THREE.Vector2(0.5, 0.5);
  carBackTexture.rotation = -Math.PI / 2;

  const windshield = new THREE.Mesh(new THREE.BoxBufferGeometry(4, 24, 12), [
    new THREE.MeshLambertMaterial({ map: carFrontTexture }),
    new THREE.MeshLambertMaterial({ map: carBackTexture }),
    new THREE.MeshLambertMaterial({ color: 0xffffff }), // top
    new THREE.MeshLambertMaterial({ color: 0xffffff }), // bottom
    new THREE.MeshLambertMaterial({ color: 0xffffff }), // top
    new THREE.MeshLambertMaterial({ color: 0xffffff }), // bottom
  ]);

  windshield.position.x = 8;
  windshield.position.y = 0;
  windshield.position.z = 25.5;
  // windshield.position.set(0, 0, 35.5);

  windshield.castShadow = true;
  windshield.receiveShadow = true;
  convertible.add(windshield);

  const backWheel = new Wheel();
  backWheel.position.x = -18;
  convertible.add(backWheel);

  const frontWheel = new Wheel();
  frontWheel.position.x = 18;
  convertible.add(frontWheel);

  const rightHeadlight = new Headlight();
  rightHeadlight.position.set(30.5, 10, 15);
  convertible.add(rightHeadlight);

  const leftHeadlight = new Headlight();
  leftHeadlight.position.set(30.5, -10, 15);
  convertible.add(leftHeadlight);

  return convertible;
}

const Wall = new THREE.Mesh(
  new THREE.BoxBufferGeometry(10, 50, 50),
  new THREE.MeshLambertMaterial({ color: 0x666666 })
);
Wall.position.set(100, 0, 25);
scene.add(Wall);

const playerCar = Convertible();
scene.add(playerCar);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
dirLight.position.set(100, -300, 400);
scene.add(dirLight);

const aspectRatio = window.innerWidth / window.innerHeight;
const cameraWidth = 150;
const cameraHeight = cameraWidth / aspectRatio;

const camera = new THREE.OrthographicCamera(
  cameraWidth / -2,
  cameraWidth / 2,
  cameraHeight / 2,
  cameraHeight / -2,
  0,
  1000
);

var gridXZ = new THREE.GridHelper(
  100,
  10,
  new THREE.Color(0xff0000),
  new THREE.Color(0xffffff)
);
gridXZ.position.set(0, 0);
gridXZ.rotation.set(1.57, 0, 0);
scene.add(gridXZ);

camera.up.set(0, 0, 1);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x005131, 1);
renderer.render(scene, camera);

document.body.appendChild(renderer.domElement);

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}
const gui = new GUI();
const wallFolder = gui.addFolder("Wall");
wallFolder.add(Wall.position, "x", 0, 200, 10, 100);

const stats = Stats();
document.body.appendChild(stats.dom);
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(200, -200, 300);
controls.update();

function animate() {
  requestAnimationFrame(animate);

  // required if controls.enableDamping or controls.autoRotate are set to true
  controls.update();

  render();

  stats.update();
}

function render() {
  renderer.render(scene, camera);
}

animate();