const scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//medidas del cubo
const ancho = 0.8; const alto = ancho; const profundo = 0.2;
//medidas del cilindro
const radioSuperior = 0.4; const radioInferior = radioSuperior; const grosor = 0.2

function cubo() {
    const cubo = new THREE.BoxGeometry(ancho, alto, profundo); //constructor de geometria de cubo cuyos valores son(Float: ancho, Float: alto, Float: profundo)
    const material = new THREE.MeshNormalMaterial(); //mesh o textura del cubo
    const cube = new THREE.Mesh(cubo, material); //objeto cubo
    scene.add(cube);
    return cube;
}

function cilindro() {
    const cilindro = new THREE.CylinderGeometry(radioSuperior, radioInferior, grosor, 32); //constructor de geometria de cilindro cuyos valores son(Float: radioSuperior, Float: radioInferior, Float: altura, Integer: segmentosRadiales)
    const material2 = new THREE.MeshNormalMaterial(); //mesh o textura del cilindro
    const cylinder = new THREE.Mesh(cilindro, material2); //objeto cilindro
    scene.add(cylinder);
    cylinder.rotation.x = 1.57;
    return cylinder;
}


const asiento = new cubo();
const espaldar = new cilindro();
espaldar.position.y = asiento.position.y + ancho;




function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    cylinder.rotation.x += 0.01;
    cylinder.rotation.y += 0.01;
    renderer.render(scene, camera);
}

function ortogonal() {
    camera = new THREE.OrthographicCamera(-10, 10, 5, -5, 0.01, 1000);
    camera.position.z = 10;
    renderer.render(scene, camera);
}

function perspectiva() {
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 9;
    renderer.render(scene, camera);
}

camera.position.z = 9;
renderer.render(scene, camera);
//animate();