// Creates a connection
// which is made up of, at the bare minimum a tube
// The tube runs from Child Node to the parent node
// and any other objects will do the same.
// Essentially these are the branches of the tree
function CONNECTION( whichApp , params ){

  // Tells us which Branch we are part of 
  // It is the tip of the branch
  this.whichApp = whichApp;

  // Creates a scene so that as we add objects
  // other than a tube, we can keep track of them
  // all in one place
  this.scene = new THREE.Object3D();
  
  // Creates a tube using the parameters that are passed
  // into the connection
  this.tube = new TUBE ( this , params.tube );
  this.tube.addToScene();

}

/*
 *  Prototype for the connection
 */ 
CONNECTION.prototype = {

  setMaterial:function( material ){
    this.tube.mesh.material = material;
  },
  

  addToScene: function(){
    this.whichApp.scene.add( this.scene );
  },

  removeFromScene: function(){
    this.whichApp.scene.remove( this.scene );
  },
  
  hoverOver: function(){


  },

  hoverOut: function(){


  }

}


