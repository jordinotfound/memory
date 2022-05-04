var array1 = localStorage.getItem('puntuacion');
var array = JSON.parse(array1)
var bubbleSort = function(array){
  var sorted = false;
  var temp;
  while(!sorted) {
      sorted = true;
      for (var i = 0; i < this.contador_partidas; i++) {
          if (array[i] > array[i+1]) {
              temp = array[i];
              array[i] = array[i+1];
              array[i+1] = temp;
              sorted = false;
          }
      }
  }
}

console.log(array)