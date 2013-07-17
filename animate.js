 function animate(){



      theta += clock.getDelta();

      CURRENT_APP.rotateAll( ROTATION_SPEED );
      ROTATION_SPEED *= ROTATION_DRAG;

      if(I_APP ){
        CURRENT_FAIRIE_TARGET = I_APP.getWorldPosition();
      }else{
        CURRENT_FAIRIE_TARGET = CURRENT_APP.getWorldPosition();
      }

      for( var i = 0; i < faeries.length; i++){
        faeries[i].update();
      }

      fbd = new Uint8Array(masterAnalyser.frequencyBinCount)
      masterAnalyser.getByteFrequencyData(fbd)

      var total = 0;
      for( var i = 0 ; i < fbd.length; i ++){
  
        total += fbd[i];

        for( var j=0; j < applications.length; j++){
          var application = applications[j];
          if( application.hovered ){
            var node = application.node;
            if( node.geo.vertices[i] ){
              var vert = node.geo.vertices[i];
              var data = node.data.vertices[i];

              vert.x =  data.x * (fbd[i]/256 + 1 )
              vert.y =  data.y * (fbd[i]/256 + 1 )
              vert.z =  data.z * (fbd[i]/256 + 1 )

            }

            node.geo.verticesNeedUpdate = true;
          }
        }

        if( floor.data.vertices[i] ){

          var vert = floor.geometry.vertices[i];
          var data = floor.data.vertices[i];

          vert.x =  data.x * (fbd[i]/256 + 2 )
          vert.y =  data.y * (fbd[i]/256 + 2 )
          vert.z =  (SS/20) *  Math.cos(fbd[i]/100)
          floor.geometry.verticesNeedUpdate = true;
        }
        
      }

      var ave = total/fbd.length;


      var applicationHovered = false
      for( var i=0; i < applications.length; i++){
        
        var application = applications[i];

        if( application.hovered  ){
          applicationHovered = true;
        }
       
        
        if( application.children ){
          
          for( var j = 0 ; j < application.childrenScenes.length; j++){
            var rotateScene = application.childrenScenes[j];

            rotateScene.rotation.y += Math.cos(theta * Math.cos(i * j))*ave/20000;
            //rotateScene.rotation.x += Math.cos(theta * Math.sin(i * j))*ave/200000;
            //rotateScene.rotation.z += Math.cos(theta * Math.cos(i * j))*ave/200000;

          }
        }

      }

      if(applicationHovered == true ){

          hoverInfoDiv
            .css('left', mouse.screen.x + "px")
            .css('top', mouse.screen.y + "px");

      }else{
  
          hoverInfoDiv
            .css('left',-99999+ "px")
           
      }



      if(!mouse.dragging){
        checkAppIntersection();
      }
    

      TWEEN.update();
      stats.update();
      renderer.render( scene , camera )

    }


//TODO:
//
// BUG: When hovering over from 1 node to another, doesn't call clearOut
//
function checkAppIntersection(){

      var vector = new THREE.Vector3( mouse.position.x , mouse.position.y, 1 );
      projector.unprojectVector( vector, camera );

      raycaster.set( camera.position, vector.sub( camera.position ).normalize() );

      var intersects = raycaster.intersectObjects( akira.scene.children , true );
      if( intersects.length > 0 ){

        // Only check if the the first intersection is different


        if( I_MESH != intersects[0].object ){

          I_MESH = intersects[0].object;
          var oI_OBJ = I_OBJ;
          var oI_APP = I_APP;

          var inApp = false;
          for( var i = 0; i < applications.length; i ++){
            var app = applications[i];
            for( var j=0; j < app.node.objects.length ; j++){
              if( intersects[0].object === app.node.objects[j] ){
                inApp = true;
                I_OBJ = app.node;
                if(oI_OBJ != I_OBJ ){
                  I_OBJ.hoverOver();
                }
                I_APP = app;
                if(oI_APP != I_APP){
                  I_APP.hoverOver();
                }
              }
            }

            if( intersects[0].object == app.connection.tube.mesh ){
              I_OBJ = app.connection; 
              inApp = true;
              // If we are focused on a connection, dont give it an app
              if(I_APP){
                I_APP = null;
              }
            }
          }

          if( oI_OBJ && oI_OBJ != I_OBJ ){
            oI_OBJ.hoverOut();
          }

          if( oI_APP && oI_APP != I_APP ){
            oI_APP.hoverOut();
          }
          

          if( inApp == false){
            if(I_APP){
              I_APP.hoverOut();
              I_APP = null;
            }
            if(I_OBJ){
              I_OBJ.hoverOut();
              I_OBJ = null;
            }
          }
        }

      }else{

    
        if( I_MESH ){ 

          if( I_OBJ ){

            if( I_OBJ.hoverOut ){
              I_OBJ.hoverOut();
            }
            if( I_APP){
              if( I_APP.hoverOut ){
                I_APP.hoverOut();
              }
            }
            I_OBJ = null;
            I_APP = null;

          }
          I_MESH = null;
        }

      }

}
