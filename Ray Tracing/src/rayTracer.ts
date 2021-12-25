// classes you may find useful.  Feel free to change them if you don't like the way
// they are set up.

// Hane Yie 
// A3a 

export class Vector {
    constructor(public x: number,
                public y: number,
                public z: number) {
    }
    static times(k: number, v: Vector) { return new Vector(k * v.x, k * v.y, k * v.z); }
    static minus(v1: Vector, v2: Vector) { return new Vector(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z); }
    static plus(v1: Vector, v2: Vector) { return new Vector(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z); }
    static dot(v1: Vector, v2: Vector) { return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z; }
    static mag(v: Vector) { return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z); }
    static norm(v: Vector) {
        var mag = Vector.mag(v);
        var div = (mag === 0) ? Infinity : 1.0 / mag;
        return Vector.times(div, v);
    }
    static cross(v1: Vector, v2: Vector) {
        return new Vector(v1.y * v2.z - v1.z * v2.y,
                          v1.z * v2.x - v1.x * v2.z,
                          v1.x * v2.y - v1.y * v2.x);
    }
}

export class Color {
    constructor(public r: number,
                public g: number,
                public b: number) {
    }
    static scale(k: number, v: Color) { return new Color(k * v.r, k * v.g, k * v.b); }
    static plus(v1: Color, v2: Color) { return new Color(v1.r + v2.r, v1.g + v2.g, v1.b + v2.b); }
    static times(v1: Color, v2: Color) { return new Color(v1.r * v2.r, v1.g * v2.g, v1.b * v2.b); }
    static white = new Color(1.0, 1.0, 1.0);
    static grey = new Color(0.5, 0.5, 0.5);
    static black = new Color(0.0, 0.0, 0.0);
    static toDrawingColor(c: Color) {
        var legalize = (d: number) => d > 1 ? 1 : d;
        return {
            r: Math.floor(legalize(c.r) * 255),
            g: Math.floor(legalize(c.g) * 255),
            b: Math.floor(legalize(c.b) * 255)
        }
    }
}

interface Ray {
    start: Vector;
    dir: Vector;
}

// helper classes, Light and Spheres to be accessed in methods with same parameters
export class Light {
    constructor(public r: number, public g: number, public b: number, public x: number, public y: number, public z: number) {}
}

export class Camera {
    u: Vector;
    v: Vector;
    w: Vector;
    start: Vector;
    //dir: Vector;
    constructor(pos: Vector, look: Vector, up: Vector ) {
        up = new Vector (0.0, -1.0, 0.0);
        this.w = Vector.norm(Vector.minus(pos, look));
        this.u = Vector.norm(Vector.cross(this.w, up));
        this.v = Vector.norm(Vector.cross(this.w, this.u));
        this.start = pos;
    }
}

export class Spheres {
    constructor(public x: number, public y: number, public z: number, public radius: number, 
        public dr: number, public dg: number, public db: number, 
        public k_ambient: number, public k_specular: number, public specular_pow: number) {
    }
}

// A class for our application state and functionality
class RayTracer {
    // the constructor paramater "canv" is automatically created 
    // as a property because the parameter is marked "public" in the 
    // constructor parameter
    // canv: HTMLCanvasElement
    //
    // rendering context for the canvas, also public
    // ctx: CanvasRenderingContext2D

    // initial color we'll use for the canvas
    canvasColor = "lightyellow"

    canv: HTMLCanvasElement
    ctx: CanvasRenderingContext2D 
    spheres: Spheres[];
    amb: Light;
    lights: Light[];
    fov: number;
    camera: Camera;
    newVec: Vector;
    back: Color;

