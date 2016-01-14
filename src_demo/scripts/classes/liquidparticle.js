class LiquidParticle {
  constructor(world, w, h, x, y, particleRadius = 0.01, dampingStrength = 0.1) {
    this.world = world;
    this.setBox2Dobject(w, h, x, y, particleRadius, dampingStrength);
  }

  setBox2Dobject(w, h, x, y, particleRadius, dampingStrength) {
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
}
