
var colors = {

  primary:{
    light:0xffae73,
    bright:0xff9140,
    bold:0xff6c00,
    dim:0xbfd30,
    dark:0xa64600
  },

  secondaryA:{
    light:0xFFD173,
    bright:0xFFC040,
    bold:0xFFAB00,
    dim:0xBF9030,
    dark:0xA66F00
  },

  secondaryB:{
    light:0xF87085,
    bright:0xF83E5B,
    bold:0xF10026,
    dim:0xB52D43,
    dark:0x9D0019
  },

  complementary:{
    light:0x5DCFC3,
    bright:0x34CFBE,
    bold:0x009E8E,
    dim:0x1E776D,
    dark:0x00675C
  },


  randomLight:function(){


    var c = this;
    var cArray = [  c.primary , c.secondaryA , c.secondaryB , c.complementary ]
   
    var randC = Math.getRandomFromArray( cArray );

    return randC.light

  }

}



