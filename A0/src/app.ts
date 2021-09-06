// library source and docs at https://github.com/Qix-/color
import  Color, { rgb }  from 'color'

// a simple implementation of a circular buffer for holding 
// a fixed size set of points in PointSet
import * as ps from './pointset';

// simple convenience 
function randomColor() {
    return Color({
        r: Math.random() * 255, 
        g: Math.random() * 255, 
        b: Math.random() * 255
    })

}

// yes, it's one line, but it's one less thing for you to figure out
function darken(color: Color) {
    return color.darken(0.25)   // creates a new color
}

// an interface that describes what our Rectangle object might look like.  
// Remember, a Typescript interface is just a description of the required
// properties (and methods, although we don't use methods here) an object
// must implement.  It is not a class or an object itself.
interface Rectangle {
    p1: ps.MousePosition;
    p2: ps.MousePosition;
    color: Color;
}

interface Triangle {
    t1: ps.MousePosition;
    t2: ps.MousePosition;
    t3: ps.MousePosition;
    colo: Color;
}

// A class for our application state and functionality
class Drawing {
    // the constructor paramater "canv" is automatically created 
    // as a property because the parameter is marked "public" in the 
    // constructor parameter
    //    canv: HTMLCanvasElement
    //
    // rendering context for the canvas, also public
    //    ctx: CanvasRenderingContext2D

    // some suggested properties you might use in your implementation
    mousePosition: ps.MousePosition | null = null;
    clickStart: ps.MousePosition | null = null;
    rects: Array <Rectangle>;   // an array that only contains objects that
                                // satisfy the Rectangle interface
    points: ps.PointSet;
    col: Array <Color>;
    tri: Array <Triangle>;


    // a simple wrapper to reliably get the offset within an DOM element
    // We need this because the mouse position in the mouse event is
    // relative to the Window, but we want to specify draw coordinates
    // relative to the canvas DOM element  
    // see: http://www.jacklmoore.com/notes/mouse-position/
    static offset(e: MouseEvent): ps.MousePosition {
        e = e || <MouseEvent> window.event;

        var target = <Element> (e.target || e.srcElement),
            rect = target.getBoundingClientRect(),
            offsetX = e.clientX - rect.left,
            offsetY = e.clientY - rect.top;

        return {x: offsetX, y: offsetY};
    }

    // Web pages are reactive; Javascript is single threaded, and all 
    // javascript code in your page is executed in response to 
    // some action.   Actions include
    // - by the user (various callbacks like mouse and keyboard callback)
    // - by timers (we can use a timeout function to execute something in
    //   the future)
    // - things like network actions (e.g., fetch this resource, call this
    //   code when it's been retrieved)
    // - a callback synchronized with the next display refresh rate 
    //   that was created for doing animation
    // 
    // We use the this last one, triggered by a call to 
    //      requestAnimationFrame(() => this.render());
    // to do continuous rendering.  The requestAnimationFrame has one
    // parameter, a function.  The "() => this.render()" syntax is a 
    // shorthand for writing inline functions.  It says "this is a function
    // with no parameters" ("() =>") whose body is one line of code, the 
    // "this.render()" call.  It could also be
    //              requestAnimationFrame(() => {
    //                   this.render()
    //                });
    // where the function body is betwee {} and we could write more methods.


