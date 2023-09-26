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
punta = new THREE.Vector3(0, altura / 2, 0);// Agrega el vértice superior del cono
malla.vertices.push(punta);

for (let i = 0; i < segmentos; i++) {// Crea los vértices de la base del cono
    const theta = (i / segmentos) * Math.PI * 2;
    const x = Math.cos(theta) * radio;
    const z = Math.sin(theta) * radio;
    const vertix = new THREE.Vector3(x, -altura / 2, z);
    malla.vertices.push(vertix);
}

for (let i = 1; i <= segmentos; i++) {//Crea las caras del cono
    const face = new THREE.Face3(0, i, i % segmentos + 1);
    malla.faces.push(face);
}
//halla las normales de los vertices y las caras
malla.computeFaceNormals();
malla.computeVertexNormals();

// Calcular coordenadas UV manualmente
malla.faceVertexUvs[0] = [];
for (let i = 0; i < segmentos; i++) {
    const u1 = i / segmentos;
    const u2 = (i + 1) / segmentos;
    malla.faceVertexUvs[0].push([
        new THREE.Vector2(u1, 1),
        new THREE.Vector2(u2, 1),
        new THREE.Vector2(0.5, 0.5)
    ]);
}

// Mapeo UV para la parte superior del cono
for (let i = 0; i < segmentos; i++) {
    const u1 = i / segmentos;
    const u2 = (i + 1) / segmentos;
    malla.faceVertexUvs[0].push([
        new THREE.Vector2(u1, 0),
        new THREE.Vector2(u2, 0),
        new THREE.Vector2(0.5, 0.5)
    ]);
}

const loader = new THREE.TextureLoader(); //CARGAR LA TEXTURA
const texture = loader.load("https://s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2016/09/28082346/CtY9h13WAAEsNfz.jpg"); //se llama la imagen desde url pero no funciona
const material = new THREE.MeshBasicMaterial({ texture, side : THREE.DoubleSide });
const cono = new THREE.Mesh(malla, material);
scene.add(cono);

camera.position.z = 5;

document.addEventListener('keydown', (event) => {
    if (event.key === 'w' || event.key === 'W') { cono.rotation.y += 0.1; }
    else if (event.key === 'a' || event.key === 'A') { cono.rotation.x -= 0.1; }
    else if (event.key === 's' || event.key === 'S') { cono.rotation.y -= 0.1; }
    else if (event.key === 'd' || event.key === 'D') { cono.rotation.x += 0.1; }
})

function animate() {
    requestAnimationFrame(animate);
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