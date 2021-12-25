import {Drawing, Vector, Point} from "./common"
import {init_tests, draw_tests} from "./projection_test"

// Hane Yie 

// PLEASE READ:
// I initially used ridiculous amount of vars (simple numbers for each element) in A1a as elements for matrix 
// This was highly inefficient and painful to use in this assignment (and clearly didn't work) so I changed var calling types in A1b
// I copied and pasted codes I wrote for A1a for appropriate methods, but changed parts that did not accurately work in A1a
// Just wanted to let the TAs know in case there are confusions. Thank you!

// A class for our application state and functionality
class MyDrawing extends Drawing {
    
    constructor (div: HTMLElement) {
        super(div)
 
        init_tests(this)
    }

    drawScene() {
        draw_tests(this)
    }

    // Matrix and Drawing Library implemented as part of this object

    // Begin by using the matrix transformation routines from part A of this project.
    // Make your current transformation matrix a property of this object.
    // You should modify the new routines listed below to complete the assignment.
    // Feel free to define any additional classes, class variables and helper methods
    // that you need.

    ctm: number[][] = [[0, 0, 0, 0], [0, 0, 0, 0,],
                    [0, 0, 0, 0], [0, 0, 0, 0]];

    cpm: number[][] = [[0, 0, 0, 0], [0, 0, 0, 0],
                    [0, 0, 0, 0], [0, 0, 0, 0]];

    // place holder with id matrix values for init purposes
    // declaring vars including myDrawing.canv completely crahsed the localhost 
    // including mvp and general vars
    mvp: number[][] = [[0, 0, 0, 0], [0, 0, 0, 0],
                        [0, 0, 0, 0], [0, 0, 0, 0]];

    vec: Vector = {
        x: 0,
        y: 0,
        z: 0,
        w: 0
    };

    v1: Point = {
        x:0, y:0, z:0
    };

    v2: Point = {
        x:0, y:0, z:0
    };

    draw = false;

    beginShape() {
        this.draw = true;
    }

    endShape() {
        this.draw = false;
    }

    vertex(x: number, y: number, z: number) {

        var cw = myDrawing.canv.width;
        var ch = myDrawing.canv.height;

        this.mvp = [[cw/2, 0, 0, (cw-1)/2],
                [0, ch/2, 0, (ch-1)/2],
                [0, 0, 1, 0], [0, 0, 0, 1]];
        
        this.vec = {
            x: this.vert(this.ctm, 0, x, y, z, 1),
            y: this.vert(this.ctm, 1, x, y, z, 1),
            z: this.vert(this.ctm, 2, x, y, z, 1),
            w: this.vert(this.ctm, 3, x, y, z, 1)
        };

        this.vec = {
            x: this.vert(this.cpm, 0, this.vec.x, this.vec.y, this.vec.z, this.vec.w),
            y: this.vert(this.cpm, 1, this.vec.x, this.vec.y, this.vec.z, this.vec.w), 
            z: this.vert(this.cpm, 2, this.vec.x, this.vec.y, this.vec.z, this.vec.w),
            w: this.vert(this.cpm, 3, this.vec.x, this.vec.y, this.vec.z, this.vec.w)
        };
        
        this.vec = {
            x: this.vert(this.mvp, 0, this.vec.x, this.vec.y, this.vec.z, this.vec.w),
            y: this.vert(this.mvp, 1, this.vec.x, this.vec.y, this.vec.z, this.vec.w), 
            z: this.vert(this.mvp, 2, this.vec.x, this.vec.y, this.vec.z, this.vec.w),
            w: this.vert(this.mvp, 3, this.vec.x, this.vec.y, this.vec.z, this.vec.w)
        };

        this.drawLine(this.vec.x/this.vec.w, this.vec.y/this.vec.w, this.vec.z/this.vec.w);
    }

    // helper method for vertex, for ctm, cpm, and mvp calculations 
    vert (mat: number[][], index: number, x: number, y: number, z: number, w: number){
        var ret;
        ret = mat[index][0] * x + mat[index][1] * y + mat[index][2] * z + mat[index][3] * w
        return ret;
    }

    // helper method for vertex, for drawing line
    drawLine(x: number, y: number, z: number){
        if (this.draw == true) {
            this.v2.x = x;
            this.v2.y = y;
            this.v2.z = z;
            this.endShape();
        } else {
            this.v1.x= x;
            this.v1.y= y;
            this.v1.z= z;
            this.line(this.v1, this.v2);
            this.beginShape();
        }
    }

    perspective(fov: number, near: number, far: number) {
        var cw = myDrawing.canv.width;
        var ch = myDrawing.canv.height;
        var t = Math.tan((fov/2)*Math.PI/180) * Math.abs(near);
        var r = t * (cw/ch);
        var l = -r;
        var b = -t;
        this.cpm = [[2*near/(r-l), 0, (l+r)/(l-r), 0],
                    [0, 2*near/(t-b), (b+t)/(b-t), 0],
                    // it has to be (far+near)/(near-far) according to textbook
                    // but my swtich 8 would not work properly that way
                    // so I flipped the signs as instrcuted on Piazza
                    [0, 0, (far+near)/(near+far), 2*far*near/(far-near)],
                    [0, 0, 1, 0]];
    }

