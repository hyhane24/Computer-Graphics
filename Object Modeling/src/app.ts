// abstract library
import { DrawingCommon } from './common';
import * as THREE from 'three'

// Hane Yie 
// A2-a

// The character is a robot with a weapon in her right hand.
// The general scheme was inspired by BB-8 from Star Wars, but I rervised it to match the rerquirement as BB-8 is composed with minimal number of objects.
// 14 objects, 4 colors, and 3 types of objects were used.
// RotateZ, translate, and scale were used as transformations. 
// When initially built, the camera is shooting the back of the character. 
// I realized the shade angle was towards the back, so matched the objects accordingly. 
// Please rotate the screen to view the front perspective of the character. Thank you! 

// A class for our application state and functionality
class Drawing extends DrawingCommon {

    constructor (canv: HTMLElement) {
        super (canv)
    }

    /*
	Set up the scene during class construction
	*/
	initializeScene(){

        const objectRoot = new THREE.Group();
        const objectRoot1 = new THREE.Group();
        const objectRoot2 = new THREE.Group();

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
        objectRoot.add( mesh );
        geometry.rotateZ( 20 );

        // object 5 right arm
        geometry = new THREE.CylinderGeometry( 0.4, 0.2, 2, 14, 1 );
        material = new THREE.MeshPhongMaterial( {color: "rgb(255, 145, 0)", flatShading: false} );
        mesh = new THREE.Mesh( geometry, material );

        mesh.position.set(-1,0.5,0);
        objectRoot.add( mesh );
        geometry.rotateZ( -20 );

        // object 6 left hand
        geometry = new THREE.SphereGeometry( 0.3, 20, 10 );
        material = new THREE.MeshPhongMaterial( { color: "rgb(255, 145, 0)", flatShading: false } );
        mesh = new THREE.Mesh( geometry, material );

        mesh.position.set(-2.1,0,0);
        objectRoot.add( mesh );

        // object 7 right hand
        geometry = new THREE.TorusGeometry( 0.2, 0.1, 30, 40 );
        material = new THREE.MeshPhongMaterial( { color: "rgb(145, 145, 145)", flatShading: false } );
        mesh = new THREE.Mesh( geometry, material );

        mesh.position.set(2.1,0,0);
        objectRoot.add( mesh );

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

        // object 14 weapon head
        geometry = new THREE.SphereGeometry( 0.1, 20, 10 );
        material = new THREE.MeshPhongMaterial( { color: "rgb(255, 0, 0)", flatShading: false } );
        mesh = new THREE.Mesh( geometry, material );

        mesh.position.set(2.4,0.8,0);
        objectRoot2.add( mesh );

        geometry.scale(3,3,3);

        this.scene.add( objectRoot );
        this.scene.add(objectRoot1);
        this.scene.add(objectRoot2);
    }

	/*
	Update the scene during requestAnimationFrame callback before rendering
	*/
	updateScene(time: DOMHighResTimeStamp){}
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