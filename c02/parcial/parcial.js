const scene = new THREE.Scene(); //genera una nueva escena 
//scene.background = new THREE.Color(0xEC2F48); //asgina un color al background (fondo)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); //cámara del tipo perspectiva
const renderer = new THREE.WebGLRenderer(); //render
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const estructura = new THREE.Group();

function cuboBase() { //funcion para crear un cubo de lado 1 centrado en el origen 
    const geometry = new THREE.Geometry();
    const halfSize = 0.5;
    geometry.vertices.push(
        new THREE.Vector3(-halfSize, -halfSize, -halfSize),
        new THREE.Vector3(halfSize, -halfSize, -halfSize),
        new THREE.Vector3(halfSize, halfSize, -halfSize),
        new THREE.Vector3(-halfSize, halfSize, -halfSize),
        new THREE.Vector3(-halfSize, -halfSize, halfSize),
        new THREE.Vector3(halfSize, -halfSize, halfSize),
        new THREE.Vector3(halfSize, halfSize, halfSize),
        new THREE.Vector3(-halfSize, halfSize, halfSize),
    );
    geometry.faces.push(
        new THREE.Face3(0, 1, 5),
        new THREE.Face3(0, 5, 4),
        new THREE.Face3(1, 2, 6),
        new THREE.Face3(1, 6, 5),
        new THREE.Face3(2, 3, 7),
        new THREE.Face3(2, 7, 6),
        new THREE.Face3(3, 0, 4),
        new THREE.Face3(3, 4, 7),
        new THREE.Face3(4, 5, 6),
        new THREE.Face3(4, 6, 7),
        new THREE.Face3(0, 3, 2),
        new THREE.Face3(0, 2, 1)
    );
    geometry.computeFaceNormals();
    geometry.computeVertexNormals();

    // Calcular coordenadas UV manualmente
    geometry.faceVertexUvs[0] = [];
    for (let i = 0; i < geometry.faces.length; i++) {
        const face = geometry.faces[i];
        const uvs = [];
        for (let j = 0; j < 3; j++) {
            const vertexIndex = face.a + (j % 3);
            const vertex = geometry.vertices[vertexIndex];
            uvs.push(new THREE.Vector2((vertex.x + 0.5), (vertex.y + 0.5)));
        }
        geometry.faceVertexUvs[0].push(uvs);
    }

    const material = new THREE.MeshNormalMaterial();
    const customMesh = new THREE.Mesh(geometry, material);
    return customMesh;
}

function cambiarMaterial(link, cubo) { //funcion para cambiar el material del cubo 
    const loader = new THREE.TextureLoader(); //CARGAR LA TEXTURA
    const texture = loader.load(link); //se llama la imagen desde url 
    const nuevoMaterial = new THREE.MeshBasicMaterial({ wireframe: false, side: THREE.DoubleSide, map: texture });
    cubo.material = nuevoMaterial;
}

const cubo1 = new cuboBase(); cambiarMaterial("https://ichef.bbci.co.uk/news/640/cpsprodpb/E1D3/production/_91411875_1743686_1420174834940050_5417600785934748934_n.jpg", cubo1);
const cubo2 = new cuboBase(); cubo2.position.y = 0.75; cubo2.scale.set(0.5, 0.5, 0.5); //transformacioneas
const cubo3 = new cuboBase(); cubo3.position.y = 1.125; cubo3.scale.set(0.25, 0.25, 0.25);

estructura.add(cubo1, cubo2, cubo3);
scene.add(estructura);

var axesHelper = new THREE.AxesHelper(5); //metodo para ver los ejes x,y,z
scene.add(axesHelper);

camera.position.z = 5;
camera.position.y = 1;
camera.position.x = 3;




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