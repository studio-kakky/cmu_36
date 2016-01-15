"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StaticBox = (function () {
  function StaticBox(world, w, h, color) {
    _classCallCheck(this, StaticBox);

    this.setbox2DObject(world, w, h);
    this.box2DObject.color = 0xffffff;
  }

  _createClass(StaticBox, [{
    key: "setPosition",
    value: function setPosition(x, y) {
      this.box2DObject.SetTransform(new b2Vec2(x, y), this.box2DObject.GetAngle());
    }
  }, {
    key: "setAngle",
    value: function setAngle(rad) {
      this.box2DObject.SetTransform(this.box2DObject.GetPosition(), rad);
    }
  }, {
    key: "setbox2DObject",
    value: function setbox2DObject(world, w, h) {
      var gbd = new b2BodyDef();
      this.box2DObject = world.CreateBody(gbd);
      var groundBox = new b2PolygonShape();
      groundBox.SetAsBoxXY(w, h);
      this.box2DObject.CreateFixtureFromShape(groundBox);
    }
  }]);

  return StaticBox;
})();
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x4, _x5, _x6) { var _again = true; _function: while (_again) { var object = _x4, property = _x5, receiver = _x6; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x4 = parent; _x5 = property; _x6 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DynamicBox = (function (_StaticBox) {
  _inherits(DynamicBox, _StaticBox);

  function DynamicBox(world, w, h, x, y) {
    var color = arguments.length <= 5 || arguments[5] === undefined ? 0xff0000 : arguments[5];
    var density = arguments.length <= 6 || arguments[6] === undefined ? 5 : arguments[6];
    var friction = arguments.length <= 7 || arguments[7] === undefined ? 0.1 : arguments[7];

    _classCallCheck(this, DynamicBox);

    _get(Object.getPrototypeOf(DynamicBox.prototype), "constructor", this).call(this, world, w, h, x, y, color);
    this.setbox2DObject(world, w, h, x, y, density, friction);
    this.box2DObject.color = color;
  }

  _createClass(DynamicBox, [{
    key: "setbox2DObject",
    value: function setbox2DObject(world, w, h, x, y, density, friction) {
      var dbd = new b2BodyDef();
      dbd.type = b2_dynamicBody;
      dbd.position.Set(x, y);
      this.box2DObject = world.CreateBody(dbd);
      var dynamicBox = new b2PolygonShape();
      dynamicBox.SetAsBoxXY(w, h);
      var fixtureDef = new b2FixtureDef();
      fixtureDef.shape = dynamicBox;
      fixtureDef.density = density;
      fixtureDef.friction = friction;

      this.box2DObject.CreateFixtureFromDef(fixtureDef);
    }
  }]);

  return DynamicBox;
})(StaticBox);
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Renderer = (function () {
  function Renderer(world) {
    _classCallCheck(this, Renderer);

    this.world = world;
    this.maxVertices = 61000;
    this.currentVertex = 0;

    var geometry = new THREE.BufferGeometry();
    geometry.dynamic = true;

    this.setPositionArray();
    this.setColorArray();

    geometry.addAttribute('position', new THREE.BufferAttribute(this.positions, 3));
    geometry.addAttribute('color', new THREE.BufferAttribute(this.colors, 3));

    this.buffer = new THREE.LineSegments(geometry, new THREE.LineBasicMaterial({ vertexColors: THREE.VertexColors }));
  }

  _createClass(Renderer, [{
    key: 'setPositionArray',
    value: function setPositionArray() {
      this.positions = new Float32Array(this.maxVertices * 3);
      for (var i = 0, l = this.maxVertices * 3; i < l; i++) {
        this.positions[i] = 0;
      }
    }
  }, {
    key: 'setColorArray',
    value: function setColorArray() {
      this.colors = new Float32Array(this.maxVertices * 3);
      for (var i = 0, l = this.maxVertices * 3; i < l; i++) {
        this.colors[i] = 255;
      }
    }
  }, {
    key: 'collapseBuffer',
    value: function collapseBuffer() {
      var start = this.currentVertex * 3;
      for (var i = start, l = this.maxVertices * 3; i < l; i++) {
        this.positions[i] = 0;
        this.colors[i] = 0;
      }
    }
  }, {
    key: 'insertLine',
    value: function insertLine(x1, y1, x2, y2, color) {
      var i = this.currentVertex;
      var threel = i * 3;
      var rgb;

      if (typeof color === "undefined") {
        rgb = hexToRgb(0xffffff);
      } else {
        rgb = hexToRgb(color);
      }
      this.positions[threel] = x1;
      this.positions[threel + 1] = y1;
      this.positions[threel + 2] = 0;

      this.colors[threel] = rgb.r;
      this.colors[threel + 1] = rgb.g;
      this.colors[threel + 2] = rgb.b;

      i++;
      threel = i * 3;

      this.positions[threel] = x2;
      this.positions[threel + 1] = y2;
      this.positions[threel + 2] = 0;

      this.colors[threel] = rgb.r;
      this.colors[threel + 1] = rgb.g;
      this.colors[threel + 2] = rgb.b;

      this.currentVertex += 2;
    }
  }, {
    key: 'draw',
    value: function draw() {
      var _this = this;

      this.currentVertex = 0;
      var removeBodyIndex = [];

      var body, vertices, position, transform;

      for (var i = 0, l = this.world.bodies.length; i < l; i++) {
        body = this.world.bodies[i];
        vertices = body.fixtures[0].shape.vertices;
        position = body.GetPosition();
        transform = body.GetTransform();
        if (position.y < -40) {
          removeBodyIndex.push(key);
        } else {
          for (var n = 0, nl = vertices.length; n < nl; n++) {
            if (n === nl - 1) {
              this.insertLineToBuffer(vertices[n], vertices[0], transform, body.color);
            } else {
              this.insertLineToBuffer(vertices[n], vertices[n + 1], transform, body.color);
            }
          }
        }
      }

      removeBodyIndex.forEach(function (value, key) {
        _this.world.bodies.splice(value - key, 1);
      });

      this.world.particleSystems.forEach(function (particleSystem) {
        _this.drawParticle(particleSystem, 3);
      });

      this.collapseBuffer();
      this.buffer.geometry.getAttribute('position').needsUpdate = true;
      this.buffer.geometry.getAttribute('color').needsUpdate = true;
    }
  }, {
    key: 'insertLineToBuffer',
    value: function insertLineToBuffer(v1, v2, transform, color) {
      var transformedV1 = new b2Vec2();
      var transformedV2 = new b2Vec2();

      b2Vec2.Mul(transformedV1, transform, v1);
      b2Vec2.Mul(transformedV2, transform, v2);

      this.insertLine(transformedV1.x, transformedV1.y, transformedV2.x, transformedV2.y, color);
    }
  }, {
    key: 'drawParticle',
    value: function drawParticle(particleSystem, dimension) {
      var particleBuffer = particleSystem.GetPositionBuffer();
      var radius = particleSystem.radius;

      for (var i = 0, l = particleBuffer.length; i < l; i += 2) {
        this.insertParticleLIne(particleBuffer[i], particleBuffer[i + 1], dimension, radius);
      }
    }
  }, {
    key: 'insertParticleLIne',
    value: function insertParticleLIne(x, y, dimension, radius) {
      var radstep = Math.PI * 2 / dimension;
      for (var i = 0, l = dimension; i < l; i++) {
        var rad1 = radstep * i - radstep;
        var rad2 = radstep * (i + 1) - radstep;
        var vx1 = radius * Math.cos(rad1) + x;
        var vy1 = radius * Math.sin(rad1) + y;
        var vx2 = radius * Math.cos(rad2) + x;
        var vy2 = radius * Math.sin(rad2) + y;

        this.insertLine(vx1, vy1, vx2, vy2);
      }
    }
  }]);

  return Renderer;
})();
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LiquidParticle = (function () {
  function LiquidParticle(world, w, h, x, y) {
    var particleRadius = arguments.length <= 5 || arguments[5] === undefined ? 0.01 : arguments[5];
    var dampingStrength = arguments.length <= 6 || arguments[6] === undefined ? 0.1 : arguments[6];

    _classCallCheck(this, LiquidParticle);

    this.world = world;
    this.setBox2Dobject(w, h, x, y, particleRadius, dampingStrength);
  }

  _createClass(LiquidParticle, [{
    key: "setBox2Dobject",
    value: function setBox2Dobject(w, h, x, y, particleRadius, dampingStrength) {
      var psd = new b2ParticleSystemDef();
      psd.radius = particleRadius;
      psd.dampingStrength = dampingStrength;
      this.ps = this.world.CreateParticleSystem(psd);

      var shape = new b2PolygonShape();
      shape.SetAsBoxXY(w, h);
      var pgdef = new b2ParticleGroupDef();
      pgdef.shape = shape;
      pgdef.position = new b2Vec2(x, y);
      this.pg = this.ps.CreateParticleGroup(pgdef);
    }
  }]);

  return LiquidParticle;
})();