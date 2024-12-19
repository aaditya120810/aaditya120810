// Setup Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add Light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 5);
scene.add(light);

// Add Player
const player = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 2), new THREE.MeshBasicMaterial({ color: 0x00ff00 }));
player.position.set(0, 1, -10);
scene.add(player);

// Add Target (Car)
const car = new THREE.Mesh(new THREE.BoxGeometry(2, 1, 4), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
car.position.set(0, 1, 20);
scene.add(car);

// Arrows
let arrows = [];
let score = 0;

// Handle Input
document.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    const arrow = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 3), new THREE.MeshBasicMaterial({ color: 0xffff00 }));
    arrow.rotation.x = Math.PI / 2;
    arrow.position.copy(player.position);
    arrows.push(arrow);
    scene.add(arrow);
  }
});

// Animate
function animate() {
  requestAnimationFrame(animate);

  // Move arrows
  arrows.forEach((arrow, index) => {
    arrow.position.z -= 0.5;
    if (arrow.position.distanceTo(car.position) < 1) {
      scene.remove(arrow);
      arrows.splice(index, 1);
      score++;
      document.getElementById('score').innerText = `Score: ${score}`;
    }
  });

  // Move Car
  car.position.x = Math.sin(Date.now() * 0.001) * 10;

  renderer.render(scene, camera);
}
animate();