    render() {
        // Store the current drawing transformation matrix (and other state)
        this.ctx.save();
        
        // Use the identity matrix while clearing the canvas (just in case you change it someday!)
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.fillStyle = "lightgrey";
        this.ctx.fillRect(0, 0, this.canv.width, this.canv.height);
        
        // Restore the transform
        this.ctx.restore();        

        // **** TODO *****
        // if the mouse is over the canvas, it's position is here, otherwise it's null
        // add code to deal with the mouse position each render frame
        if (this.mousePosition) {
            //this.ctx.fillStyle = "blue";
            var cw = this.canv.width;
            var ch = this.canv.height;
            if (this.points.length<= cw || this.points.length <= ch){
                this.points.addPoint(this.mousePosition);
            } 
        } else {
            this.mousePosition = null;
        }

        // add code to draw rectangles we have so far at the back
    
        this.rects.forEach((value: Rectangle, index: number, Array: Rectangle[]) => {
            var w = value.p2.x-value.p1.x;
            var h = value.p2.y-value.p1.y;
            this.ctx.strokeStyle="black";
            this.ctx.lineWidth = 5;
            this.ctx.strokeRect(value.p1.x, value.p1.y, w, h);
            
            this.ctx.beginPath();
            this.ctx.moveTo(value.p1.x, value.p1.y+(h/2));
            this.ctx.lineTo(value.p2.x-(w/2), value.p2.y);
            this.ctx.lineTo(value.p2.x-(w/2), value.p2.y-h);
            this.ctx.lineTo(value.p1.x, value.p1.y+(h/2));
            //this.ctx.fillStyle= randomColor().toString();
            this.ctx.fill();

            this.ctx.moveTo(value.p1.x+w, value.p1.y+(h/2));
            this.ctx.lineTo(value.p2.x-(w/2), value.p2.y);
            this.ctx.stroke();
            this.ctx.lineTo(value.p2.x-(w/2), value.p2.y-h);
            this.ctx.lineTo(value.p1.x+w, value.p1.y+(h/2))
            this.ctx.stroke();

            /*for (var i=10 ; i < 255; i++){
                var co = rgb(i^2,i^2,i^2).toString();
                this.ctx.fillStyle= co;
            }*/

            //this.ctx.fillStyle= randomColor().toString();
            //var myColor = randomColor();
            //color : myColor;
            this.ctx.fillStyle = rgb(w, h, 100).toString();
            this.ctx.fill();
            
            this.ctx.beginPath();
            this.ctx.fillStyle= 'lightgrey'; 
            this.ctx.fillRect(value.p1.x+(w/4), value.p1.y + (h/4), w/2, h/2);
            this.ctx.strokeRect(value.p1.x+(w/4), value.p1.y + (h/4), w/2, h/2);
            
            
            this.ctx.moveTo(value.p1.x, value.p2.y);
            this.ctx.lineTo(value.p2.x, value.p1.y);
            this.ctx.stroke();

            this.ctx.moveTo(value.p1.x, value.p1.y);
            this.ctx.lineTo(value.p2.x, value.p2.y);
            this.ctx.stroke();
        })


        //this.rects.length;
        
        // add code to draw points with the oldest ones more transparent 

        if (this.points){
            for (let i = 0; i < this.points.length; i++){
                this.ctx.fillStyle = rgb(0, 0, 100, i* 0.05).toString();
                //var j = this.points.addPoint(i);
                var j = this.points.getPoint(i);
                this.ctx.fillRect(j.x,j.y,5,5);
            }
        }

        // if we've clicked, add code draw the rubber band
        if (this.clickStart) {
            this.ctx.strokeStyle='grey';
            this.ctx.lineWidth = 3;
            //this.moustPosition could be null error
            this.ctx.strokeRect(this.clickStart.x, this.clickStart.y, 
                this.mousePosition.x- this.clickStart.x, this.mousePosition.y - this.clickStart.y);
            
            //this.ctx.fillStyle = 'lightgrey';
            //const a = this.clickStart;
            //const b = this.mousePosition;
            //this.ctx.fillRect(a.x-5, a.y-5, b.x-a.x, b.y-a.y);
            //this.ctx.fillStyle = "black"
            //this.ctx.fillRect(a.x-5, a.y-5, 2, b.y-a.y);
            //this.ctx.fillRect(a.x-5, a.y-5, b.x-a.x, 2);
            //this.ctx.fillRect(b.x-5, a.y-5, 2, b.y-a.y);
            //this.ctx.fillRect(a.x-5, b.y-5, b.x-a.x, 2);
        } 

        // do it again!  and again!  AND AGAIN!  AND ...       
        requestAnimationFrame(() => this.render());
    }
    
    constructor (public canv: HTMLCanvasElement, public ctx: CanvasRenderingContext2D) {
        this.ctx = ctx
        this.rects = new Array(0)  // 0 sized array
        this.tri = new Array(0);
        this.col = new Array (0);
        this.points = new ps.PointSet()
 

        // All interaction in browsers is done via event handlers.  Setting
        // "onmousedown", "onmouseup", "onmousemove", and "onmouseout" on
        // the Canvas DOM element to a function will cause that function to
        // be called when the appropriate action happens.

        canv.onmousedown = (ev: MouseEvent) => {
            // this method is called when a mouse button is pressed.
            var mousePosition = Drawing.offset(ev);   
            this.clickStart = mousePosition        
            this.mousePosition = mousePosition
        }
        
        canv.onmouseup = (ev: MouseEvent) => {
            // this method is called when a mouse button is released.
            const clickEnd = Drawing.offset(ev);
            // **** TODO *****
            // add code here to react to mouse up events
            var a = this.clickStart;
            this.clickStart = null;
            let rect : Rectangle = {p1: a, p2: this.mousePosition, color: randomColor()}
            this.rects.push(rect);
        }
        
        canv.onmousemove = (ev: MouseEvent) => {
            // this method is called when the mouse moves.   
            const mouse = Drawing.offset(ev);
            this.mousePosition = mouse 
        }
        
        canv.onmouseout = (ev: MouseEvent) => {
            // this method is called when the mouse goes out of
            // the window.  
            this.mousePosition = null;
            this.clickStart = null;
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

    // let's create a canvas and to draw in
    var canv = document.createElement("canvas");
    let ctx = canv.getContext("2d");
    if (!ctx) {
        console.warn("our drawing element does not have a 2d drawing context")
        return
    }
    
    div.appendChild(canv);

    canv.id = "main";
    canv.style.width = "100%";
    canv.style.height = "100%";
    canv.width  = canv.offsetWidth;
    canv.height = canv.offsetHeight;

    window.addEventListener('resize', (event) => {
        canv.width  = canv.offsetWidth;
        canv.height = canv.offsetHeight;
    });
    

    // create a Drawing object
    myDrawing = new Drawing(canv, ctx);
    
    // kick off the rendering!
    myDrawing.render(); 
}

exec()