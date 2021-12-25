// Matrix Commands (for you to write!)

// You should modify the routines listed below to complete the assignment.
// Feel free to define any classes, global variables and helper routines that
// you need.

var i00: number; var i01: number; var i02: number; var i03: number;
var i10: number; var i11: number; var i12: number; var i13: number;
var i20: number; var i21: number; var i22: number; var i23: number;
var i30: number; var i31: number; var i32: number; var i33: number;

var ctm: number[][];
var nctm: number[][];
var sc: number[][];

// set the current matrix to the identity
function init()
{ 
    i00= 1; i01= 0; i02= 0; i03= 0;
    i10= 0; i11= 1; i12= 0; i13= 0;
    i20= 0; i21= 0; i22= 1; i23= 0;
    i30= 0; i31= 0; i32= 0; i33= 1;
    
    ctm = [[i00, i10, i20, i30],[i01, i11, i21, i31], [i02, i12, i22, i32],[i03, i13, i23, i33]];
}

// multiply the current matrix by the translation
function translate(x: number, y: number, z: number)
{
    i03 = i03 + x;
    i13 = i13 + y;
    i23 = i23 + z;
    ctm = [[i00, i10, i20, i30],[i01, i11, i21, i31], [i02, i12, i22, i32],[i03, i13, i23, i33]];
}

// multiply the current matrix by the scale
function scale(x: number, y: number, z: number)
{
    i00 = x*i00;  
    i11 = y*i11; 
    i22 = z*i22;
    ctm = [[i00, i10, i20, i30],[i01, i11, i21, i31], [i02, i12, i22, i32],[i03, i13, i23, i33]];
}

// 4x4 matrix multiplication helper
function mult(
    x0: number, x4: number, x8: number, x12: number,
    x1: number, x5: number, x9: number, x13: number,
    x2: number, x6: number, x10: number, x14: number,
    x3: number, x7: number, x11: number, x15: number,
    
    y0: number, y4: number, y8: number, y12: number,
    y1: number, y5: number, y9: number, y13: number,
    y2: number, y6: number, y10: number, y14: number,
    y3: number, y7: number, y11: number, y15: number,){

    nctm = 
    [
    [x0*y0 + x4*y1 + x8*y2 + x12*y3, x0*y4 + x4*y5 + x8*y6 + x12*y7, x0*y8 + x4*y9 + x8*y10 + x12*y11, x0*y12 + x4*y13 + x8*y14 + x12*y15],
    [x1*y0 + x5*y1 + x9*y2 + x13*y3, x1*y4 + x5*y5 + x9*y6 + x13*y7, x1*y8 + x5*y9 + x9*y10 + x13*y11, x1*y12 + x5*y13 + x9*y14 + x13*y15],
    [x2*y0 + x6*y1 + x10*y2 + x14*y3, x2*y4 + x6*y5 + x10*y6 + x14*y7, x2*y8 + x6*y9 + x10*y10 + x14*y11, x2*y12 + x6*y13 + x10*y14 + x14*y15],
    [x3*y0 + x7*y1 + x11*y2 + x15*y3, x3*y4 + x7*y5 + x11*y6 + x15*y7, x3*y8 + x7*y9 + x11*y10 + x15*y11, x3*y12 + x7*y13 + x11*y14 + x15*y15]
    ];

    ctm = nctm;
}


// multiply the current matrix by the rotation
function rotateX(angle: number)
{
    mult(i00, i01, i02, i03, i10, i11, i12, i13, i20, i21, i22, i23, i30, i31, i32, i33,
        1,0, 0, 0, 0,Math.cos(angle*Math.PI/180),Math.sin(angle*Math.PI/180),0, 0, -Math.sin(angle*Math.PI/180), Math.cos(angle*Math.PI/180), 0,0, 0, 0, 1 );
}

// multiply the current matrix by the rotation
function rotateY(angle: number)
{
    mult(i00, i01, i02, i03, i10, i11, i12, i13, i20, i21, i22, i23, i30, i31, i32, i33,
        Math.cos(angle*Math.PI/180), 0, -Math.sin(angle*Math.PI/180),0, 0, 1, 0, 0, Math.sin(angle*Math.PI/180), 0, Math.cos(angle*Math.PI/180), 0, 0, 0, 0, 1 );
}

// multiply the current matrix by the rotation
function rotateZ(angle: number)
{
    mult(i00, i01, i02, i03, i10, i11, i12, i13, i20, i21, i22, i23, i30, i31, i32, i33,
       Math.cos(angle*Math.PI/180), Math.sin(angle*Math.PI/180), 0, 0, -Math.sin(angle*Math.PI/180), Math.cos(angle*Math.PI/180),0, 0,0, 0, 1, 0, 0, 0, 0, 1 );
}

// print the current matrix
function print()
{
    // add code here!
    // use `console.log("something")` to print something to the browser console.

    for (let i = 0; i<ctm.length; i++){
        console.log(ctm[0][i] + ", " + ctm[1][i] + ", " + ctm[2][i] + ", " + ctm[3][i]);
    }
    // end with a blank line!
    console.log("")

}

// return the current matrix as an array of 16 numbers
// in row major order (i.e., elements 0..3 are row 1, 4..7 are row2,
// 8..11 are row3, and 12..15 are row4)
function currentMatrix() : number[]
{
    ctm[0][0] = i00; ctm[0][1] = i01; ctm[0][2] = i02; ctm[0][3] = i03;
    ctm[1][0] = i10; ctm[1][1] = i11; ctm[1][2] = i12; ctm[1][3] = i13;
    ctm[2][0] = i20; ctm[2][1] = i21; ctm[2][2] = i22; ctm[2][3] = i23;
    ctm[3][0] = i30; ctm[3][1] = i31; ctm[3][2] = i32; ctm[3][3] = i33;
    return ctm.flat();
}



export {init, translate, scale, rotateX, rotateY, rotateZ, print, currentMatrix}

