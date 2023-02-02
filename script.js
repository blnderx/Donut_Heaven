import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'


//Canvas
const canvas = document.querySelector('canvas.webgl')

//Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//Scene
const scene = new THREE.Scene()


let donut = null;
//Gltfloader
const gltfLoader = new GLTFLoader()

gltfLoader.load(
    'donut/donut.gltf',
    (gltf)=>{
        donut = gltf.scene;

        donut.position.x = 1.5
        donut.rotation.x = Math.PI * 0.2
        donut.rotation.z = Math.PI * 0.15


        const radius = 8.5
        donut.scale.set( radius, radius, radius)
        scene.add(donut)
    }
)

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


//Camera
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 1000)
camera.position.z = 5
scene.add(camera)

//Light 
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.set(1, 2, 0)
scene.add(directionalLight)

//Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


//Animate 
const clock = new THREE.Clock()
let lastElapsedTime = 0

const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - lastElapsedTime
    lastElapsedTime = elapsedTime
    
    if(!!donut){
        donut.position.y = Math.sin(elapsedTime * 0.5)* 0.1 - 0.1
    }


    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}

tick()
