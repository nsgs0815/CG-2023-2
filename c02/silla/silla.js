const scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//medidas del cubo
const ancho = 2; const alto = ancho; const profundo = 2;
//medidas del cilindro
const radioSuperior = 0.4; const radioInferior = radioSuperior; const grosor = 0.2

function cubo() {
    const qbo = new THREE.BoxGeometry(ancho, alto, profundo); //constructor de geometria de cubo cuyos valores son(Float: ancho, Float: alto, Float: profundo)
    const material = new THREE.MeshNormalMaterial(); //mesh o textura del cubo
    const cube = new THREE.Mesh(qbo, material); //objeto cubo
    /*const pata1 = new cubo(); const pata2 = new cubo();  const pata3 = new cubo(); const pata4 = new cubo(); 
    pata1.position.z = cube.position.z;
    cube.add(pata1,pata2,pata3,pata4);*/
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
//patas
const pata1 = new cubo(); const pata2 = new cubo();  
const pata3 = new cubo(); const pata4 = new cubo();

//posiciones de cada objeto
asiento.scale.set(0.5,0.1,0.5) // esclado en x, y & z para el asiento para que adopte las formas de de las medidas 0.8,0.8 y 0.2 respectivamente
espaldar.position.y = asiento.position.y + radioSuperior;
pata1.position.set()

function animate() {
    requestAnimationFrame(animate);
    asiento.rotation.x += 0.01;
    asiento.rotation.y += 0.01;

    espaldar.rotation.x += 0.01;
    espaldar.rotation.y += 0.01;
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