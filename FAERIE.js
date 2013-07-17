
var faeries = [];

function FAERIE( color, position ){

  this.scene = new THREE.Object3D();

  this.position = position;

  this.scene.position.clone(this.position);

  this.light = new THREE.PointLight(color , 3 , SS / 3 );

  var geo = new THREE.SphereGeometry( SS/ 100 , 5 ,5 );
  var material = new THREE.MeshBasicMaterial({color:color});
  this.body = new THREE.Mesh( geo,material);

  this.scene.add( this.light );
  this.scene.add( this.body );

  this.targetPosition = new THREE.Vector3( 0 , 0 , 0);
  this.velocity = new THREE.Vector3( 0 , 0 , 0 );

  this.drag = .95;


  faeries.push( this );

}


FAERIE.prototype = {

  update:function(){

    if( CURRENT_FAIRIE_TARGET ){

      var dif = this.position.clone();
      dif.sub( CURRENT_FAIRIE_TARGET);
      dif.x *= Math.random() * .05 ;
      dif.y *= Math.random() * .05 ;
      dif.z *= Math.random() * .05 ;
      this.velocity.sub(dif);

    }

    this.position.add( this.velocity );
    this.velocity.multiplyScalar(this.drag );
    /*if(I_MESH){

      var pos = I_MESH.position.clone();
      pos.applyMatrix4( I_MESH.matrixWorld );

      //console.log( pos );
      this.targetPosition.copy(pos);


    }*/
   

    //this.velocity.
    //this.position.add( this.velocity);


    this.scene.position.copy(this.position);

  }


}






