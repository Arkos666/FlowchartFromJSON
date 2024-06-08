
import json
from graphviz import Digraph


def generate_flowchart(json_file):
    # Cargar el archivo JSON
    with open(json_file) as file:
        data = json.load(file)

    # Crear un objeto Digraph
    dot = Digraph(comment='Diagrama de flujo')

    # Iterar sobre los nodos del JSON y agregarlos al diagrama
    for node in data['nodes']:
        dot.node(node['id'], node['label'])

    # Iterar sobre las relaciones del JSON y agregarlas al diagrama
    for edge in data['edges']:
        dot.edge(edge['from'], edge['to'])

    # Renderizar el diagrama de flujo en un archivo de imagen
    dot.format = 'png'
    dot.render('flowchart', view=True)

if __name__ == '__main__':
    generate_flowchart('input.json')

