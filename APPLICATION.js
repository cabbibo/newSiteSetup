/*

  NOTES: The total importance for all children must add up to 1

*/

var applications = [];


function APPLICATION( parentScene , params , parent , pos ){

  

  this.params = params;

  if( params.note ){
    this.note = new NOTE(params.note);
  }else{
    this.note = new NOTE('audio/notes/numbNote1.mp3');
  }

  if( params.title ){
    this.title = params.title;
  }else{
    console.log('NON TITILE');
    this.title = " NO TITLE YET ";
  }

  console.log( this.title);
  if( params.info ){
    this.info = params.info;
  }else{
    this.info = 'NO INFO YET';
  }


  if( parent ){
    this.parent = parent;   
    this.level = this.parent.level + 1;
  }else{

    this.parent = akira;
    this.level = 1;
    
    //this.parent = scene
    //TODO: add logic for base of tree

  }

  // This is the scene, that belongs to the parent.scene
  this.parentScene = parentScene;

  
  this.position = pos;

  
  // This is what will define how powerful this branch is
  this.importance = params.importance;
  
  this.scene = new THREE.Object3D();
  this.scene.position.copy(this.position);
  
  this.sceneMarker = new THREE.Mesh( sceneMarkerGeometry, normalMaterial );
  this.scene.add(this.sceneMarker);


  this.connection  = new CONNECTION( this , {} );
  this.connection.addToScene();
  
  this.node =  new NODE(this);
  this.node.addToScene();


  /*
   *    If this app has children, it is a branch point
   */
  if( params.children ){

    // Only create the children and childrenScenes arrays if
    // we have children. This is so that we can tell the difference
    // between a branchPoint application, and a apex application
    this.children = [];
    this.childrenScenes = [];

    for( var i = 0; i < params.children.length; i++){

      var childObj = params.children[i];
      
      // We need to create a scene for this application, 
      // so we can rotate it and move it without affecting
      // the other objects in the scene
      var childScene = new THREE.Object3D();
      this.scene.add( childScene );

      this.childrenScenes.push( childScene );

      var position = this.getChildrenPosition(i);
      var child = new APPLICATION( childScene, params.children[i] , this , position);
      this.children.push( child );

    }

  /*
   *  If this app has no children, it is an end point, AKA an actual
   *  application
   */
  }else{


  }

  this.addToScene();

  /* TODO: MUSIC
  this.loop = new LOOP()
  this.note = new NOTE()*/

  applications.push( this );

}

