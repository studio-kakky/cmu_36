'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

window.onload = function () {
  var demo = new Demo1(document.getElementById('demo_canvas'));
};

var Demo1 = (function () {
  function Demo1(containerElement) {
    _classCallCheck(this, Demo1);

    this.sceneObj = [];
    this.counter = 0;
    this.playFlag = false;
    this.colorHolder = 0xffffff;
    this.init(containerElement);
  }

  _createClass(Demo1, [{
    key: 'init',
    value: function init(containerElement) {
      var _this = this;

      this.setupTHREE(containerElement);

      var gravity = new b2Vec2(0, 300);
      this.world = new b2World(gravity);
      window.world = this.world;
      this.set2dGround();

      this.CustomRender = new Renderer(this.world);

      this.CustomRender.buffer.position.set(10, containerElement.scrollHeight / 2, 0);
      this.scene.add(this.CustomRender.buffer);

      containerElement.addEventListener('click', function () {
        _this.playPause();
      });

      this.render();
    }
  }, {
    key: 'testRender',
    value: function testRender() {
      /*
      var geo = new THREE.Geometry();
      geo.vertices.push(
        new THREE.Vector3(-158,-220,0),
        new THREE.Vector3(-158,+220,0),
        new THREE.Vector3(-140,+220,0),
        new THREE.Vector3(-140,-220,0),
        new THREE.Vector3(-158,-220,0),
        new THREE.Vector3(-140,-220,0),
        new THREE.Vector3(-158,+220,0),
        new THREE.Vector3(-140,+220,0)
      );
      */

      var geometry = new THREE.BufferGeometry();
      geometry.dynamic = true;

      var mat = new THREE.LineBasicMaterial({ vertexColors: THREE.VertexColors });

      var positions = new Float32Array(4 * 3);
      var colors = new Float32Array(4 * 3);

      var positions_array = [-158, -220, 0, -158, +220, 0, 0, 0, 0, 0, 0, 0];
      var colors_array = [255, 255, 255, 255, 255, 255, 0, 0, 0, 0, 0, 0, 0];

      for (var i = 0, l = positions.length; i < l; i++) {
        positions[i] = 0;
      }

      for (i = 0, l = colors.length; i < l; i++) {
        colors[i] = 0;
      }

      console.log(positions);
      geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));

      var line = new THREE.LineSegments(geometry, mat);

      this.scene.add(line);
      this.camera.position.z = 30;
      this.threeRenderer.render(this.scene, this.camera);

      for (i = 0, l = positions.length; i < l; i++) {
        positions[i] = positions_array[i];
      }

      for (i = 0, l = colors.length; i < l; i++) {
        colors[i] = colors_array[i];
      }

      line.geometry.getAttribute('position').needsUpdate = true;
      line.geometry.getAttribute('color').needsUpdate = true;

      this.threeRenderer.render(this.scene, this.camera);
    }
  }, {
    key: 'setupTHREE',
    value: function setupTHREE(containerElement) {
      this.scene = new THREE.Scene();

      try {
        this.threeRenderer = new THREE.WebGLRenderer();
      } catch (e) {
        var notice1 = document.createElement('p');
        var notice2 = document.createElement('p');
        notice1.innerHTML = "Soryy!";
        notice2.innerHTML = "This Content require WebGL API";
        containerElement.appendChild(notice1);
        containerElement.appendChild(notice2);
      }

      var cw = containerElement.scrollWidth;
      var cy = containerElement.scrollHeight;

      this.threeRenderer.setClearColor(0x000000);
      this.threeRenderer.setSize(cw, cy);

      this.camera = new THREE.OrthographicCamera(cw / -2, cw / 2, cy / -2, cy / 2, 0.1, 3000);
      this.camera.position.z = 5;
      containerElement.appendChild(this.threeRenderer.domElement);
    }
  }, {
    key: 'createTestObject',
    value: function createTestObject() {
      var geo = new THREE.BoxGeometry(1, 1, 1, 20, 20, 20);
      var mat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        wireframeLinewidth: 1
      });
      return new THREE.Mesh(geo, mat);
    }
  }, {
    key: 'set2dGround',
    value: function set2dGround() {
      var w = this.threeRenderer.domElement.scrollWidth;
      var h = this.threeRenderer.domElement.scrollHeight;
      this.gBox = new StaticBox(world, w, 2);
      this.gBox.setPosition(0, 0);
      this.gBox2 = new StaticBox(world, 2, h);
      this.gBox2.setPosition(-w / 2 - 10, 0);
      this.gBox3 = new StaticBox(world, 2, h);
      this.gBox3.setPosition(w / 2 - 12, 0);
    }
  }, {
    key: 'addRandomBox',
    value: function addRandomBox() {
      var h = Math.random() * 20 + 5;
      var w = Math.random() * 20 + 5;
      var posx = Math.random() * 4 - 4;
      var posy = -Math.random() * 500 + 100;
      return new DynamicBox(this.world, w, h, posx, posy, 0xffffff);
    }
  }, {
    key: 'addMultiBox',
    value: function addMultiBox() {
      if (this.counter % 20 === 0) {
        var h, w, posx, poy, box;
        for (var i = 0, l = 10; i < l; i++) {
          h = 0.5;
          w = 0.5;
          posx = Math.random() * 4 - 4;
          posy = -Math.random() * 500 - 500;
          box = new DynamicBox(this.world, w, h, posx, posy);
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      this.counter++;
      this.world.Step(1 / 30, 6, 3);
      if (this.counter === 120 || this.counter === 240 || this.counter === 360) {
        //this.addRandomBox();
      }

      if (this.counter === 30) {
        new LiquidParticle(this.world, 200, 200, -15.5, -300, 3, 0.01);
      }

      this.CustomRender.draw();
      this.threeRenderer.render(this.scene, this.camera);
      if (this.playFlag) {
        requestAnimationFrame(function () {
          _this2.render();
        });
      }
    }
  }, {
    key: 'setGravity',
    value: function setGravity(e) {
      if (e.accelerationIncludingGravity.y) {
        var gravity = new b2Vec2(10 * e.accelerationIncludingGravity.x, 10 * e.accelerationIncludingGravity.y);
        this.world.SetGravity(gravity);
      }
    }
  }, {
    key: 'playPause',
    value: function playPause() {
      this.playFlag = !this.playFlag;
      if (this.playFlag) this.render();
    }
  }]);

  return Demo1;
})();