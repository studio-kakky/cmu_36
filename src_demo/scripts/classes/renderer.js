class Renderer {
  constructor(world) {

    this.world = world;
    this.maxVertices = 61000;
    this.currentVertex = 0;

    var geometry = new THREE.BufferGeometry();
    geometry.dynamic = true;

    this.setPositionArray();
    this.setColorArray();

    geometry.addAttribute('position', new THREE.BufferAttribute(this.positions,3));
    geometry.addAttribute('color',new THREE.BufferAttribute(this.colors,3));

    this.buffer = new THREE.LineSegments(geometry, new THREE.LineBasicMaterial({vertexColors:THREE.VertexColors}));
  }

  setPositionArray(){
    this.positions = new Float32Array(this.maxVertices*3);
    for(var i = 0, l = this.maxVertices*3; i < l; i++){
      this.positions[i] = 0;
    }
  }

  setColorArray(){
    this.colors = new Float32Array(this.maxVertices*3);
    for(var i = 0, l = this.maxVertices*3; i < l; i++){
      this.colors[i] = 255;
    }
  }

  collapseBuffer(){
    var start = this.currentVertex*3;
    for ( var i = start,l = this.maxVertices*3; i < l; i++) {
      this.positions[i] = 0;
      this.colors[i] = 0;
    }
  }

  insertLine(x1,y1,x2,y2,color){
    var i = this.currentVertex;
    var threel = i*3;
    var rgb;

    if (typeof color === "undefined") {
      rgb = hexToRgb(0xffffff);
    } else {
      rgb = hexToRgb(color);
    }
    this.positions[threel] = x1;
    this.positions[threel+1] = y1;
    this.positions[threel+2] = 0;

    this.colors[threel] = rgb.r;
    this.colors[threel+1] = rgb.g;
    this.colors[threel+2] = rgb.b;

    i++;
    threel = i*3;

    this.positions[threel] = x2;
    this.positions[threel+1] = y2;
    this.positions[threel+2] = 0;

    this.colors[threel] = rgb.r;
    this.colors[threel+1] = rgb.g;
    this.colors[threel+2] = rgb.b;

    this.currentVertex += 2;

  }

  draw(){
    this.currentVertex = 0;
    var removeBodyIndex = [];

    var body,vertices, position, transform;

    for(var i = 0, l = this.world.bodies.length; i < l; i++ ) {
      body = this.world.bodies[i];
      vertices = body.fixtures[0].shape.vertices;
      position = body.GetPosition();
      transform = body.GetTransform();
      if (position.y < -40) { removeBodyIndex.push(key); }
      else {
        for (var n = 0, nl = vertices.length; n < nl; n++) {
          if ( n === nl - 1) {
            this.insertLineToBuffer(vertices[n], vertices[0], transform,body.color);
          }
          else {
            this.insertLineToBuffer(vertices[n], vertices[n+1], transform,body.color);
          }
        }
      }
    }

    removeBodyIndex.forEach((value,key)=> {
      this.world.bodies.splice((value - key), 1);
    });

    this.world.particleSystems.forEach((particleSystem)=> {
      this.drawParticle(particleSystem, 3);
    });

    this.collapseBuffer();
    this.buffer.geometry.getAttribute('position').needsUpdate = true;
    this.buffer.geometry.getAttribute('color').needsUpdate = true;
  }

  insertLineToBuffer(v1,v2,transform,color) {
    var transformedV1 = new b2Vec2();
    var transformedV2 = new b2Vec2();

    b2Vec2.Mul(transformedV1,transform,v1);
    b2Vec2.Mul(transformedV2,transform,v2);

    this.insertLine(transformedV1.x,transformedV1.y,transformedV2.x,transformedV2.y,color);
  }

  drawParticle(particleSystem,dimension) {
    var particleBuffer = particleSystem.GetPositionBuffer();
    var radius = particleSystem.radius;

    for (var i = 0, l = particleBuffer.length; i < l; i += 2) {
      this.insertParticleLIne(particleBuffer[i], particleBuffer[i+1], dimension, radius);
    }
  }

  insertParticleLIne(x,y,dimension,radius) {
    var radstep = Math.PI*2/(dimension);
    for(var i = 0, l = dimension; i < l; i++) {
      var rad1 =  radstep * i - radstep;
      var rad2 = radstep * (i+1) - radstep;
      var vx1 = radius * Math.cos(rad1) + x;
      var vy1 = radius * Math.sin(rad1) + y;
      var vx2 = radius * Math.cos(rad2) + x;
      var vy2 = radius * Math.sin(rad2) + y;

      this.insertLine(vx1,vy1,vx2,vy2);
    }
  }
}
