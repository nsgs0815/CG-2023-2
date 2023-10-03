const scene = new THREE.Scene(); //genera una nueva escena 
scene.background = new THREE.Color(0xCCFFFF); //asgina un color al background (fondo)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); //cámara del tipo perspectiva
const renderer = new THREE.WebGLRenderer({ antialias: true }); //render
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; //habilita las sombras en el render
document.body.appendChild(renderer.domElement);
camera.position.z = 8; //posicion de la camara en Z

const puntoCurva = new THREE.CatmullRomCurve3([//puntos que definen la curva que dibuja el tubo, vectores (x,y,z)
    new THREE.Vector3(0, 0, 0),   // Punto de inicio
    new THREE.Vector3(0, 2, 0),   // Punto en la parte superior de la pata izquierda
    new THREE.Vector3(2, 2, 0),   // Punto en la parte superior de la pata derecha
    new THREE.Vector3(2, 0, 0),   // Punto en la parte inferior de la pata derecha
]);

const points = puntoCurva.getPoints(50); //optiene los puntos del arreglo de vectores "puntoCurva"
const curva = new THREE.CatmullRomCurve3(points) //curva generada con el contructor dados los puntos optenidos anteriormente
const geometry = new THREE.TubeGeometry(curva, 64, 0.6, 32, false); //constructor para geometria de tubo(linea o curva, segmentos tubulares,radio,segmentos radiales,cerrado o abierto)
const material = new THREE.MeshPhongMaterial({side : THREE.DoubleSide}); //material para usaer luces y sombras, carga material tambien al interior del tubo
const tubeMesh = new THREE.Mesh(geometry, material); //objeto malla que genera el tubo
scene.add(tubeMesh); //añade el tubo a la escena

var hemiLight = new THREE.HemisphereLight(0x000000, 0xBC94F9, 1); //constructor para luz hemisferica(color del cielo, color del suelo, intensidad de luz)
hemiLight.position.set(15, 500, 15); //posicionb de la luz en (x,y,z)
scene.add(hemiLight)


renderer.render(scene, camera); //carga (renderiza) la escena y la camara
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
function animate() {
    requestAnimationFrame(animate);

    tubeMesh.rotation.x += 0.01;
    tubeMesh.rotation.y += 0.01;

    renderer.render(scene, camera);
};

animate();