    // div is the HTMLElement we'll add our canvas to
    // width, height are the size of the canvas
    // screenWidth, screenHeight are the number of pixels you want to ray trace
    //  (recommend that width and height are multiples of screenWidth and screenHeight)
    constructor (div: HTMLElement,
        public width: number, public height: number, 
        public screenWidth: number, public screenHeight: number) {

        // let's create a canvas and to draw in
        this.canv = document.createElement("canvas");
        this.ctx = this.canv.getContext("2d")!;
        this.spheres = [];
        this.amb = new Light (0, 0, 0, 0, 0, 0);
        this.lights = [];
        this.fov = 0;
        this.newVec = new Vector (0, 0, 0);
        this.camera = new Camera(this.newVec, this.newVec, this.newVec);
        this.back = new Color(0, 0, 0);
        
        if (!this.ctx) {
            console.warn("our drawing element does not have a 2d drawing context")
            return
        }
 
        div.appendChild(this.canv);

        this.canv.id = "main";
        this.canv.style.width = this.width.toString() + "px";
        this.canv.style.height = this.height.toString() + "px";
        this.canv.width  = this.width;
        this.canv.height = this.height;
    }

    // API Functions you should implement

    // clear out all scene contents
    reset_scene() {
        this.spheres = [];
        this.amb = new Light (0, 0, 0, 0, 0, 0);
        this.lights = [];
        this.fov = 0;
        this.camera = new Camera(this.newVec, this.newVec, this.newVec);
        this.back = new Color(0, 0, 0);
    }

    // create a new point light source
    new_light (r: number, g: number, b: number, x: number, y: number, z: number) {
        this.lights.push(new Light(r, g, b, x, y, z));
    }

    // set value of ambient light source
    ambient_light (r: number, g: number, b: number) {
        this.amb.r = r;
        this.amb.g = g;
        this.amb.b = b;
        //this.amb.push(new Light(r, g, b, 0, 0, 0));
    }

    // set the background color for the scene
    set_background (r: number, g: number, b: number) {
        this.back.r = r;
        this.back.g = g;
        this.back.b = b;
    }

    // set the field of view
    DEG2RAD = (Math.PI/180)
    set_fov (theta: number) {
        this.fov = this.DEG2RAD * theta;
    }

    // set the virtual camera's position and orientation
    // x1,y1,z1 are the camera position
    // x2,y2,z2 are the lookat position
    // x3,y3,z3 are the up vector
    set_eye(x1: number, y1: number, z1: number, 
            x2: number, y2: number, z2: number, 
            x3: number, y3: number, z3: number) {
        var cam = new Vector(x1, y1, z1);
        var look = new Vector(x2, y2, z2);
        var up = new Vector(x3, y3, z3);
        this.camera = new Camera(cam, look, up);
    }

    // create a new sphere
    new_sphere (x: number, y: number, z: number, radius: number, 
                dr: number, dg: number, db: number, 
                k_ambient: number, k_specular: number, specular_pow: number) {
        this.spheres.push(new Spheres(x, y, z, radius, dr, dg, db, k_ambient, k_specular, specular_pow));
    }

    // INTERNAL METHODS YOU MUST IMPLEMENT

    // create an eye ray based on the current pixel's position
    private eyeRay(i: number, j: number): Ray {
        var u = -1 + (2 * i) / this.screenWidth;
        var v = -1 + (2 * j) / this.screenHeight;
        var w = 1 /Math.tan(this.fov/2);

        var start = this.camera.start;
        var dir = Vector.plus(Vector.times(u,this.camera.u), Vector.times(-v, this.camera.v));

        var ret: Ray = {
            start: start,
            dir: Vector.plus(dir, Vector.times(-w,this.camera.w)),
        }
        return ret;
    }

