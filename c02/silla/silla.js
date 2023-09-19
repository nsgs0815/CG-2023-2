const scene = new THREE.Scene(); //genera una nueva escena 
scene.background = new THREE.Color(0xEC2F48); //asgina un color al background (fondo)
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000); //cámara del tipo perspectiva
const renderer = new THREE.WebGLRenderer(); //render
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const silla = new THREE.Group(); //grupo Silla que almacena los objetos que la componen, es decir,k asiento, patas y espaldar

const ancho = 2; const alto = ancho; const profundo = 2; //medidas constantes del cubo original
const radioSuperior = 0.4; const radioInferior = radioSuperior; const grosor = 0.2 //medidas del cilindro

function cubo() { //Genera un nuevo objeto de geometria cubo con los valores prestablecidos 
    const qbo = new THREE.BoxGeometry(ancho, alto, profundo); //constructor de geometria de cubo cuyos valores son(Float: ancho, Float: alto, Float: profundo)
    const material = new THREE.MeshNormalMaterial(); //mesh o textura del cubo
    const cube = new THREE.Mesh(qbo, material); //objeto cubo
    scene.add(cube);
    return cube;
}

function cilindro() { //Genera un nuevo objeto de geometria cilindirica con los valores prestablecidos 
    const cilindro = new THREE.CylinderGeometry(radioSuperior, radioInferior, grosor, 32); //constructor de geometria de cilindro cuyos valores son(Float: radioSuperior, Float: radioInferior, Float: altura, Integer: segmentosRadiales)
    const material2 = new THREE.MeshNormalMaterial(); //mesh o textura del cilindro
    const cylinder = new THREE.Mesh(cilindro, material2); //objeto cilindro
    scene.add(cylinder);
    cylinder.rotation.x = 1.57;
    return cylinder;
}

const asiento = new cubo(); //asiento a partir de un cubo de 2x2x2
asiento.scale.set(0.4,0.1,0.4) // esclado en x, y & z para el asiento para que adopte las formas de de las medidas 0.8,0.8 y 0.2 respectivamente

const espaldar = new cilindro(); //espaldar cilindrico 
espaldar.position.y = asiento.position.y + radioSuperior; //ajustar popsicion en Y del espaldar a la del asiento
espaldar.position.z = asiento.position.z + (profundo*0.4)/2; //ajustar popsicion en Z del espaldar a la del asiento

//Creación de las patas a partir de cubos de 2x2x2 y su respectiva transformacion de ESCALA
const pata1 = new cubo();  pata1.scale.set(0.05,0.5,0.05); 
const pata2 = new cubo();  pata2.scale.set(0.05,0.5,0.05);
const pata3 = new cubo();  pata3.scale.set(0.05,0.5,0.05);
const pata4 = new cubo();  pata4.scale.set(0.05,0.5,0.05);

//posiciones de cada pata
pata1.position.set(0.4,-0.5,0.4);   pata2.position.set(0.4,-0.5,-0.4);
pata3.position.set(-0.4,-0.5,0.4);   pata4.position.set(-0.4,-0.5,-0.4);

silla.add(asiento,espaldar,pata1,pata2,pata3,pata4); //se añaden al grupo "silla" el asiento, el espaldar y las 4 patas
scene.add(silla); //se añade a la escena el grupo silla
function animate() {//Anima la silla completa, es decir, el grupo "silla"
    requestAnimationFrame(animate);
    silla.rotation.x += 0.01;
    silla.rotation.y += 0.01;
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

camera.position.z = 9;
renderer.render(scene, camera);
animate();