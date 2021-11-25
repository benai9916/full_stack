from graph import Graph


def draw_graph(graph: Graph, nodes: list, edges: list):
    for node in nodes:
        graph.create_node(node)
    for edge in edges:
        list_edge = list(edge.strip())
        graph.create_edge(list_edge[0], list_edge[1], list_edge[2])


# validate nodes and edges
nodes = ['A','B','C', 'D','E']
edges = ['AB5', 'BC4', 'CD8', 'DC8', 'DE6', 'AD5', 'CE2', 'EB3', 'AE7']

for key, value in enumerate(nodes):
    assert isinstance(value, str), 'Node with index {} and value {} must be string'.format(key, value)
    assert value.isupper(), "Node with index {} and value {} must be uppercase letter".format(key, value)
    assert len(value) == 1, 'Node with index {} and value {} must be 1 uppercase letter'.format(key, value)

for key, value in enumerate(edges):
    assert isinstance(value, str), 'Node with index {} and value {} must be string'.format(key, value)
    assert value.isupper(), "Node with index {} and value {} must be uppercase letter".format(key, value)
    assert len(value) == 3, 'Node with index {} and value {} must be 2 uppercase letter and 1 number'.format(key, value)
 

train = Graph()
draw_graph(train, nodes, edges)

# test few route
assert train.get_route_distance('A-B-C') == 9,"route distance 'A-B-C' must be 9"
assert train .get_route_distance('A-B') == 5, "route distance 'A-B' must be 5"
assert train .get_route_distance('A-E-D') == 0, "route distance 'A-E-D' must be 0"