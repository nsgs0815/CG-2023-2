const scene = new THREE.Scene(); //genera una nueva escena 
//scene.background = new THREE.Color(0xEC2F48); //asgina un color al background (fondo)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); //cámara del tipo perspectiva
const renderer = new THREE.WebGLRenderer(); //render
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const altura = 2;  // Altura del cono
const radio = 1;  // Radio de la base del cono
const segmentos = 16;  // Número de segmentos del cono

const malla = new THREE.Geometry();

// Agrega el vértice superior del cono
punta = new THREE.Vector3(0, altura / 2, 0);
malla.vertices.push(punta);

// Crea los vértices de la base del cono
for (let i = 0; i < segmentos; i++) {
    const theta = (i / segmentos) * Math.PI * 2;
    const x = Math.cos(theta) * radio;
    const z = Math.sin(theta) * radio;
    const vertix = new THREE.Vector3(x, -altura / 2, z);
    malla.vertices.push(vertix);
}
//Crea las caras del cono
for (let i = 1; i <= segmentos; i++) {
    const face = new THREE.Face3(0, i, i % segmentos + 1);
    malla.faces.push(face);
}
//halla las normales de los vertices y las caras
malla.computeFaceNormals();
malla.computeVertexNormals();

//const material = new THREE.MeshNormalMaterial({side:THREE.DoubleSide} );

const loader = new THREE.TextureLoader();
const texture = loader.load( 'ladrillo.jpg' );
texture.colorSpace = THREE.SRGBColorSpace;
 
const material = new THREE.MeshBasicMaterial({ map: texture });
const cono = new THREE.Mesh(malla, material);
scene.add(cono);

camera.position.z = 5;
function animate() {
    requestAnimationFrame(animate);
    cono.rotation.x += 0.01;
    cono.rotation.y += 0.01;
    renderer.render(scene, camera);
}

function ortogonal() {//permite alternar a camara ortogonal
    camera = new THREE.OrthographicCamera(-10, 10, 5, -5, 0.01, 1000);
    camera.position.z = 10;
    renderer.render(scene, camera);
}

function perspectiva() {//permite cambiar a camara perspectiva
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 9;
    renderer.render(scene, camera);
}

renderer.render(scene, camera);
animate();