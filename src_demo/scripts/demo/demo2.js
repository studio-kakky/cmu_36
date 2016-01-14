window.onload = function(){
  var demo = new Demo1(document.getElementById('demo_canvas'));
};

class Demo1 {
  constructor(containerElement) {
    this.sceneObj = [];
    this.counter = 0;
    this.playFlag = true;
    this.colorHolder = 0xffffff;
    this.init(containerElement);
  }

  init(containerElement) {
    this.setupTHREE(containerElement);
    this.testObject = this.setTestObject();
    this.scene.add(this.testObject);

/*
    var gravity = new b2Vec2(0,-10);
    this.world = new b2World(gravity);
    window.world = this.world;

    this.set2dGround();

    this.CustomRender = new Renderer(this.world);
    this.scene.add(this.CustomRender.buffer);
*/

    this.render();
  }

  setupTHREE(containerElement) {
    this.scene = new THREE.Scene();
    this.scene.position.set(0, 28, 0);

    try {
      this.threeRenderer = new THREE.WebGLRenderer();
    } catch (e){
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

    this.camera = new THREE.PerspectiveCamera(2.5, cw/cy, 1, 3000);

    containerElement.appendChild(this.threeRenderer.domElement);
  }

  setTestObject() {
    var geo = new THREE.BoxGeometry(1000,1000,1000,2,2,2);
    var mat = new THREE.MeshBasicMaterial({
      color:0xffffff,
      wireframe:true,
      wireframeLinewidth:1
    });
    return new THREE.Mesh(geo, mat);
  }

  set2dGround() {
    this.gBox = new StaticBox(world, 26, 0.2);
    this.gBox.setPosition(0, -11);
    this.gBox2 = new StaticBox(world, 0.2, 50);
    this.gBox2.setPosition(-26, 39);
    this.gBox3 = new StaticBox(world, 0.2, 50);
    this.gBox3.setPosition(26, 39);
  }

  addRandomBox() {
    var h = Math.random() * 2 + 0.5;
		var w = Math.random() * 2 + 0.5;
		var posx = Math.random() * 4 - 4;
		var posy = Math.random() * 100 + 100;
		return new DynamicBox(this.world, w, h, posx, posy, 0xffffff);
  }

  addMultiBox() {
		if (this.counter % 20 === 0)
    {
      var h, w, posx, poy, box;
      for(var i = 0, l = 10; i < l; i++){
        h = 0.5;
        w = 0.5;
        posx = Math.random() * 4 - 4;
        posy = Math.random() * 10 + 100;
        box = new DynamicBox(this.world, w, h, posx, posy);
      }
    }
  }

  render() {
    this.counter++;
    this.world.Step(1/30, 6, 3);
    if (this.counter === 120 || this.counter === 240 || this.counter === 360) {
      this.addRandomBox();
    }

    if (this.counter === 30) {
      new LiquidParticle(this.world, 10, 20, -15.5, 0, 0.6);
    }

    this.CustomRender.draw();

    this.threeRenderer.render(this.scene, this.camera);

    if (this.playFlag){
      requestAnimationFrame(()=>{
        this.render();
      });
    }
  }

  setGravity(e) {
		if (e.accelerationIncludingGravity.y) {
      var gravity = new b2Vec2(10*e.accelerationIncludingGravity.x, 10*e.accelerationIncludingGravity.y);
			this.world.SetGravity(gravity);
    }
  }

  playPause() {
   this.playFlag = !this.playFlag;
   if(this.playFlag) this.render();
 }
}
