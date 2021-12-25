import *  as THREE from 'three'
import { Light } from 'three';
import { DrawingCommon } from './common';

// Hane Yie A5

var textMesh = new THREE.Mesh();
var textM = new THREE.Mesh();
var snow = new THREE.Mesh();
const objectRoot1 = new THREE.Group();
const objectRoot2 = new THREE.Group();
const objectRoot3 = new THREE.Group();
const objectRoot4 = new THREE.Group();
const objectRoot5 = new THREE.Group();

// A class for our application state and functionality
class Drawing extends DrawingCommon {

    constructor (canv: HTMLElement) {
        super (canv)
    }

	//Set up the scene during class construction
	initializeScene(){   
        const loader = new THREE.FontLoader();

        loader.load('./src/Ostrich_Sans_Medium.json',  (font: THREE.Font) => {
        
        const queryString = window.location.search;
        let urlParams = new URLSearchParams(queryString);
        let message = urlParams.get('message');
        //console.log(message);
        var i;

        if (message.length < 17){
        for (i = 0; i < 17; i++){
        const geo = new THREE.TextGeometry(message[i], {
            font: font,
            size: 10,
            height: 10,
        });
        
        textMesh = new THREE.Mesh(geo, [
        new THREE.MeshPhongMaterial({ color: 0x007708 }),
        new THREE.MeshPhongMaterial({ color: 0xFF3333 }),
    ])
        var range;
        range = Math.random() * 9 - 10
        var l = message.length;
        var space = window.innerWidth/(l*l);
        //console.log(window.innerWidth);
        textMesh.position.set(-(space*l*0.5)+(space*(i)), range+10, -70);
        if (i % 2 == 0){
            textMesh.rotateZ(range*0.02);
        } else {
            textMesh.rotateZ(-(range*0.02));
        }
        this.scene.add(textMesh);

        const g = new THREE.TextGeometry('I', {
            font: font,
            size: 40,
            height: 0,
        });
        
        textM = new THREE.Mesh(g, [
        new THREE.MeshPhongMaterial({ color: 0xFFF700 }),
        ])

        textM.position.set(-(space*l*0.5)+(space*(i)), range+19, -65);
        if (!(message[i] === ' ')){
        this.scene.add(textM);
        }

        let img = new THREE.TextureLoader();
        img.load("./src/snow.png", (texture) =>{
        var snowGeo = new THREE.PlaneBufferGeometry(10,10);
        var snowMaterial = new THREE.MeshLambertMaterial({
            map: texture,
            transparent: true
        });

        for(let j=0; j<200; j++) {
            snow = new THREE.Mesh(snowGeo,snowMaterial);
            var ran = Math.random() * 229 - 300; 
            snow.position.set(Math.random()*900 -300, Math.random()*300 - 100, ran);
            snow.material.opacity = 2;
            this.scene.add(snow);
        }

        snowGeo = new THREE.PlaneBufferGeometry(25,25);
        snowMaterial = new THREE.MeshLambertMaterial({
            map: texture,
            transparent: true
        });
        snow = new THREE.Mesh(snowGeo,snowMaterial);
        snow.position.set(0, 50, -80);
        objectRoot1.add(snow);
        this.scene.add(objectRoot1);

        snowGeo = new THREE.PlaneBufferGeometry(18,18);
        snowMaterial = new THREE.MeshLambertMaterial({
            map: texture,
            transparent: true
        });
        snow = new THREE.Mesh(snowGeo,snowMaterial);
        snow.position.set(-40, 50, -80);
        objectRoot2.add(snow);
        this.scene.add(objectRoot2);

        snowGeo = new THREE.PlaneBufferGeometry(15,15);
        snowMaterial = new THREE.MeshLambertMaterial({
            map: texture,
            transparent: true
        });
        snow = new THREE.Mesh(snowGeo,snowMaterial);
        snow.position.set(-15, 50, -80);
        objectRoot3.add(snow);
        this.scene.add(objectRoot3);

        snowGeo = new THREE.PlaneBufferGeometry(12,12);
        snowMaterial = new THREE.MeshLambertMaterial({
            map: texture,
            transparent: true
        });
        snow = new THREE.Mesh(snowGeo,snowMaterial);
        snow.position.set(50, 50, -80);
        objectRoot4.add(snow);
        this.scene.add(objectRoot4);

        snowGeo = new THREE.PlaneBufferGeometry(21,21);
        snowMaterial = new THREE.MeshLambertMaterial({
            map: texture,
            transparent: true
        });
        snow = new THREE.Mesh(snowGeo,snowMaterial);
        snow.position.set(30, 50, -80);
        objectRoot5.add(snow);
        this.scene.add(objectRoot5);
    });

}} else {
    const fg = new THREE.TextGeometry(message.substring(0, 10), {
        font: font,
        size: 6,
        height: 3,
    });
    
    textMesh = new THREE.Mesh(fg, [
    new THREE.MeshPhongMaterial({ color: 0x007708 }),
    new THREE.MeshPhongMaterial({ color: 0xFF3333 }),
])
    
    textMesh.position.set(-30, 20, -75);
    this.scene.add(textMesh);

    const hk = new THREE.TextGeometry(message.substring(10, 30), {
        font: font,
        size: 6,
        height: 3,
    });
    
    textMesh = new THREE.Mesh(hk, [
    new THREE.MeshPhongMaterial({ color: 0x007708 }),
    new THREE.MeshPhongMaterial({ color: 0xFF3333 }),
])
    
    textMesh.position.set(-30, 0, -75);
    this.scene.add(textMesh);

    const qw = new THREE.TextGeometry(message.substring(30, 50), {
        font: font,
        size: 6,
        height: 3,
    });
    
    textMesh = new THREE.Mesh(qw, [
    new THREE.MeshPhongMaterial({ color: 0x007708 }),
    new THREE.MeshPhongMaterial({ color: 0xFF3333 }),
])
    
    textMesh.position.set(-30, -20, -75);
    this.scene.add(textMesh);
}


});
}
    anim = false
    animate = 1;
    anima = 0;
    a = 1;

