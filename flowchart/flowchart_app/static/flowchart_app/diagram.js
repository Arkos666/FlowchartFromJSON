var network;
var nodes;
var edges;
var options;
var data;



var checkboxOrientacion = document.getElementById('orientacion');

// Crea el gráfico inicial
crearGrafico();

// Recrea el gráfico cuando se cambia el checkbox de orientación
checkboxOrientacion.addEventListener('change', crearGrafico);

// Crea el gráfico
function crearGrafico() {
  var baseSpacing = 40;
  // Calcula las posiciones de los nodos.
  for (var i = 0; i < jsonData.nodes.length; i++) {
    var node = jsonData.nodes[i];
    var level = node.level;  // Asume que cada nodo tiene una propiedad 'level' que indica su nivel en el gráfico.

    // Calcula la posición y del nodo en función de su nivel.
    node.y = level * baseSpacing * Math.pow(2, level);

    // Puedes calcular la posición x del nodo de la manera que prefieras.
    // En este ejemplo, simplemente la dejamos sin definir para que vis.js la calcule automáticamente.
  }

  nodes = new vis.DataSet(jsonData.nodes);
  edges = new vis.DataSet(jsonData.edges);

  container = document.getElementById('diagram');
  data = {
    nodes: nodes,
    edges: edges
  };

  options = {
    interaction: {
      dragNodes: true,  // Permite el desplazamiento de los nodos manualmente
      navigationButtons: true,
      zoomView: false
    },
    layout: {
      hierarchical: {
        enabled: true,
        levelSeparation: 200,
        nodeSpacing: 200,
        treeSpacing: 300,
        blockShifting: true,
        edgeMinimization: true,
        parentCentralization: true,
        direction: checkboxOrientacion.checked ? 'LR' : 'UD', // Cambia entre UD (Up-Down) y LR (Left-Right) según el checkbox
        sortMethod: 'hubsize'   // hubsize, directed
      }
    },
    physics: {
      enabled: false, // Desactiva la física para permitir el desplazamiento manual
      stabilization: false,  // Desactiva la estabilización para que los nodos se queden donde los dejas
    }
  };

  network = new vis.Network(container, data, options);

  // Ajusta la vista a todos los nodos.
  network.fit();
}

document.getElementById('descargar').addEventListener('click', function() {
  // Tamaño y separación de los nodos
  var nodeSize = { width: 120, height: 50 };
  var separation = { x: 200, y: 300 };

  // Calcular el número de niveles y el número máximo de nodos en un nivel
  var numLevels = 0;
  var maxNodesPerLevel = 0;
  var nodesPerLevel = {};

  for (var i = 0; i < jsonData.nodes.length; i++) {
    var level = jsonData.nodes[i].level;
    if (level > numLevels) {
      numLevels = level;
    }

    if (nodesPerLevel[level]) {
      nodesPerLevel[level]++;
    } else {
      nodesPerLevel[level] = 1;
    }

    if (nodesPerLevel[level] > maxNodesPerLevel) {
      maxNodesPerLevel = nodesPerLevel[level];
    }
  }

  // Calcular el tamaño del canvas en función de la orientación del gráfico
  var canvasWidth, canvasHeight;
  if (checkboxOrientacion.checked) {  // Orientación LR (Left-Right)
    canvasWidth = numLevels * (nodeSize.width + separation.x);
    canvasHeight = maxNodesPerLevel * (nodeSize.height + separation.y);
  } else {  // Orientación UD (Up-Down)
    canvasWidth = maxNodesPerLevel * (nodeSize.width + separation.x);
    canvasHeight = numLevels * (nodeSize.height + separation.y);
  }

  // Ajustar la vista del gráfico para que se ajuste a todos los nodos
  network.fit();

  setTimeout(function() {
    // Calcula la escala necesaria para que todos los nodos sean visibles en el PNG
    var scale = Math.min(canvasWidth / container.offsetWidth, canvasHeight / container.offsetHeight);

    // Aplica la escala y el enfoque a la red
    network.moveTo({
      scale: scale,
      position: {x: 0, y: 0}  // Ajusta esto si quieres enfocar una parte específica de la red
    });

    setTimeout(function() {
      // Encuentra el elemento canvas en el contenedor
      var canvas = container.getElementsByTagName('canvas')[0];

      // Captura el contenido del gráfico como PNG
      var imgData = canvas.toDataURL('image/png');

      // Crea un enlace para descargar la imagen
      var link = document.createElement('a');
      link.href = imgData;
      link.download = 'diagram.png';
      link.click();

      // Restablecer el tamaño original del div del contenedor y la vista del gráfico
      container.style.width = '100%';
      container.style.height = '600px';
      network.fit();
    }, 2000);
  }, 2000);
});
