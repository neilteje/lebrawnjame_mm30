# This defines the general layout your strategy method will inherit
# 
# DO NOT EDIT THIS!

from game.plane import Plane, PlaneType
import math

class Strategy:
    team: str
    my_counter: int
    my_steers: dict
    done_heuristic: bool
    attack: bool

    def __init__(self, team: str) -> None:
        self.team = team
        self.my_counter = 0
        self.done_heuristic = False
        self.attack = False
    
    def select_planes(self) -> dict[PlaneType, int]:
        '''
        Return a dictionary mapping PlaneType to int
        '''
        return {
            PlaneType.STANDARD: 2,
            PlaneType.FLYING_FORTRESS: 2
        }

    def steer_input(self, planes: dict[str, Plane]) -> dict[str, float]:
        '''
        Return a dictionary mapping each plane id to the amount they will steer [-1, 1], where positive is clockwise
        '''
        response = dict()

        # For each plane
        closest_plane = dict()
        enemy_planes = []
        for id, plane in planes.items():
            # id is the unique id of the plane, plane is a Plane object

            # We can only control our own planes
            if self.my_counter < 5:
                if (int(id) % 2) == 0:
                    response[id] = 1
                    continue
                else:
                    response[id] = -1
                    continue
            elif self.my_counter <= 20:
                response[id] = 0
            elif self.my_counter > 20 and self.my_counter < 26:
                if (int(id) % 2) == 0:
                    response[id] = -1
                    continue
                else:
                    response[id] = 1
                    continue
            else:
                self.done_heuristic = True
                response[id] = 0
                if plane.team != self.team:
                    enemy_planes.append(id)
                    if len(closest_plane) != 0:
                        for key, value in closest_plane.items():
                            if value:
                                if (self.distance(planes[value].position, planes[key].position) > self.distance(planes[key].position, plane.position)):
                                    closest_plane[key] = id
                            else:
                                closest_plane[key] = id
                else:
                    if len(enemy_planes) == 0:
                        closest_plane[id] = None
                    else:
                        min = 10000000
                        for enemy in enemy_planes:
                            if (self.distance(plane.position, planes[enemy].position) < min):
                                closest_plane[id] = enemy
        if self.done_heuristic:
            for friendly, enemy in closest_plane.items():
                if abs(planes[enemy].position.y - planes[friendly].position.y) < 5:
                    self.attack = True
        if not self.attack:
            self.my_counter += 1
            return response
        else:
            for id, plane in planes.items():
                if plane.team != self.team:
                    continue
                if (int(id) % 2) == 0:
                    response[id] = -1
                else:
                    response[id] = 1
                    

        # Increment counter to keep track of what turn we're on
        self.my_counter += 1

        # Return the steers
        return response
    
    def distance(self, position1, position2):
        return math.sqrt((position1.x - position2.x) ** 2 + (position1.y - position2.y) ** 2)
