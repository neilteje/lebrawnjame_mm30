import random
from game.base_strategy import BaseStrategy
from game.plane import Plane, PlaneType
from math import atan2, degrees

class Strategy(BaseStrategy):
    def select_planes(self) -> dict[PlaneType, int]:
        return {
            # PlaneType.FLYING_FORTRESS: 1,  
            # PlaneType.THUNDERBIRD: 3,     
            # PlaneType.SCRAPYARD_RESCUE: 2,
            PlaneType.PIGEON: 100
        }

    def steer_input(self, planes: dict[str, Plane]) -> dict[str, float]:
        response = dict()
        # going thru planes
        for id, plane in planes.items():
            if plane.team != self.team:
                continue
            closestAlly = float('inf')
            closestEnemy = float('inf')
            whichClosestEnemy = None

            for other_id, other_plane in planes.items():
                if other_plane.team == self.team and other_id != id:
                    # no collisions with allies
                    ally_distance = self.distance(plane.position, other_plane.position)
                    if ally_distance < closestAlly:
                        closestAlly = ally_distance
                elif other_plane.team != self.team:
                    # closest enemybob
                    enemy_distance = self.distance(plane.position, other_plane.position)
                    if enemy_distance < closestEnemy:
                        closestEnemy = enemy_distance
                        whichClosestEnemy = other_plane

            if closestAlly < 3:  # three units : ally
                response[id] = random.choice([-1, 1])
                continue
            if whichClosestEnemy:
                steer_angle = self.angles(plane, whichClosestEnemy)
                steer_value = self.planesSteering(plane.angle, steer_angle, plane.stats.turn_speed)
                response[id] = steer_value

        return response

    def distance(self, pos1, pos2) -> float:
        return ((pos1.x - pos2.x) ** 2 + (pos1.y - pos2.y) ** 2) ** 0.5

    def angles(self, plane: Plane, target: Plane) -> float:
        dx = target.position.x - plane.position.x
        dy = target.position.y - plane.position.y
        angle = degrees(atan2(dy, dx)) % 360
        return angle

    def planesSteering(self, current_angle: float, target_angle: float, turn_speed: float) -> float:
        angle_diff = (target_angle - current_angle + 360) % 360
        if angle_diff > 180:
            angle_diff -= 360

        steer = max(-1, min(1, angle_diff / turn_speed))
        return steer