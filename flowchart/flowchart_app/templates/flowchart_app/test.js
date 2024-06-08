 // Calcular las dimensiones del canvas
  var nodeWidth = 120;
  var nodeHeight = 50;
  var canvasWidth, canvasHeight;

  if (checkboxOrientacion.checked) {
    // Orientación horizontal
    canvasWidth = numLevels * nodeWidth;
    canvasHeight = maxNodesPerLevel * nodeHeight;
  } else {
    // Orientación vertical
    canvasWidth = maxNodesPerLevel * nodeWidth;
    canvasHeight = numLevels * nodeHeight;
  }



    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.5.0-beta4/html2canvas.min.js"></script>