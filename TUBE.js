// The tube goes from the center of this applications scene,
// to the center of its parents scene
function TUBE( connection , params ){

  // creating empty object so we don't run into 
  // undefined errors
  if( !params ){
    params = {};
  }

  this.connection = connection;

  if( params.material ){
    this.material = params.material;
    this.OGMaterial = params.material;
  }else{
    this.material = connectionMaterials.regular;
    this.OGMaterial = connectionMaterials.regular;
  }

  if( params.hoverMaterial ){
    this.hoverMaterial = params.hoverMaterial;
  }else{
    this.hoverMaterial = connectionMaterials.hover;
  }

  if( params.parentHoverMaterial ){
    this.parentHoverMaterial = params.parentHoverMaterial;
  }else{
    this.parentHoverMaterial = connectionMaterials.parentHover;
  }

  if( params.selectMaterial ){
    this.selectMaterial = params.selectMaterial;
  }else{
    this.selectMaterial = connectionMaterials.select;
  }

  if( params.parentSelectMaterial ){
    this.parentSelectMaterial = params.parentSelectMaterial;
  }else{
    this.parentSelectMaterial = connectionMaterials.parentSelect;
  }


  if( params.numOfSegments ){
    this.numOfSegments = params.numOfSegments;
  }else{
    this.numOfSegments = 10;
  }

  // Gets the radius of this connection based on the importance
  // of this object, 
  if( this.connection.whichApp.parent.connection ){
    
    oTubeRad = this.connection.whichApp.parent.connection.tube.radius;

    ratio = this.connection.whichApp.importance;
    this.radius = oTubeRad * ratio;

  }else{

    // the first objects parent will have no connection,
    // so we need to make up the radius for it
    this.radius = SS / 10;

  }

  // Points for the spline curve
  this.points = [];

    // Loop through the number of segments
  for( var i =0 ; i < this.numOfSegments; i ++){

    var amount = i / this.numOfSegments;

    addVector = new THREE.Vector3().copy(this.connection.whichApp.position);

    // adds some randomness into the 
    addVector.x *= ( 1 + Math.randomRangePos(.2) );
    addVector.y *= ( 1 + Math.randomRangePos(.2) );
    addVector.z *= ( 1 + Math.randomRangePos(.2) );

    // has to be negative, because we are going from this scene to
    // the parent scene, rather than adding it to the parent scene, 
    // and drawing it to this scene
    addVector.multiplyScalar( -amount );

    this.points.push( addVector);

  }

  this.path = new THREE.SplineCurve3( this.points );

  if( params.detail ){
    this.detail = params.detail;
  }else{
    this.detail = 10;
  }

  this.geo = new THREE.TubeGeometry( 
    this.path , 
    this.numOfSegments , 
    this.radius , 
    this.detail , 
    false , 
    false 
  );

  this.data = this.geo.clone();

  this.mesh = new THREE.Mesh( this.geo , this.material );

}

TUBE.prototype = {

  setMaterial:function( material ){
    this.mesh.material = material;
  },
  
  addToScene:function(){
    this.connection.scene.add( this.mesh );
  },

  removeFromScene: function(){
    this.connection.scene.remove( this.mesh );
  }

}

