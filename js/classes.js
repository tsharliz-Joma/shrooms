class Shroom {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.r = 0.5;
    this.heading = random(360);
    this.rotAngle = 45;
    this.sensorAngle = 45;
    this.sensorDistance = 10;

    // Variables for sensing components
    // A vector is a class that can hold 2 values in p5.js
    this.rSensorPosition = createVector(0, 0);
    this.lSensorPosition = createVector(0, 0);
    this.fSensorPosition = createVector(0, 0);

    // Coordination coordinates
    this.vx = cos(this.heading);
    this.vy = sin(this.heading);
  }

  update() {
    this.vx = cos(this.heading);
    this.vy = sin(this.heading);

    this.x = (this.x + this.vx + width) % width;
    this.y = (this.y + this.vy + height) % height;

    this.getSensorPosition(
      this.rSensorPosition,
      this.heading + this.sensorAngle,
    );
    this.getSensorPosition(
      this.lSensorPosition,
      this.heading - this.sensorAngle,
    );
    this.getSensorPosition(
      this.fSensorPosition,
      this.heading + this.sensorAngle,
    );

    let index;
    let l;
    let r;
    let f;
    // GET COLOR VALUES THAT IS LOCATED AT THE SENSOR POSITION
    index =
      4 * (d * floor(this.rSensorPosition.y)) * (d * width) +
      4 * (d * floor(this.rSensorPosition.x));
    r = pixels[index];

    index =
      4 * (d * floor(this.lSensorPosition.y)) * (d * width) +
      4 * (d * floor(this.lSensorPosition.x));
    l = pixels[index];

    index =
      4 * (d * floor(this.fSensorPosition.y)) * (d * width) +
      4 * (d * floor(this.fSensorPosition.x));
    f = pixels[index];

    //    CONDITIONS TO COMPARE AND TO FIND OUT WHICH SENSOR IS FURTHEST AWAY aka FIND WHICH WAY TO NOT MOVE, IF SOMETHING IS OBSTRUCTING THE PATH, TURN AWAY FROM IT
    if (f > 1 && f > r) {
      this.heading += 0;
    } else if (f < l && f < r) {
      if (random(1) < 0.5) {
        this.heading += this.rotAngle;
      }
    } else if (l > r) {
      this.heading += -this.rotAngle;
    } else if (r > l) {
      this.heading += this.rotAngle;
    }
  }

  //   Method to display the mold
  display() {
    noStroke();
    fill(255);
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
    

    //  Direction of the mold
    // line(
    //   this.x,
    //   this.y,
    //   this.x + this.r * 3 * this.vx,
    //   this.y + this.r * 3 * this.vy,
    // );

    // // SENSOR DOTS
    // fill(255, 0, 0);
    // ellipse(
    //   this.fSensorPosition.x,
    //   this.fSensorPosition.y,
    //   this.r * 2,
    //   this.r * 2,
    // );
    // ellipse(
    //   this.lSensorPosition.x,
    //   this.lSensorPosition.y,
    //   this.r * 2,
    //   this.r * 2,
    // );
    // ellipse(
    //   this.rSensorPosition.x,
    //   this.rSensorPosition.y,
    //   this.r * 2,
    //   this.r * 2,
    // );
  }

  getSensorPosition(sensor, angle) {
    // These equations are how we convert to coordinatiOn coordinates
    // //   LEFT SENSOR
    // this.lSensorPosition.x =
    //   this.x + this.sensorDistance * cos(this.heading - this.sensorAngle);
    // this.lSensorPosition.y =
    //   this.y + this.sensorDistance * sin(this.heading - this.sensorAngle);

    // //   RIGHT SENSOR
    // this.rSensorPosition.x =
    //   this.x + this.sensorDistance * cos(this.heading + this.sensorAngle);
    // this.rSensorPosition.y =
    //   this.y + this.sensorDistance * sin(this.heading + this.sensorAngle);

    // //   FRONT SENSOR
    // this.fSensorPosition.x =
    //   this.x + this.sensorDistance * cos(this.heading + this.sensorAngle);
    // this.fSensorPosition.y =
    //   this.y + this.sensorDistance * sin(this.heading + this.sensorAngle);

    sensor.x = (this.x + this.sensorDistance * cos(angle) + width) % width;
    sensor.y = (this.y + this.sensorDistance * sin(angle) + height) % height;
  }
}
