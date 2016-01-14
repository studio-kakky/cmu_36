class StaticBox {
  constructor(world,w,h,color) {
    this.setbox2DObject(world, w, h);
    this.box2DObject.color = 0xffffff;
  }
  setPosition(x,y) {
    this.box2DObject.SetTransform(new b2Vec2(x,y), this.box2DObject.GetAngle() );
  }

  setbox2DObject(world,w,h) {
    var gbd = new b2BodyDef();
    this.box2DObject = world.CreateBody(gbd);
    var groundBox = new b2PolygonShape();
    groundBox.SetAsBoxXY(w, h);
    this.box2DObject.CreateFixtureFromShape(groundBox);
  }
}