    speed = 5
    distan = 3

    t = 1000

    start = 0  
    end = 0
    startX = -1.5  
    endX = 1.5
    
    quatStart = new THREE.Quaternion();
    quatEnd = new THREE.Quaternion();

	//Update the scene during requestAnimationFrame callback before rendering
	updateScene(time: DOMHighResTimeStamp){
        if (!this.anim) {
            this.anim = true
            this.start = time;
            this.end = this.start + this.t
        }

        if (time > this.end) {
            this.start = this.end;
            this.end = this.start + this.t
            this.startX *= -1
            this.endX *= -1
            this.distan *= -1
            this.animate *= -1
            this.anima -= 0.01
            this.a ++;
        }

        var t = (time - this.start) / this.t
        this.camera.position.x = (this.startX + t * this.distan)*0.1
        
        this.camera.position.y = (this.startX + t * this.distan)*0.05

        if (this.animate > 0){
            //this.camera.rotateZ(0.01);
            //textMesh.translateY(0.1);
            objectRoot1.translateY(-0.1);
            objectRoot1.translateX(0.1);
            objectRoot2.translateY(-0.1);
            objectRoot2.translateX(-0.1);
            objectRoot3.translateY(-0.1);
            objectRoot3.translateX(0.1);
            objectRoot4.translateY(-0.1);
            objectRoot4.translateX(-0.1);
            objectRoot5.translateY(-0.1);
            objectRoot5.translateX(0.1);
            
            
        } else {
            //this.camera.rotateZ(-0.01)
            //textMesh.translateY(-0.1);
            objectRoot1.translateY(-0.1);
            objectRoot1.translateX(-0.1);
            objectRoot2.translateY(-0.1);
            objectRoot2.translateX(0.1);
            objectRoot3.translateY(-0.1);
            objectRoot3.translateX(-0.1);
            objectRoot4.translateY(-0.1);
            objectRoot4.translateX(0.1);
            objectRoot5.translateY(-0.1);
            objectRoot5.translateX(-0.1);
        }   
    }
}


// a global variable for our state.  We implement the drawing as a class, and 
// will have one instance
var myDrawing: Drawing;

// main function that we call below.
// This is done to keep things together and keep the variables created self contained.
// It is a common pattern on the web, since otherwise the variables below woudl be in 
// the global name space.  Not a huge deal here, of course.

function exec() {
    // find our container
    var div = document.getElementById("drawing");

    if (!div) {
        console.warn("Your HTML page needs a DIV with id='drawing'")
        return;
    }

    // create a Drawing object
    myDrawing = new Drawing(div);
}

exec()