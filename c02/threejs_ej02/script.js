/*ya se arreglo la camara ortogonal, se le añadio textura al cubo y a la esfera, se crearon funciones para cambiar entre camaras  */
const scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//cubo
const cubo = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshNormalMaterial({ color: 0xF700FF });
const cube = new THREE.Mesh(cubo, material);
scene.add(cube);
cube.position.x = -3;

//esfera
const esfera = new THREE.SphereGeometry(1, 32, 16);
const material2 = new THREE.MeshNormalMaterial();
const sphere = new THREE.Mesh(esfera, material2);
scene.add(sphere);
sphere.position.x = 3;

camera.position.z = 9;
renderer.render(scene, camera);

function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;
    renderer.render(scene, camera);
}

function ortogonal(){ 
    camera = new THREE.OrthographicCamera(-10,10,10,-10, 0.01, 1000);
    camera.position.z = 2;
}

function perspectiva(){
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 9;
}
animate();