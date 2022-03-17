import math
import matplotlib.pyplot as plt
import numpy as np
import matplotlib.patches as mpatches

class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

class Line:
    def __init__(self, point_start, point_end, closed):
        self.point_start = point_start
        self.point_end = point_end
        self.closed = closed

class Section:
    def __init__(self, lines):
        self.lines = lines
        self.path = []


def straight_to_l(opening_start, opening_end, closing_start, closing_end):
    opening_middle_x = (opening_start[0] + opening_end[0]) / 2
    opening_middle_y = (opening_start[1] + opening_end[1]) / 2
    closing_middle_x = (closing_start[0] + closing_end[0]) / 2
    closing_middle_y = (closing_start[1] + closing_end[1]) / 2

    plt.plot([opening_middle_x, closing_middle_x], [opening_middle_y, closing_middle_y])
    plt.plot([opening_start[0], opening_end[0]], [opening_start[1], opening_end[1]], 'k-')
    plt.plot([closing_start[0], closing_end[0]], [closing_start[1], closing_end[1]], 'k-')
    plt.plot([opening_start[0], closing_start[0]], [opening_start[1], closing_start[1]], 'k-')
    plt.plot([opening_end[0], closing_end[0]], [opening_end[1], closing_end[1]], 'k-')
    axes = plt.gca()
    axes.set_aspect(1)

    plt.show()
    return math.sqrt((closing_middle_x - opening_middle_x) ** 2 + (closing_middle_y - opening_middle_y) ** 2)


def bend_to_l(height, width, number_of_segments):
    points = []
    points += right_triangle_to_points(height / 2, width, True)
    points += ellipsis_to_points(height / 2, width / 2, number_of_segments)
    points += right_triangle_to_points(height, width / 2, False)
    x, y = points_to_lists(points)
    print(x)
    print(y)
    plt.plot(x, y, '-o')

    plt.plot([0, width], [0, height / 2], 'k-')
    plt.plot([0, width / 2], [0, height], 'k-')
    axes = plt.gca()
    rect = mpatches.Rectangle((0, 0), width, height,
                              fill=False,
                              color="purple",
                              linewidth=2)
    axes.add_patch(rect)
    axes.set_aspect(1)


    plt.show()
    return sum_points(points)


def points_to_lists(points):
    x = []
    y = []
    for point in points:
        x.append(point[0])
        y.append(point[1])
    return x, y


def sum_points(points):
    sum = 0
    for i in range(len(points) - 1):
        xa = points[i][0]
        ya = points[i][1]
        xb = points[i + 1][0]
        yb = points[i + 1][1]
        d = math.sqrt((xb - xa) ** 2 + (yb - ya) ** 2)
        print('distance between (' + str(xa) + ', ' + str(ya) + ') and (' + str(xb) + ', ' + str(yb) + ') is ' + str(d))
        sum += d
    return sum


# ellipsis
def ellipsis_to_points(height, width, number_of_segments):
    teta = math.atan(height / (2 * width))
    teta_max = math.atan(2 * height / width)
    points = []
    teta_step = (teta_max - teta) / number_of_segments
    while teta <= teta_max:
        points.append(ellipsis_to_point(width, height, teta))
        teta += teta_step
    return points


def ellipsis_to_point(A, B, teta):
    a = math.tan(teta)
    b = A * a - B

    x1 = (-(a * b) - B * math.sqrt(((B ** 2 - b ** 2) / A ** 2) + a ** 2)) / ((B ** 2 / A ** 2) + a ** 2)
    y1 = a * x1 + b
    x2 = (-(a * b) + B * math.sqrt(((B ** 2 - b ** 2) / A ** 2) + a ** 2)) / ((B ** 2 / A ** 2) + a ** 2)
    y2 = a * x2 + b

    if dist_to_origin(x1, y1, -A, -B) > dist_to_origin(x2, y2, -A, -B):
        return (x1 + A) / 2, (y1 + B) / 2
    return (x2 + A) / 2, (y2 + B) / 2


def dist_to_origin(xa, ya, xb, yb):
    return math.sqrt((xb - xa) ** 2 + (yb - ya) ** 2)


# right triangle
def right_triangle_to_points(height, width, horizontal):
    if horizontal:
        return [(width / 2, 0), (width / 2, height / 2)]
    return [ (width / 2, height / 2), (0, height / 2)]




# main
# print(bend_to_l(860, 328, 5) * 1.2)
print(straight_to_l((0,0), (10,0), (0,10), (10,10)))
