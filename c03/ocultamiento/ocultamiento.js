const scene = new THREE.Scene(); //genera una nueva escena 
//scene.background = new THREE.Color(0xEC2F48); //asgina un color al background (fondo)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); //cámara del tipo perspectiva
const renderer = new THREE.WebGLRenderer(); //render
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const objetos = new THREE.Group(); //genera un nuevo grupo llamado objetos

//icosaedro
const icoGeometry = new THREE.IcosahedronGeometry(); //metodo constructor de un icosaedro con valores por default
const material = new THREE.MeshNormalMaterial({ side: THREE.FrontSide }); //genera un material que solo renderiza en las caras frontales a la camara de las TODAS las geometrias, es decir implementa el método back face culling
const icosaedro = new THREE.Mesh(icoGeometry, material); icosaedro.position.x = 2; //objeto icosaedro

//piramide
const piGeometry = new THREE.CylinderGeometry( 0, 1, 1, 3 ); //metodo constructor de un cilindro dandole parámetros pare generar una pirámide de altura 1
const piramide = new THREE.Mesh( piGeometry, material ); //objeto piramide

//toroide
const toroGeometry = new THREE.TorusGeometry( 5, 1 , 16, 21 ); //método constructor de un toroide 
const toroide = new THREE.Mesh( toroGeometry, material ); //objeto toroide

objetos.add(icosaedro,piramide,toroide);//añade los tres objetos al grupo "objetos"
scene.add(objetos); //añade a la escena al grupo "objetos"

function animate() {
    requestAnimationFrame(animate);
    objetos.rotation.x +=0.01;
    objetos.rotation.y += 0.01;
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