class DynamicBox extends StaticBox {
  constructor(world, w, h, x, y, color = 0xff0000, density = 5, friction = 0.1) {
    super(world, w, h, x, y, color);
    this.setbox2DObject(world,w,h,x,y,density,friction);
    this.box2DObject.color = color;
  }

  setbox2DObject(world, w, h, x, y, density, friction) {
    var dbd = new b2BodyDef();
    dbd.type = b2_dynamicBody;
    dbd.position.Set(x,y);
    this.box2DObject = world.CreateBody(dbd);
    var dynamicBox = new b2PolygonShape();
    dynamicBox.SetAsBoxXY(w,h);
    var fixtureDef = new b2FixtureDef();
    fixtureDef.shape = dynamicBox;
    fixtureDef.density = density;
    fixtureDef.friction = friction;

    this.box2DObject.CreateFixtureFromDef(fixtureDef);
  }
}
