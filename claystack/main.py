from graph import Graph

def draw_graph(graph: Graph, nodes: list, edges: list):
    for node in nodes:
        graph.create_node(node)
    for edge in edges:
        list_edge = list(edge.strip())
        graph.create_edge(list_edge[0], list_edge[1], list_edge[2])

def main():
    nodes = ['A', 'B', 'C', 'D', 'E']
    edges = ['AB5', 'BC4', 'CD8', 'DC8', 'DE6', 'AD5', 'CE2', 'EB3', 'AE7']

    train = Graph()
    draw_graph(train, nodes, edges)

    train.get_route_distance('A-B-C')
    train.get_route_distance('A-D')
    train.get_route_distance('A-D-C')
    train.get_route_distance('A-E-B-C-D')
    train.get_route_distance('A-E-D')

    train.get_possible_route('C', 'C', 3, '<=')
    train.get_possible_route('A', 'C', 4, '=')

    train.shortest_route('A', 'C')
    train.shortest_route('B', 'B')

    train.possible_route_distance('C', 'C', 30, '<')


if __name__ == '__main__':
    main()