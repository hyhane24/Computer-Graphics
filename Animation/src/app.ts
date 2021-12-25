// abstract library
import { DrawingCommon } from './common';
import * as THREE from 'three'

const objectRoot = new THREE.Group();
const objectRoot1 = new THREE.Group();
const objectRoot2 = new THREE.Group();
const objectRoot3 = new THREE.Group();
const objectRoot4 = new THREE.Group();


// Hane Yie
// The poor robot girl tries to hit the ball off with her weapon
// but she ends up getting hit on the head (replay)
// she sheds tears
// and at the end, her head falls off..!


// A class for our application state and functionality
class Drawing extends DrawingCommon {

    constructor (canv: HTMLElement) {
        super (canv)
    }

    /*
	Set up the scene during class construction
	*/
	initializeScene(){

        this.camera.lookAt(new THREE.Vector3());

        // a2-a part 
        
        // object 1 body
        var geometry: THREE.BufferGeometry = new THREE.CylinderGeometry( 0.7, 1.5, 2.8, 14, 1 );
        var material = new THREE.MeshPhongMaterial( { color: "rgb(145, 145, 145)", flatShading: false } );
        var mesh = new THREE.Mesh( geometry, material );

        mesh.position.set(0,0,0);
        objectRoot.add( mesh );

        // object 2 left leg
        geometry = new THREE.CylinderGeometry( 0.6, 0.2, 3, 14, 1 );
        material = new THREE.MeshPhongMaterial( {color: "rgb(255, 145, 0)", flatShading: false} );
        mesh = new THREE.Mesh( geometry, material );

        mesh.position.set(0.5,-2,0);
        objectRoot.add( mesh );

        // object 3 right leg
        geometry = new THREE.CylinderGeometry( 0.6, 0.2, 3, 14, 1 );
        material = new THREE.MeshPhongMaterial( {color: "rgb(255, 145, 0)", flatShading: false} );
        mesh = new THREE.Mesh( geometry, material );

        mesh.position.set(-0.5,-2,0);
        objectRoot.add( mesh );

        // object 4 left arm
        geometry = new THREE.CylinderGeometry( 0.4, 0.2, 2, 14, 1 );
        material = new THREE.MeshPhongMaterial( {color: "rgb(255, 145, 0)", flatShading: false} );
        mesh = new THREE.Mesh( geometry, material );

        mesh.position.set(1,0.5,0);
        objectRoot2.add( mesh );
        geometry.rotateZ( 20 );

        // object 5 right arm
        geometry = new THREE.CylinderGeometry( 0.4, 0.2, 2, 14, 1 );
        material = new THREE.MeshPhongMaterial( {color: "rgb(255, 145, 0)", flatShading: false} );
        mesh = new THREE.Mesh( geometry, material );

        mesh.position.set(-1,0.5,0);
        objectRoot2.add( mesh );
        geometry.rotateZ( -20 );

        // object 6 left hand
        geometry = new THREE.SphereGeometry( 0.3, 20, 10 );
        material = new THREE.MeshPhongMaterial( { color: "rgb(255, 145, 0)", flatShading: false } );
        mesh = new THREE.Mesh( geometry, material );

        mesh.position.set(-2.1,0,0);
        objectRoot2.add( mesh );


        // object 7 right hand
        geometry = new THREE.TorusGeometry( 0.2, 0.1, 30, 40 );
        material = new THREE.MeshPhongMaterial( { color: "rgb(145, 145, 145)", flatShading: false } );
        mesh = new THREE.Mesh( geometry, material );

        mesh.position.set(2.1,0,0);
        objectRoot2.add( mesh );


        // object 8 left foot 
        geometry = new THREE.SphereGeometry( 0.4, 8, 4 );
        material = new THREE.MeshPhongMaterial( { color: "rgb(255, 145, 0)", flatShading: false } );
        mesh = new THREE.Mesh( geometry, material );

        mesh.position.set(0.5, -3.2,0);
        objectRoot1.add( mesh );

        // object 9 right foot 
        geometry = new THREE.SphereGeometry( 0.4, 8, 4 );
        material = new THREE.MeshPhongMaterial( { color: "rgb(255, 145, 0)", flatShading: false } );
        mesh = new THREE.Mesh( geometry, material );

        mesh.position.set(-0.5, -3.2,0);
        objectRoot1.add( mesh );

        // object 10 head
        geometry = new THREE.SphereGeometry( 1.3, 20, 10 );
        material = new THREE.MeshPhongMaterial( { color: "rgb(255, 145, 0)", flatShading: false } );
        mesh = new THREE.Mesh( geometry, material );

        mesh.position.set(0,2.5,0);
        objectRoot1.add( mesh );

        // object 11 left eye
        geometry = new THREE.TorusGeometry( 0.12, 0.08, 30, 40 );
        material = new THREE.MeshPhongMaterial( { color: "rgb(57, 255, 210)", flatShading: false } );
        mesh = new THREE.Mesh( geometry, material );

        mesh.position.set(0.5,2.5,1.2);
        objectRoot.add( mesh );

        // tears
        geometry = new THREE.TorusGeometry( 0.12, 0.08, 30, 40 );
        material = new THREE.MeshPhongMaterial( { color: "rgb(57, 255, 210)", flatShading: false } );
        mesh = new THREE.Mesh( geometry, material );

        mesh.position.set(-0.5,2,2);
        geometry.scale(0.4,0.4,0.4)
        objectRoot4.add( mesh );
        
        geometry = new THREE.TorusGeometry( 0.12, 0.08, 30, 40 );
        material = new THREE.MeshPhongMaterial( { color: "rgb(57, 255, 210)", flatShading: false } );
        mesh = new THREE.Mesh( geometry, material );

        mesh.position.set(-0.5,1.5,2);
        geometry.scale(0.4,0.4,0.4)
        objectRoot4.add( mesh );

        // object 12 right eye
        geometry = new THREE.TorusGeometry( 0.12, 0.08, 30, 40 );
        material = new THREE.MeshPhongMaterial( { color: "rgb(57, 255, 210)", flatShading: false } );
        mesh = new THREE.Mesh( geometry, material );

        mesh.position.set(-0.5,2.5,1.2);
        objectRoot.add( mesh );

         // object 13 weapon body
         geometry = new THREE.CylinderGeometry( 0.1, 0.1, 0.7, 14, 1 );
         material = new THREE.MeshPhongMaterial( {color: "rgb(255, 0, 0)", flatShading: false} );
         mesh = new THREE.Mesh( geometry, material );
 
         mesh.position.set(2.3,0.0,0);
         objectRoot2.add( mesh );
         geometry.rotateZ( 50 );
         
         geometry.translate(0,0.5,0);


        //this.updateScene(1000);

        // object 14 weapon head
        geometry = new THREE.SphereGeometry( 0.1, 20, 10 );
        material = new THREE.MeshPhongMaterial( { color: "rgb(255, 0, 0)", flatShading: false } );
        mesh = new THREE.Mesh( geometry, material );

        mesh.position.set(2.4,0.8,0);
        objectRoot2.add( mesh );

        geometry.scale(3,3,3);


        geometry = new THREE.SphereGeometry( 0.1, 20, 10 );
        material = new THREE.MeshPhongMaterial( { color: "rgb(255, 255, 0)", flatShading: false } );
        mesh = new THREE.Mesh( geometry, material );

        mesh.position.set(3,3,0);
        objectRoot3.add( mesh );

        geometry.scale(7,7,7);


        this.scene.add( objectRoot );
        this.scene.add(objectRoot1);
        this.scene.add(objectRoot2);
        this.scene.add(objectRoot3);
        this.scene.add(objectRoot4);

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

	/*
	Update the scene during requestAnimationFrame callback before rendering
	*/
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

        this.camera.position.x = this.startX + t * this.distan

        if (this.animate > 0){
            objectRoot2.translateY(0.02)
            objectRoot2.rotateY(0.1)
            //objectRoot3.translateX(this.anima)
            
        } else {
            objectRoot2.translateY(-0.02)
            //objectRoot3.translateY(-this.anima)
            objectRoot3.position.x = this.startX + t * this.distan
            objectRoot4.translateY(this.anima)
        }

        if (this.a == 8){
            objectRoot1.translateY(-20)
        }
        

        this.camera.quaternion.slerpQuaternions(this.quatStart, this.quatEnd, t)
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