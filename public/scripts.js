$( document ).ready(function() {
  var d = new Date();
  var n = d.getHours();
  for(var i = n-1; i >= 11; i--){
    $("#hour"+i).addClass("disabled").attr("data-toggle", "none");
  }
});