APPLICATION.prototype = {

  getChildrenPosition:function(i){


    var x,y,z;

    // If the sub child has children, boost is up extra
    if( this.params.children[i].children){
      
      var range =  SS * this.importance / (SIZE_REDUCTION_FACTOR * this.level) ;
      x = Math.randomRange( range ); 
      y = Math.randomRangePos( range*.5 ) + range;
      z = Math.randomRange( range );
 
    }else{

    //For now just random, but up further
    var range =  SS * this.importance / (SIZE_REDUCTION_FACTOR * this.level) ;
    x = Math.randomRange( range ); 
    y = Math.randomRangePos( range*.5 ) + range*.5;
    z = Math.randomRange( range );

    }

    return new THREE.Vector3( x , y , z );

  },

  addToScene:function(){
    this.parentScene.add( this.scene );
  },

  removeFromScene:function(){
    this.parentScene.remove( this.scene );
  },


  hoverOver:function(){

    this.note.play();
    this.hovered = true;
    this.fillInfoDiv();

  },

  hoverOut:function(){

    this.hovered = false;
    this.eraseInfoDiv();

  },

  assignMaterials:function(){

    for( var i=0 ; i< applications.length; i++){

        var app = applications[i];

        app.node.material = app.node.OGMaterial;
        app.node.setMaterial( app.node.material );

        app.connection.tube.material = app.connection.tube.OGMaterial;
        app.connection.tube.setMaterial( app.connection.tube.material );

    }

    this.node.material = this.node.selectMaterial;
    this.node.setMaterial( this.node.material );

    this.childrenSelect();
  },

  // runs a select on all children
  childrenSelect:function(){
 
    if( this.children ){
      for( var i=0; i< this.children.length; i++ ){
        this.children[i].parentSelect();
        if( this.children[i].children ){
          this.children[i].childrenSelect();
        }
      }
    }

  },

  // Runs a deselect on all children
  childrenDeselect:function(){

    if( this.children ){

      for( var i=0; i< this.children.length; i++ ){
        this.children[i].parentDeselect();
        if( this.children[i].children ){
          this.children[i].childrenDeselect();
        }
      }
    }

  },

  parentSelect:function(){

    this.node.material = this.node.parentSelectMaterial ;
    this.connection.tube.material = this.connection.tube.parentSelectMaterial;

    this.node.setMaterial( this.node.material );
    this.connection.tube.setMaterial( this.connection.tube.material );

  },

  parentDeselect:function(){

    this.node.material = this.node.OGMaterial ;
    this.connection.tube.material = this.connection.tube.OGMaterial;

    this.node.setMaterial( this.node.material );
    this.connection.tube.setMaterial( this.connection.tube.material );

  },


  childrenHoverOver:function(){

    for( var i=0; i< this.children.length; i++ ){

      this.children[i].parentHoverOver();
      if( this.children[i].children ){
        this.children[i].childrenHoverOver();
      }

    }

  },

  childrenHoverOut:function(){

    for( var i=0; i< this.children.length; i++ ){

      this.children[i].parentHoverOut();
      if( this.children[i].children ){
        this.children[i].childrenHoverOut();
      }

    }
  },

  parentHoverOver:function(){

    this.node.setMaterial( this.node.parentHoverMaterial );
    this.connection.tube.setMaterial( this.connection.tube.parentHoverMaterial );

  },

  parentHoverOut:function(){

    this.node.setMaterial( this.node.material );
    this.connection.tube.setMaterial( this.connection.tube.material );

  },

  fillInfoDiv:function(){

    var self = this;
    hoverInfoDiv.html(function(){
      var toReturn = '<h1>' + self.title +'</h1>';
      //toReturn += '<p>' + self.info +'</p>';
      return toReturn

    });

  },
  eraseInfoDiv:function(){

  },



  // rotates everything that is this application or lower,
  // so we can focus on an app and rotate just that one
  rotateAll:function( amount ){

    //Need to rotate this apps node
    this.node.scene.rotation.y += amount;
   
    if( this.childrenScenes ){

      // Also rotate all of the children scenes
      for(var i = 0 ; i<this.childrenScenes.length; i++){
        this.childrenScenes[i].rotation.y += amount;
      }
    }

  },

  assignAsCurrentApp: function(){

    CURRENT_APP = this;

   
  },

  getWorldPosition: function(){

    var vector = new THREE.Vector3();
    vector.getPositionFromMatrix( this.scene.matrixWorld );
    return vector;

  },


  // Gets the number of subLevels recursively
  getNumberOfSubLevels: function( numberOfSubLevels ){

    if( this.children ){
    
      numberOfSubLevels += 1;

      for( var i= 0; i< this.children.length; i++){
        var subLevel = this.children[i].getNumberOfSubLevels( numberOfSubLevels );

        if( subLevel > numberOfSubLevels ){
          numberOfSubLevels = subLevel
        }
      }

      return numberOfSubLevels;

    }else{

      return numberOfSubLevels;
    
    }

  },


  /*
   *  Gets the Child that is the furthest distance
   *  away from this application, so that when 
   *  we focus on the app, we can make sure to see 
   *  all of the children 
   *
   *  NOTE: This is not the distance between the start app
   *  and child app, but rather the distance along the path
   *  to each app. This will give us a longer distance that a
   *  straight connection for something with multipleChild nodes
   *  which is good because it will keep the camera further away
   *  for large branches
   *
   */

  getFarthestChild:function( startDistance ){

    var newDistance = startDistance;
     
    if( this.children ){
      
      for( var i= 0; i< this.children.length; i++){

        var subDistance = this.children[i].position.length();
        if( subDistance + startDistance > newDistance){
          newDistance = subDistance + startDistance;
          var superSubDistance = this.children[i].getFarthestChild( newDistance );

          if( superSubDistance >  newDistance ){
            newDistance = superSubDistance;
          }

        }

      }

      return newDistance;

    }else{

      return startDistance;
    
    }


  },

  focus:function( ){

    var self = this;

    
    var subLevels = this.getNumberOfSubLevels(0);
    console.log('SUBLEVELS  :  ' + subLevels);

    var farthestChild = this.getFarthestChild(0);
    console.log('Farthest Child  : '+ farthestChild );

    // Resets the materials for all other applications
    this.assignMaterials();

    
    if( CURRENT_APP == this || this == cabbibo ){
      returnCameraToStartingPosition();
    
    }else{

      var positionAddition = (SS / this.level * SIZE_REDUCTION_FACTOR) + farthestChild;
      var position = {
        x:camera.position.x,
        y:camera.position.y,
        z:camera.position.z,
      }
      console.log( position );

      var targetPos = this.getWorldPosition();

      var target ={
        x:targetPos.x,
        y:targetPos.y,
        z:targetPos.z + positionAddition 
      }
      console.log( target );
      var tween = new TWEEN.Tween(position).to(target, 1000);
      tween.easing(TWEEN.Easing.Exponential.InOut)

       //Set the tweening equal to true, so that we dont do multiple
      //things at the same time
      //var tweening  = true
      
      tween.onUpdate(function(){
       
        camera.position.x = position.x;
        camera.position.y = position.y;
        camera.position.z = position.z;
        var lookAt = new THREE.Vector3( target.x , target.y, target.z );
        //camera.lookAt( lookAt );
        if(position.x == target.x){

          tweening = false;
          console.log('tweening done');
          self.assignAsCurrentApp();

        }

      });
      
      tween.start();
    }

    // focus on branch
    /*if( this.children ){


    // focus on clickable application
    }else{


    }*/

  }

}
