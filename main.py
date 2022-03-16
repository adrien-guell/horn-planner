import math
import matplotlib.pyplot as plt
import numpy as np
import matplotlib.patches as mpatches

def rect_to_l(height, width, teta_step):
    coords = right_triangle_to_coords(height, width / 2, False)
    coords += elipse_to_coords(height / 2, width / 2, teta_step)
    coords += right_triangle_to_coords(height / 2, width, True)
    list = zip(*coords)
    plt.scatter(*list)
    rect = mpatches.Rectangle((0, 0), width, height,
                              fill=False,
                              color="purple",
                              linewidth=2)
    plt.gca().add_patch(rect)
    plt.show()

def sum_coords(coords):
    sum = 0
    for i in range(len(coords) - 1):
        xa = coords[i][0]
        ya = coords[i][1]
        xb = coords[i + 1][0]
        yb = coords[i + 1][1]
        d = math.sqrt((xb - xa) ** 2 + (yb - ya) ** 2)
        sum += d
    return sum


# elipse
def elipse_to_coords(height, width, teta_step):
    teta = math.atan(height / (2 * width))
    teta_max = math.atan(2 * height / width)
    coords = []
    while teta <= teta_max:
        coords.append(elipse_to_coord(width, height, teta))
        teta += (teta_step / 180) * math.pi
    return coords

def elipse_to_coord(A, B, teta):
    a = math.tan(teta)
    b = A * a - B
    x1 = (-(a * b) - B * math.sqrt(((B ** 2 - b ** 2) / A ** 2) + a ** 2)) / ((B ** 2 / A ** 2) + a ** 2)
    y1 = a * x1 + b
    x2 = (-(a * b) + B * math.sqrt(((B ** 2 - b ** 2) / A ** 2) + a ** 2)) / ((B ** 2 / A ** 2) + a ** 2)
    y2 = a * x2 + b
    if dist_to_origin(x1, y1, -A, -B) > dist_to_origin(x2, y2, -A, -B):
        return (x1 + A)/ 2, (y1 + B) / 2
    return (x2 + A) / 2, (y2 + B) / 2

def dist_to_origin(xa, ya, xb, yb):
    return math.sqrt((xb - xa) ** 2 + (yb - ya) ** 2)


# right triangle
def right_triangle_to_coords(height, width, horrizontal):
    if horrizontal:
        return [(width / 2, 0), (width / 2, height / 2)]
    return [(0, height / 2), (width / 2, height / 2)]


# main
rect_to_l(10, 10, 1)