    ortho( left: number, right: number, top: number, bottom: number, 
        near: number, far: number ) {
            this.cpm = [[2/(right-left), 0, 0, -((right+left)/(right-left))],
                        [0, 2/(top-bottom), 0, -((top+bottom)/(top-bottom))],
                        [0, 0, 2/(near-far), -((near+far)/(near-far))],
                        [0, 0, 0, 1]];
	}

    initMatrix() // was init()
    {
        this.ctm = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
    }
    
    // mutiply the current matrix by the translation
    translate(x: number, y: number, z: number)
    {
        var trans = [[1, 0, 0, x], [0, 1, 0, y], [0, 0, 1, z], [0, 0, 0, 1]];
        this.ctm = this.mult(this.ctm,trans);
    }

    // helper method for matrix multiplication 
    mult(x: number[][],y: number[][]){

        var mul= 
        [[x[0][0]*y[0][0] + x[0][1]*y[1][0] + x[0][2]*y[2][0] + x[0][3]*y[3][0], x[0][0]*y[0][1] + x[0][1]*y[1][1] + x[0][2]*y[2][1] + x[0][3]*y[3][1], x[0][0]*y[0][2] + x[0][1]*y[1][2] + x[0][2]*y[2][2] + x[0][3]*y[3][2], x[0][0]*y[0][3] + x[0][1]*y[1][3] + x[0][2]*y[2][3] + x[0][3]*y[3][3]],
        [x[1][0]*y[0][0] + x[1][1]*y[1][0] + x[1][2]*y[2][0] + x[1][3]*y[3][0], x[1][0]*y[0][1] + x[1][1]*y[1][1] + x[1][2]*y[2][1] + x[1][3]*y[3][1], x[1][0]*y[0][2] + x[1][1]*y[1][2] + x[1][2]*y[2][2] + x[1][3]*y[3][2], x[1][0]*y[0][3] + x[1][1]*y[1][3] + x[1][2]*y[2][3] + x[1][3]*y[3][3]],
        [x[2][0]*y[0][0] + x[2][1]*y[1][0] + x[2][2]*y[2][0] + x[2][3]*y[3][0], x[2][0]*y[0][1] + x[2][1]*y[1][1] + x[2][2]*y[2][1] + x[2][3]*y[3][1], x[2][0]*y[0][2] + x[2][1]*y[1][2] + x[2][2]*y[2][2] + x[2][3]*y[3][2], x[2][0]*y[0][3] + x[2][1]*y[1][3] + x[2][2]*y[2][3] + x[2][3]*y[3][3]],
        [x[3][0]*y[0][0] + x[3][1]*y[1][0] + x[3][2]*y[2][0] + x[3][3]*y[3][0], x[3][0]*y[0][1] + x[3][1]*y[1][1] + x[3][2]*y[2][1] + x[3][3]*y[3][1], x[3][0]*y[0][2] + x[3][1]*y[1][2] + x[3][2]*y[2][2] + x[3][3]*y[3][2], x[3][0]*y[0][3] + x[3][1]*y[1][3] + x[3][2]*y[2][3] + x[3][3]*y[3][3]]];

        return mul;
    }
    
    // mutiply the current matrix by the scale
    scale(x: number, y: number, z: number)
    {
        var sc = [[x, 0, 0, 0], [0, y, 0, 0], [0, 0, z, 0], [0, 0, 0, 1]];
        this.ctm = this.mult(this.ctm, sc);
    }
    
    // mutiply the current matrix by the rotation
    rotateX(angle: number)
    {
        var rotx= [[1, 0, 0, 0],
                [0, Math.cos(angle*Math.PI/180), -Math.sin(angle*Math.PI/180), 0],
                [0, Math.sin(angle*Math.PI/180), Math.cos(angle*Math.PI/180), 0],
                [0, 0, 0, 1]];
        this.ctm = this.mult(this.ctm, rotx);
    }
    
    // mutiply the current matrix by the rotation
    rotateY(angle: number)
    {
        var roty= [[Math.cos(angle*Math.PI/180), 0, Math.sin(angle*Math.PI/180), 0],
                [0, 1, 0, 0],
                [-Math.sin(angle*Math.PI/180), 0, Math.cos(angle*Math.PI/180), 0],
                [0, 0, 0, 1]];
        this.ctm = this.mult(this.ctm, roty);
    }
    
    // mutiply the current matrix by the rotation
    rotateZ(angle: number)
    {
        var rotz= [[Math.cos(angle*Math.PI/180), -Math.sin(angle*Math.PI/180), 0, 0],
                [Math.sin(angle*Math.PI/180), Math.cos(angle*Math.PI/180), 0, 0],
                [0, 0, 1, 0], [0, 0, 0, 1]];
        this.ctm = this.mult(this.ctm, rotz);
    }

    printMatrix() // was print
    {
        for (let i = 0; i<this.ctm.length; i++){
            console.log(this.ctm[i][0] + ", " + this.ctm[i][1] + ", " + this.ctm[i][2] + ", " + this.ctm[i][3]);
        }
        // end with a blank line!
        console.log("")
    }
}

// a global variable for our state
var myDrawing: MyDrawing

// main function, to keep things together and keep the variables created self contained
function exec() {
    // find our container
    var div = document.getElementById("drawing");

    if (!div) {
        console.warn("Your HTML page needs a DIV with id='drawing'")
        return;
    }

    // create a Drawing object
    myDrawing = new MyDrawing(div);
    myDrawing.render()
}

exec()