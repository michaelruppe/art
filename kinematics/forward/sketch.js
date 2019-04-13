let tentacle;

function setup() {
    let canvas = createCanvas(600, 400);
    canvas.parent('script-holder')

    let x = width/2;
    let y = height;
    let pos = createVector(x, y);

    tentacle = new Segment(pos, 10, 0, 15);

    let current = tentacle;
    for (let i = 0; i < 20; i++) {
        let next = new Segment(current, 15, 0, current.thick*0.9);
        current.child = next;
        current = next;
    }
}

function draw() {
    background(51);

    let next = tentacle;
    while (next) {
        next.wiggle();
        next.update();
        next.show();
        next = next.child;
    }
}


class Segment {
    /* Function overloading by checking the type of data passed to point.
     * point can either be a vector or another segment object.
     */
    constructor(point, len, angle, thick) {
        if (point.hasOwnProperty("angle")) { // point is probably a Segment
            this.par = point;
            this.a = this.par.b.copy();
        } else {
            this.par = false;
            this.a = point;
        }
        this.len = len;
        this.angle = angle;
        this.selfAngle = angle;
        this.calculateB();
        this.thick = thick;   // thickness of segment

        this.xoff = random(1000);
    }

    wiggle() {
        let maxangle = 1;
        let minangle = -1;
        this.selfAngle = map(noise(this.xoff),0,1,maxangle,minangle);
        this.xoff += 0.005;
    }

    update() {
        this.angle = this.selfAngle;
        if (this.par) {
            this.a = this.par.b.copy();
            this.angle += this.par.angle;
        } else {
            this.angle += -PI/2;

        }
        this.calculateB();
    }

    calculateB() {
        let dx = this.len * cos(this.angle);
        let dy = this.len * sin(this.angle);
        this.b = createVector(this.a.x+dx, this.a.y+dy);
    }

    show() {
        stroke(255);
        strokeWeight(this.thick);
        line(this.a.x, this.a.y, this.b.x, this.b.y);
    }
}