    private traceRay(ray: Ray, depth: number = 0): Color {
        var sph;
        var pos; 
        var cam;
        var sphV;
        var light;
        var ref;
        var spec = 0;
        var r = 0;
        var g = 0;
        var b = 0;
        var t = 0;
        
        for (var i = 0; i < this.spheres.length; i++) {
            var sp = this.spheres[i];
            if (this.inter(sp, ray) != 99) {
                // current sphere calculation, based on piazza
                if (!(this.inter(sp, ray) >= t && t > 0)) {
                    sph = sp;
                    pos = Vector.plus(ray.start, Vector.times(this.inter(sp, ray), ray.dir)); 
                    t = this.inter(sp, ray);
                }
            }
        }
        
        if (ray != null && sph != null && pos != null) {
            sphV = new Vector (sph.x, sph.y, sph.z);
            var n = Vector.norm(Vector.minus(pos, sphV));
            cam = Vector.norm(Vector.minus(this.camera.start, pos));
            
            for (var j = 0; j < this.lights.length; j++) {
                var li = this.lights[j];
                // Vector.times(X, pos) used to test shadows
                light = Vector.norm(Vector.minus(new Vector(li.x, li.y, li.z), Vector.times(1, pos)));
                ref = Vector.minus(Vector.times(2 * Vector.dot(n, light), n), light);

                // piazza suggestion to debug scene 2 (random light in the shadow)
                if (Vector.dot(ref, light) <= 0){
                    spec = 0;
                } else {
                spec = Math.pow(Vector.dot(cam, ref), sph.specular_pow);
                }
                var lmult = Vector.dot(n, light);
                var smult = sph.k_specular * spec;
                // changed variables (trial and error) until test cases matched the given results 
                // the intended goal was combination of ambient, diffused, and specular as instructed
                r += sph.dr * ((li.r * lmult) + (sph.k_ambient * this.amb.r)) + smult*li.r;
                g += sph.dg * ((li.g * lmult) + (sph.k_ambient * this.amb.g)) + smult*li.g;
                b += sph.db * ((li.b * lmult) + (sph.k_ambient * this.amb.b)) + smult*li.b;
            }
            return new Color(r, g, b);
        } else {
            return new Color (this.back.r, this.back.g, this.back.b);
        }
    }

    // helper method
    private inter(s: Spheres, r: Ray) {
        var a = Vector.dot(r.dir, r.dir);
        var sphv = new Vector(s.x, s.y, s.z);
        var bP = Vector.minus(r.start, sphv);
        var b = 2 * Vector.dot(bP, r.dir); 
        var c = Vector.dot(bP, bP) - Math.pow(s.radius, 2);
        var d = Math.pow(b,2) - (4* a *c);
        if(d >= 0){
            // select greater value  
            if ((-b + Math.sqrt(d)) /(2* a) < (-b - Math.sqrt(d)) /(2* a)) {
                return (-b + Math.sqrt(d)) /(2* a);
            } else {
                return (-b - Math.sqrt(d)) /(2* a);
            }
        } else {
            // rand num for if condition in traceRay
            return 99;
        }
    }

    // draw_scene is provided to create the image from the ray traced colors. 
    // 1. it renders 1 line at a time, and uses requestAnimationFrame(render) to schedule 
    //    the next line.  This causes the lines to be displayed as they are rendered.
    // 2. it uses the additional constructor parameters to allow it to render a  
    //    smaller # of pixels than the size of the canvas
    draw_scene() {

        // rather than doing a for loop for y, we're going to draw each line in
        // an animationRequestFrame callback, so we see them update 1 by 1
        var pixelWidth = this.width / this.screenWidth;
        var pixelHeight = this.height / this.screenHeight;
        var y = 0;
        
        this.clear_screen();

        var renderRow = () => {
            for (var x = 0; x < this.screenWidth; x++) {

                var ray = this.eyeRay(x, y);
                var c = this.traceRay(ray);

                var color = Color.toDrawingColor(c)
                this.ctx.fillStyle = "rgb(" + String(color.r) + ", " + String(color.g) + ", " + String(color.b) + ")";
                this.ctx.fillRect(x * pixelWidth, y * pixelHeight, pixelWidth+1, pixelHeight+1);
            }
            
            // finished the row, so increment row # and see if we are done
            y++;
            if (y < this.screenHeight) {
                // finished a line, do another
                requestAnimationFrame(renderRow);            
            } else {
                console.log("Finished rendering scene")
            }
        }

        renderRow();
    }

    clear_screen() {
        this.ctx.fillStyle = this.canvasColor;
        this.ctx.fillRect(0, 0, this.canv.width, this.canv.height);

    }
}
export {RayTracer}