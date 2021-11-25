
class Node:
    def __init__(self, name):
        self.name: str = name
        self.connected_to: dict = {}

    def add_neighbour(self, neighbour, weight = 0):
        self.connected_to[neighbour] = int(weight)

    def get_connections(self):
        return self.connected_to.keys()

    def get_weight(self, neighbour):
        return self.connected_to[neighbour]

class Graph:
    def __init__(self):
        self.node_list: dict = {}
        self.node_count: int = 0

    # add new node and keep count
    def create_node(self, name: str):
        self.node_count += 1
        new_node = Node(name)
        self.node_list[name] = new_node
        
        return new_node

    # return node
    def get_node(self, name: str):
        if name in self.node_list:
            return self.node_list[name]
        return None

    # connect edge with node 
    def create_edge(self, start, end, weight=0):
        if start not in self.node_list:
            self.create_node(start)
        if end not in self.node_list:
            self.create_node(end)

        self.node_list[start].add_neighbour(self.node_list[end], weight)

    # calculate and print distance
    def get_route_distance(self, route: str):
        distance = 0
        route_list =  route.split('-')

        for key, value in enumerate(route_list):
            current_node = self.get_node(value)

            if current_node:
                if key + 1 < len(route_list):
                    next_node = self.get_node(route_list[key + 1])
                else:
                    print('Distance of route {} is #: {} '.format(route, distance))
                    return distance

                if next_node in current_node.connected_to:
                    distance = distance + current_node.get_weight(next_node)
                else:
                    print('NO SUCH ROUTE')
                    return 0
            else:
                print('NO SUCH ROUTE')
                return 0

    # print no of route between start and end with given no of route
    def get_possible_route(self, start_node, end_node, max_stop, comparison):
        start_nod = self.get_node(start_node)
        end_nod = self.get_node(end_node)

        if comparison == '=':
            result = self.possible_path_with_condition(comparison, start_nod, end_nod, max_stop)
        elif comparison == '<=':
            result = self.possible_path_with_condition(comparison,start_nod, end_nod, max_stop)
        elif comparison == '<':
            result = self.possible_path_with_condition(comparison, start_nod, end_nod, max_stop)
        
        print('Number of route from {} to {} is #: {}'.format(start_node, end_node, result))
        return result

    def possible_path_with_condition(self, comapare_type, start_node, end_node, max_stop, started_traversal=False, total_paths=0):
        if comapare_type == '<':
            if max_stop > 0 and start_node == end_node and started_traversal:
                total_paths = total_paths + 1
            if max_stop <= 0:
                return total_paths

        elif comapare_type == '<=':
            if max_stop >= 0 and start_node == end_node and started_traversal:
                total_paths = total_paths + 1
            if max_stop < 0:
                return total_paths

        elif comapare_type == '=':
            if max_stop == 0 and start_node == end_node and started_traversal:
                total_paths = total_paths + 1
            if max_stop < 0:
                return total_paths

        for neighbour in start_node.get_connections():
            started_traversal = True
            total_paths = total_paths + self.possible_path_with_condition(comapare_type,neighbour, end_node, max_stop - 1, started_traversal )
        return total_paths

    # caculate distance from start to end within the given distance
    def possible_route_distance(self, start_node, end_node, distance, comparison):
        start_nod = self.get_node(start_node)
        end_nod = self.get_node(end_node)

        if comparison == '=':
            result = self.possible_paths_weighted(comparison, start_nod, end_nod, distance)
        elif comparison == '<=':
            result = self.possible_paths_weighted(comparison, start_nod, end_nod, distance)
        elif comparison == '<':
            result = self.possible_paths_weighted(comparison, start_nod, end_nod, distance)

        print("Distance from {}  to  {}  is #: {}".format(start_node, end_node, result))
        return result

    def possible_paths_weighted(self, comparison, start_node, end_node, max_weight, current_weight=0, started_traversal=False, total_paths=0):
        if comparison == '<':
            if current_weight < max_weight and start_node == end_node and started_traversal:
                total_paths = total_paths + 1
        elif comparison == '<=':
            if current_weight <= max_weight and start_node == end_node and started_traversal:
                total_paths += 1
        elif comparison == '=':
            if current_weight == max_weight and start_node == end_node and started_traversal:
                total_paths += 1
        
        if current_weight >= max_weight:
            return total_paths
        
        for neighbour in start_node.get_connections():
            started_traversal = True
            temp = self.possible_paths_weighted(comparison, neighbour, end_node, max_weight, current_weight + start_node.connected_to[neighbour], started_traversal, total_paths)
            if temp:
                total_paths = temp
        return total_paths


    # calculate shortest path
    def shortest_route(self, start_node, end_node):
        start_nod = self.get_node(start_node)
        end_nod = self.get_node(end_node)
        result = self.shortest_path(start_nod, end_nod)

        print("Shortest path betweeb {} and  {} is #: {}".format(start_node, end_node, result))
        return result

    def shortest_path(self, start_node, end_node, stop=0, max_stop=0, current_weight = 0, started_traversal=False, shortest_path=99999):
        if not started_traversal:
            max_stop = self.node_count

        if current_weight <= shortest_path and start_node == end_node and started_traversal:
            shortest_path = current_weight
        
        if current_weight > shortest_path or stop >= max_stop:
            return shortest_path

        for neighbour in start_node.get_connections():
            started_traversal = True
            stop = stop + 1
            temp = self.shortest_path(neighbour, end_node, stop, max_stop, current_weight + start_node.connected_to[neighbour], started_traversal, shortest_path)
            if temp:
                shortest_path = temp
        return shortest_path