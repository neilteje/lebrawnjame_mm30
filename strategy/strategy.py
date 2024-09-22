import random
from game.base_strategy import BaseStrategy
from game.plane import Plane, PlaneType
from strategy.utils import plane_find_path_to_point, degree_to_radius
from game.plane_data import Vector

class Strategy(BaseStrategy):

    def select_planes(self) -> dict[PlaneType, int]:
        return {
            PlaneType.SCRAPYARD_RESCUE: 4,
            PlaneType.THUNDERBIRD: 2,
            PlaneType.STANDARD: 1,
        }

    def steer_input(self, planes: dict[str, Plane]) -> dict[str, float]:
        response = dict()
        bait_planes = []
        heavy_planes = []
        top_edge = 50 if self.team == 1 else -50
        bottom_edge = -50 if self.team == 1 else 50
        left_edge = -50 if self.team == 1 else 50
        right_edge = 50 if self.team == 1 else -50

        for id, plane in planes.items():
            if plane.team != self.team:
                continue

            if id not in bait_planes and plane.type == PlaneType.SCRAPYARD_RESCUE:
                bait_planes.append(id)
            elif id not in heavy_planes and (plane.type == PlaneType.THUNDERBIRD or plane.type == PlaneType.STANDARD):
                heavy_planes.append(id)

            # bait planes logic
            if id in bait_planes:
                target = 0
                if self.team == 1:
                    target = 50 if plane.position.y < 39 else -50
                else:
                    target = -50 if plane.position.y > -39 else 50
                # steer, second = plane_find_path_to_point(Vector(0, target), plane)
                response[id] = 0 if target == top_edge else -1

            # heavy planes logic
            if id in heavy_planes:
                closest_enemy = self.closest_enemy(plane, planes)
                if closest_enemy:
                    steer, second = plane_find_path_to_point(closest_enemy.position, plane)
                    response[id] = steer
                else:
                    response[id] = 0  # go straight
                    
            response[id] = min(1, response[id])
            response[id] = max(-1, response[id])
            
            if plane.position.x < -39 and self.team == 1:
                response[id] = -1
            elif plane.position.x < -39:
                response[id] = 1
            elif plane.position.x > 39 and self.team == 1:
                response[id] = 1
            elif plane.position.x > 39:
                response[id] = -1

        return response

    def closest_enemy(self, plane: Plane, planes: dict[str, Plane]) -> Plane:
        enemies = [p for p in planes.values() if p.team != self.team]
        if enemies:
            return min(enemies, key=lambda p: (p.position - plane.position).norm())
        return None