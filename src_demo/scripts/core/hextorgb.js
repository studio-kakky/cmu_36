if(!window.hexToRgb) {
  window.hexToRgb = function(hex) {
    var r = Math.floor(hex / 0x010000);
    var g = Math.floor(hex%0x010000/0x000100);
    var b = hex % 0x000100;

    return {r:r,g:g,b:b};
  };
}
