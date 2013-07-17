// For right now, just a cube, so we know where we are.
function NODE(whichApp , params){

  if( !params ){
    params = {};
  }

  this.whichApp = whichApp;

  this.scene = new THREE.Object3D();
  

  this.size = this.whichApp.connection.tube.radius * 2;

  this.objects = [];
  
  if( params.material ){
    this.material = params.material;
    this.OGMaterial = params.material;
  }else{
    this.material = nodeMaterials.regular;
    this.OGMaterial = nodeMaterials.regular;
  }

  if( params.hoverMaterial ){
    this.hoverMaterial = params.hoverMaterial;
  }else{
    this.hoverMaterial = nodeMaterials.hover;
  }

  if( params.parentHoverMaterial ){
    this.parentHoverMaterial = params.parentHoverMaterial;
  }else{
    this.parentHoverMaterial = nodeMaterials.parentHover;
  }

  if( params.selectMaterial ){
    this.selectMaterial = params.selectMaterial;
  }else{
    this.selectMaterial = nodeMaterials.select;
  }

  if( params.parentSelectMaterial ){
    this.parentSelectMaterial = params.parentSelectMaterial;
  }else{
    this.parentSelectMaterial = nodeMaterials.parentSelect;
  }
       


 
  // Cubes for Branchs, 
  // Flowers for Apex
  if( this.whichApp.params.children ){

    this.geo = new THREE.CubeGeometry( this.size, this.size , this.size , 5 , 5 , 5 );
    this.data = this.geo.clone();

    for( var i = 0; i < 6; i ++){
      var cube = new THREE.Mesh( this.geo , this.material );
      cube.rotation.x = 0;
      cube.rotation.y = (i / 6) * 2 * Math.PI;
      cube.rotation.z = 0;
      this.objects.push( cube );
      this.scene.add( cube );
    }

  }else{

    this.geo = new THREE.SphereGeometry( this.size, 10 , 10 );
    this.data = this.geo.clone();

    for( var i = 0; i < 6; i ++){
      var obj = new THREE.Mesh( this.geo , this.material );
      obj.rotation.x = 0;
      obj.rotation.y = (i / 6) * 2 * Math.PI;
      obj.rotation.z = 0;
      this.objects.push( obj );
      this.scene.add( obj );
    }

  }


}


NODE.prototype = {

  setMaterial:function( material ){

    for(var i = 0; i < this.objects.length; i++){
      this.objects[i].material = material;
    }

  },
  
  addToScene:function(){
    this.whichApp.scene.add( this.scene );
  },

  removeFromScene:function(){
    this.whichApp.scene.remove( this.scene );
  },

  hoverOver: function(){

    this.setMaterial( this.hoverMaterial );
    if( this.whichApp.children ){
      this.whichApp.childrenHoverOver();
    }

  },

  hoverOut: function(){
     
    this.setMaterial( this.material );
    if( this.whichApp.children ){
      this.whichApp.childrenHoverOut();
    }

  }

}
