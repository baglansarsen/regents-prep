#!/usr/bin/env python3
"""
Generate missing NYS Regents exam images.
Creates accurate educational graphs and diagrams using matplotlib.
"""

import os, re, sys, math
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyArrowPatch, Arc, FancyBboxPatch
from matplotlib.lines import Line2D
import warnings
warnings.filterwarnings('ignore')

EXAM_DIR = "/Users/baglansarsen/regents-prep/mobile/src/content/regents-exams"
PUBLIC_DIR = "/Users/baglansarsen/regents-prep/public/images/exams"
IMG_W, IMG_H = 1044, 700
DPI = 120

plt.rcParams.update({
    'font.family': 'DejaVu Sans',
    'font.size': 11,
    'axes.titlesize': 12,
    'axes.labelsize': 11,
    'figure.facecolor': 'white',
    'axes.facecolor': 'white',
    'grid.color': '#cccccc',
    'grid.linewidth': 0.5,
    'lines.linewidth': 2,
})

# ─── Utilities ────────────────────────────────────────────────────────────────

def save_fig(path, fig=None):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    f = fig or plt.gcf()
    f.savefig(path, dpi=DPI, bbox_inches='tight', facecolor='white')
    plt.close('all')

def styled_axes(ax, xlabel='', ylabel='', title='', grid=True):
    ax.set_xlabel(xlabel, fontsize=11)
    ax.set_ylabel(ylabel, fontsize=11)
    if title:
        ax.set_title(title, fontsize=12)
    if grid:
        ax.grid(True, alpha=0.3, linestyle='-')
    ax.spines['top'].set_visible(True)
    ax.spines['right'].set_visible(True)

def extract_numbers(text):
    return [float(x) for x in re.findall(r'-?\d+\.?\d*', text)]

# ─── Generic / Fallback ───────────────────────────────────────────────────────

def gen_placeholder(path, qnum, subject, text='', context=''):
    fig, ax = plt.subplots(figsize=(8.7, 4.5))
    ax.set_xlim(0, 10); ax.set_ylim(0, 10)
    ax.axis('off')
    label = f"Question {qnum}"
    ax.text(5, 6.5, label, ha='center', va='center', fontsize=18, fontweight='bold')
    # Wrap and show description
    desc = (context or text or '')[:200]
    ax.text(5, 4, '[See original exam for graph/diagram]', ha='center', va='center',
            fontsize=13, style='italic', color='#555555',
            bbox=dict(boxstyle='round,pad=0.5', facecolor='#f0f0f0', edgecolor='#999999'))
    save_fig(path, fig)

def gen_labeled_diagram(path, title, items, subtitle=''):
    """A simple list/info diagram when no data is available."""
    fig, ax = plt.subplots(figsize=(8.7, 4.5))
    ax.set_xlim(0, 10); ax.set_ylim(0, 10)
    ax.axis('off')
    if title:
        ax.text(5, 9.3, title, ha='center', va='top', fontsize=13, fontweight='bold')
    for i, item in enumerate(items[:8]):
        y = 7.8 - i * 0.9
        ax.text(1, y, f'• {item}', va='center', fontsize=10)
    if subtitle:
        ax.text(5, 0.5, subtitle, ha='center', fontsize=9, color='gray')
    save_fig(path, fig)

# ─── Math: Algebra/Geometry ───────────────────────────────────────────────────

def gen_coordinate_grid(path, xlabel='x', ylabel='y', xlim=(-6,6), ylim=(-6,10),
                        title='', functions=None, points=None, labels=None):
    fig, ax = plt.subplots(figsize=(6, 5.5))
    ax.set_xlim(xlim); ax.set_ylim(ylim)
    ax.axhline(0, color='black', linewidth=1.2)
    ax.axvline(0, color='black', linewidth=1.2)
    ax.set_xticks(range(int(xlim[0]), int(xlim[1])+1))
    ax.set_yticks(range(int(ylim[0]), int(ylim[1])+1))
    ax.grid(True, alpha=0.4)
    ax.set_xlabel(xlabel); ax.set_ylabel(ylabel)
    if title: ax.set_title(title, fontsize=12)
    colors = ['blue','red','green','purple']
    if functions:
        x = np.linspace(xlim[0], xlim[1], 500)
        for i, (fn, lbl) in enumerate(functions):
            try:
                with np.errstate(all='ignore'):
                    y = fn(x)
                y = np.where(np.abs(y) < 100, y, np.nan)
                ax.plot(x, y, color=colors[i%len(colors)], linewidth=2, label=lbl)
            except: pass
    if points:
        for (px, py, lbl) in points:
            ax.plot(px, py, 'ko', markersize=6)
            if lbl:
                ax.annotate(lbl, (px, py), textcoords='offset points', xytext=(5,5), fontsize=9)
    if functions and any(l for _,l in functions):
        ax.legend(loc='upper left', fontsize=9)
    # Arrow heads on axes
    ax.annotate('', xy=(xlim[1], 0), xytext=(xlim[1]-0.3, 0),
                arrowprops=dict(arrowstyle='->', color='black'))
    ax.annotate('', xy=(0, ylim[1]), xytext=(0, ylim[1]-0.4),
                arrowprops=dict(arrowstyle='->', color='black'))
    save_fig(path, fig)

def gen_quadratic(path, a=1, h=0, k=0, xlim=(-6,6), ylim=(-4,12), title='',
                  x_intercepts=None, vertex_label=True):
    domain = xlim
    def f(x): return a*(x-h)**2 + k
    fns = [(f, f'y = {a}(x{"" if h==0 else ("-"+str(h) if h>0 else "+"+str(-h))})²{"" if k==0 else ("+"+str(k) if k>0 else str(k))}')]
    pts = [(h, k, f'({h},{k})' if vertex_label else '')] if vertex_label else None
    gen_coordinate_grid(path, xlim=xlim, ylim=ylim, title=title, functions=fns, points=pts)

def gen_linear(path, slope=1, intercept=0, xlim=(-6,6), ylim=(-8,8), title='',
               slope2=None, intercept2=None):
    def f1(x): return slope*x + intercept
    fns = [(f1, f'y = {slope}x{"" if intercept==0 else ("+"+str(intercept) if intercept>0 else str(intercept))}')]
    if slope2 is not None:
        def f2(x): return slope2*x + intercept2
        fns.append((f2, f'y = {slope2}x{"" if intercept2==0 else ("+"+str(intercept2) if intercept2>0 else str(intercept2))}'))
    gen_coordinate_grid(path, xlim=xlim, ylim=ylim, title=title, functions=fns)

def gen_absolute_value(path, a=1, h=0, k=0, xlim=(-6,6), ylim=(-2,10), title=''):
    def f(x): return a*np.abs(x-h) + k
    gen_coordinate_grid(path, xlim=xlim, ylim=ylim, title=title,
                        functions=[(f, f'y = |x{"-"+str(h) if h!=0 else ""}|{"+" + str(k) if k > 0 else str(k) if k < 0 else ""}')],
                        points=[(h, k, f'({h},{k})')])

def gen_exponential(path, base=2, a=1, xlim=(-4,6), ylim=(-1,12), title='', decay=False):
    if decay:
        def f(x): return a * (1/base)**x
        lbl = f'y = ({1}/{base})ˣ'
    else:
        def f(x): return a * base**x
        lbl = f'y = {base}ˣ'
    gen_coordinate_grid(path, xlim=xlim, ylim=ylim, title=title, functions=[(f, lbl)])

def gen_scatter_plot(path, x_data, y_data, xlabel='x', ylabel='y', title='',
                     regression=False, xlim=None, ylim=None):
    fig, ax = plt.subplots(figsize=(7, 5))
    ax.scatter(x_data, y_data, color='black', s=50, zorder=5)
    if xlim: ax.set_xlim(xlim)
    if ylim: ax.set_ylim(ylim)
    if regression and len(x_data) > 1:
        m, b = np.polyfit(x_data, y_data, 1)
        xr = np.array([min(x_data), max(x_data)])
        ax.plot(xr, m*xr + b, 'r--', linewidth=1.5, label=f'y ≈ {m:.2f}x + {b:.2f}')
        ax.legend(fontsize=9)
    styled_axes(ax, xlabel, ylabel, title)
    ax.grid(True, alpha=0.3)
    save_fig(path, fig)

def gen_data_table(path, headers, rows, title='', highlight_row=-1):
    fig, ax = plt.subplots(figsize=(7, max(3, len(rows)*0.45 + 1.5)))
    ax.axis('off')
    if title:
        ax.set_title(title, fontsize=12, fontweight='bold', pad=10)
    table = ax.table(
        cellText=rows, colLabels=headers,
        loc='center', cellLoc='center'
    )
    table.auto_set_font_size(False)
    table.set_fontsize(11)
    table.scale(1.2, 1.6)
    # Style header
    for j in range(len(headers)):
        table[0, j].set_facecolor('#d0d0d0')
        table[0, j].set_text_props(fontweight='bold')
    if highlight_row > 0:
        for j in range(len(headers)):
            table[highlight_row, j].set_facecolor('#fffacd')
    save_fig(path, fig)

def gen_piecewise(path, pieces, xlim=(-6,6), ylim=(-6,10), title='', labels=None):
    """pieces: list of (fn, x_min, x_max, open_left, open_right)"""
    fig, ax = plt.subplots(figsize=(6, 5.5))
    ax.axhline(0, color='black', linewidth=1); ax.axvline(0, color='black', linewidth=1)
    ax.set_xlim(xlim); ax.set_ylim(ylim); ax.grid(True, alpha=0.3)
    ax.set_xlabel('x'); ax.set_ylabel('y')
    if title: ax.set_title(title)
    colors = ['blue', 'red', 'green']
    for i, (fn, xmin, xmax, ol, or_) in enumerate(pieces):
        x = np.linspace(xmin, xmax, 200)
        y = fn(x)
        ax.plot(x, y, color=colors[i%3], linewidth=2)
        y0 = fn(np.array([xmin]))[0]; y1 = fn(np.array([xmax]))[0]
        ax.plot(xmin, y0, 'wo' if ol else 'ko', markersize=7,
                markeredgecolor=colors[i%3], markeredgewidth=2)
        ax.plot(xmax, y1, 'wo' if or_ else 'ko', markersize=7,
                markeredgecolor=colors[i%3], markeredgewidth=2)
    save_fig(path, fig)

def gen_histogram(path, data_or_bins, values, xlabel='', ylabel='Frequency',
                  title='', bar_width=0.8):
    fig, ax = plt.subplots(figsize=(7, 5))
    ax.bar(data_or_bins, values, width=bar_width, color='steelblue',
           edgecolor='black', linewidth=0.8)
    styled_axes(ax, xlabel, ylabel, title, grid=False)
    ax.grid(True, axis='y', alpha=0.3)
    save_fig(path, fig)

def gen_box_plot(path, datasets, labels=None, xlabel='', ylabel='', title=''):
    fig, ax = plt.subplots(figsize=(7, 5))
    bp = ax.boxplot(datasets, labels=labels, patch_artist=True)
    for patch in bp['boxes']:
        patch.set_facecolor('lightblue')
    styled_axes(ax, xlabel, ylabel, title)
    save_fig(path, fig)

def gen_number_line(path, start=-5, end=10, marked=None, shaded=None,
                    arrows=None, label='', title=''):
    """marked: list of (value, open/closed, label), arrows: list of direction arrows"""
    fig, ax = plt.subplots(figsize=(8, 2.5))
    ax.set_xlim(start-1, end+1); ax.set_ylim(-1, 2); ax.axis('off')
    ax.annotate('', xy=(end+0.8, 0.5), xytext=(start-0.8, 0.5),
                arrowprops=dict(arrowstyle='->', color='black', lw=2))
    # Ticks
    for v in range(int(start), int(end)+1):
        ax.plot([v, v], [0.3, 0.7], 'k-', linewidth=1.5)
        ax.text(v, -0.2, str(v), ha='center', va='top', fontsize=10)
    if marked:
        for val, closed, lbl in marked:
            ax.plot(val, 0.5, 'ko' if closed else 'wo', markersize=10,
                    markeredgecolor='black', markeredgewidth=2)
            if lbl:
                ax.text(val, 1.2, lbl, ha='center', fontsize=10)
    if shaded:
        for x1, x2 in shaded:
            ax.fill_between([x1, x2], [0.5]*2, [0.5]*2, alpha=0, linewidth=0)
            ax.annotate('', xy=(x2, 0.5), xytext=(x1, 0.5),
                       arrowprops=dict(arrowstyle='->', color='blue', lw=3))
    if title: ax.set_title(title, fontsize=11)
    save_fig(path, fig)

# ─── Geometry generators ──────────────────────────────────────────────────────

def gen_triangle(path, points=None, labels=None, angle_labels=None,
                 side_labels=None, title='', right_angle=None):
    if points is None:
        points = [(0, 0), (6, 0), (3, 4)]
    fig, ax = plt.subplots(figsize=(6, 5.5))
    pts = np.array(points + [points[0]])
    ax.plot(pts[:, 0], pts[:, 1], 'k-', linewidth=2)
    # Fill lightly
    triangle = plt.Polygon(points, fill=True, facecolor='#e8f4f8', edgecolor='black', linewidth=2)
    ax.add_patch(triangle)
    ax.set_aspect('equal')
    ax.axis('off')
    margin = 1
    ax.set_xlim(min(p[0] for p in points)-margin, max(p[0] for p in points)+margin)
    ax.set_ylim(min(p[1] for p in points)-margin, max(p[1] for p in points)+margin)
    if labels:
        offsets = [(-0.4, -0.4), (0.3, -0.4), (0, 0.3)]
        for i, (px, py) in enumerate(points):
            if i < len(labels) and labels[i]:
                ox, oy = offsets[i] if i < len(offsets) else (0, 0.3)
                ax.text(px+ox, py+oy, labels[i], ha='center', va='center',
                       fontsize=13, fontweight='bold')
    if side_labels:
        sides = [(0, 1), (1, 2), (2, 0)]
        for i, (a, b) in enumerate(sides):
            if i < len(side_labels) and side_labels[i]:
                mx = (points[a][0]+points[b][0])/2
                my = (points[a][1]+points[b][1])/2
                dx = points[b][0]-points[a][0]; dy = points[b][1]-points[a][1]
                nx = -dy; ny = dx
                norm = math.sqrt(nx**2+ny**2)
                if norm > 0: nx /= norm; ny /= norm
                ax.text(mx+nx*0.3, my+ny*0.3, side_labels[i], ha='center',
                       va='center', fontsize=11,
                       bbox=dict(boxstyle='round', facecolor='white', alpha=0.8))
    if right_angle is not None:
        # Draw right angle box at vertex right_angle
        v = points[right_angle]
        prev_idx = (right_angle - 1) % 3; next_idx = (right_angle + 1) % 3
        pv = np.array(points[prev_idx]) - np.array(v)
        nv = np.array(points[next_idx]) - np.array(v)
        pv = pv / np.linalg.norm(pv) * 0.3
        nv = nv / np.linalg.norm(nv) * 0.3
        sq = plt.Polygon([v, np.array(v)+pv, np.array(v)+pv+nv, np.array(v)+nv],
                        fill=False, edgecolor='black', linewidth=1.5)
        ax.add_patch(sq)
    if title: ax.set_title(title, fontsize=12)
    save_fig(path, fig)

def gen_circle(path, radius=3, center=(0,0), labels=None, chord=False,
               secant=False, tangent=False, inscribed_angle=False, title=''):
    fig, ax = plt.subplots(figsize=(6, 6))
    theta = np.linspace(0, 2*np.pi, 300)
    ax.plot(center[0]+radius*np.cos(theta), center[1]+radius*np.sin(theta),
            'k-', linewidth=2)
    ax.plot(*center, 'k.', markersize=5)
    if chord:
        ax.plot([center[0]-radius*0.7, center[0]+radius*0.7],
                [center[1]+radius*0.5, center[1]+radius*0.5], 'b-', linewidth=2)
        ax.text(center[0], center[1]+radius*0.5+0.2, 'chord', ha='center', fontsize=9)
    # Draw radius
    ax.plot([center[0], center[0]+radius], [center[1], center[1]], 'k--', linewidth=1)
    ax.text(center[0]+radius/2, center[1]+0.2, 'r', ha='center', fontsize=10)
    ax.set_aspect('equal')
    ax.axis('off')
    lim = radius + 1
    ax.set_xlim(center[0]-lim, center[0]+lim)
    ax.set_ylim(center[1]-lim, center[1]+lim)
    if labels:
        for x, y, lbl in labels:
            ax.text(x, y, lbl, ha='center', va='center', fontsize=12, fontweight='bold')
    if title: ax.set_title(title, fontsize=12)
    save_fig(path, fig)

def gen_quadrilateral(path, points, labels=None, side_labels=None,
                      angle_labels=None, title='', shape='parallelogram'):
    fig, ax = plt.subplots(figsize=(6, 5.5))
    poly = plt.Polygon(points, fill=True, facecolor='#e8f4f8',
                       edgecolor='black', linewidth=2)
    ax.add_patch(poly)
    ax.set_aspect('equal')
    ax.axis('off')
    margin = 1
    ax.set_xlim(min(p[0] for p in points)-margin, max(p[0] for p in points)+margin)
    ax.set_ylim(min(p[1] for p in points)-margin, max(p[1] for p in points)+margin)
    if labels:
        for i, (px, py) in enumerate(points):
            if i < len(labels) and labels[i]:
                cx = sum(p[0] for p in points)/len(points)
                cy = sum(p[1] for p in points)/len(points)
                dx = (px-cx); dy = (py-cy)
                n = math.sqrt(dx**2+dy**2)
                if n > 0: dx /= n; dy /= n
                ax.text(px+dx*0.4, py+dy*0.4, labels[i], ha='center', va='center',
                       fontsize=13, fontweight='bold')
    if title: ax.set_title(title, fontsize=12)
    save_fig(path, fig)

def gen_3d_figure(path, shape='pyramid', title=''):
    fig = plt.figure(figsize=(6, 5.5))
    ax = fig.add_subplot(111, projection='3d')
    if shape == 'pyramid':
        base = [(0,0,0),(4,0,0),(4,4,0),(0,4,0)]
        apex = (2,2,4)
        for i in range(4):
            b1 = base[i]; b2 = base[(i+1)%4]
            ax.plot([b1[0],b2[0]],[b1[1],b2[1]],[0,0],'k-',lw=2)
            ax.plot([b1[0],apex[0]],[b1[1],apex[1]],[0,apex[2]],'k-',lw=2)
    elif shape == 'prism':
        for z in [0, 3]:
            pts = [(0,0,z),(3,0,z),(1.5,2.6,z)]
            for i in range(3):
                ax.plot([pts[i][0],pts[(i+1)%3][0]],
                        [pts[i][1],pts[(i+1)%3][1]],
                        [pts[i][2],pts[(i+1)%3][2]],'k-',lw=2)
        for i in range(3):
            ax.plot([i==0,i==0],... )
    elif shape == 'cylinder':
        theta = np.linspace(0, 2*np.pi, 60)
        ax.plot(2*np.cos(theta), 2*np.sin(theta), 0, 'k-', lw=2)
        ax.plot(2*np.cos(theta), 2*np.sin(theta), 4, 'k-', lw=2)
        for a in [0, np.pi/2, np.pi, 3*np.pi/2]:
            ax.plot([2*np.cos(a)]*2, [2*np.sin(a)]*2, [0,4], 'k-', lw=1.5)
    ax.set_axis_off()
    if title: ax.set_title(title, fontsize=12)
    save_fig(path, fig)

# ─── Earth Science ────────────────────────────────────────────────────────────

def gen_topographic_map(path, title='Topographic Map'):
    fig, ax = plt.subplots(figsize=(7, 6))
    x = np.linspace(0, 10, 100); y = np.linspace(0, 10, 100)
    X, Y = np.meshgrid(x, y)
    Z = (300 - 5*(X-3)**2 - 4*(Y-7)**2 +
         200*np.exp(-0.3*((X-7)**2+(Y-3)**2)) +
         100*np.exp(-0.5*((X-2)**2+(Y-2)**2)))
    levels = np.arange(50, 500, 50)
    cs = ax.contour(X, Y, Z, levels=levels, colors='black', linewidths=1.2)
    ax.clabel(cs, fmt='%d m', fontsize=9)
    # River
    river_x = np.linspace(0, 10, 50)
    river_y = 5 + 0.5*np.sin(river_x)
    ax.plot(river_x, river_y, 'b-', linewidth=2, alpha=0.7)
    # North arrow
    ax.annotate('N', xy=(9.5, 9.5), fontsize=14, fontweight='bold', ha='center')
    ax.annotate('', xy=(9.5, 9.2), xytext=(9.5, 8.7),
               arrowprops=dict(arrowstyle='->', color='black', lw=2))
    ax.set_xlabel('Distance (km)'); ax.set_ylabel('Distance (km)')
    ax.set_title(title, fontsize=12)
    save_fig(path, fig)

def gen_hr_diagram(path, title='H-R Diagram'):
    fig, ax = plt.subplots(figsize=(7, 6))
    # Main sequence
    temp_ms = np.array([3000, 4000, 5000, 6000, 7000, 10000, 20000, 30000])
    lum_ms = np.array([0.001, 0.01, 0.1, 1, 4, 100, 10000, 100000])
    ax.plot(temp_ms, lum_ms, 'b-', linewidth=3, label='Main Sequence', zorder=5)
    # Giants/Supergiants
    ax.scatter([3500, 4000, 4500], [100, 500, 1000], color='orange', s=200,
               label='Giants', zorder=5)
    ax.scatter([3500, 4000], [10000, 100000], color='red', s=400, marker='*',
               label='Supergiants', zorder=5)
    # White dwarfs
    ax.scatter([10000, 15000, 20000], [0.001, 0.0003, 0.0001], color='white',
               edgecolors='black', s=80, label='White Dwarfs', zorder=5)
    # Our Sun
    ax.plot([5778], [1], 'y*', markersize=20, label='Sun', zorder=6)
    ax.set_xscale('log'); ax.set_yscale('log')
    ax.invert_xaxis()
    ax.set_xlabel('Temperature (K)', fontsize=11)
    ax.set_ylabel('Luminosity (L☉)', fontsize=11)
    ax.set_title(title, fontsize=12)
    ax.legend(fontsize=8, loc='upper right')
    ax.grid(True, alpha=0.2, which='both')
    save_fig(path, fig)

def gen_rock_cross_section(path, layers=None, title='Geological Cross-Section'):
    if layers is None:
        layers = [
            ('Sandstone', '#f4d03f', 0.0, 1.5),
            ('Shale', '#7f8c8d', 1.5, 2.8),
            ('Limestone', '#aed6f1', 2.8, 4.0),
            ('Granite (Igneous)', '#c39bd3', 4.0, 5.5),
        ]
    fig, ax = plt.subplots(figsize=(8, 5.5))
    for name, color, y0, y1 in layers:
        ax.fill_between([0, 10], [-y1, -y1], [-y0, -y0], color=color,
                       edgecolor='black', linewidth=1)
        ax.text(5, -(y0+y1)/2, name, ha='center', va='center',
               fontsize=11, fontweight='bold')
    ax.set_xlim(0, 10); ax.set_ylim(-6, 1)
    ax.set_xlabel('Distance (km)'); ax.set_ylabel('Depth (km)')
    ax.set_yticks([-5, -4, -3, -2, -1, 0])
    ax.set_yticklabels(['5', '4', '3', '2', '1', '0'])
    ax.set_title(title, fontsize=12)
    save_fig(path, fig)

def gen_weather_map(path, title='Weather Map'):
    fig, ax = plt.subplots(figsize=(7, 6))
    # Simple isobars (ellipses)
    pressures = [1000, 1004, 1008, 1012, 1016]
    colors = ['#3498db', '#5dade2', '#85c1e9', '#aed6f1', '#d6eaf8']
    for i, (p, c) in enumerate(zip(pressures, colors)):
        ell = mpatches.Ellipse((5, 5), width=2+i*1.5, height=1.5+i,
                                fill=False, edgecolor='black', linewidth=1.5)
        ax.add_patch(ell)
        ax.text(5+1+i*0.75+0.2, 5, str(p), fontsize=9, va='center')
    # Cold front
    front_x = [2, 3, 4, 5]
    front_y = [8, 7, 6, 5]
    ax.plot(front_x, front_y, 'b-', linewidth=2.5)
    for i in range(len(front_x)-1):
        mx = (front_x[i]+front_x[i+1])/2; my = (front_y[i]+front_y[i+1])/2
        ax.plot(mx, my, 'b^', markersize=8)
    ax.text(2.5, 8.3, 'Cold Front', color='blue', fontsize=9)
    # Warm front
    wf_x = [5, 6, 7, 8]
    wf_y = [5, 6, 7, 8]
    ax.plot(wf_x, wf_y, 'r-', linewidth=2.5)
    for i in range(len(wf_x)-1):
        mx = (wf_x[i]+wf_x[i+1])/2; my = (wf_y[i]+wf_y[i+1])/2
        ax.plot(mx, my, 'ro', markersize=8)
    ax.text(7.5, 8.3, 'Warm Front', color='red', fontsize=9)
    # L and H markers
    ax.text(5, 5, 'L', ha='center', va='center', fontsize=20, color='red', fontweight='bold')
    ax.text(8, 3, 'H', ha='center', va='center', fontsize=20, color='blue', fontweight='bold')
    ax.set_xlim(0, 10); ax.set_ylim(0, 10)
    ax.set_xlabel('Longitude'); ax.set_ylabel('Latitude')
    ax.set_title(title, fontsize=12)
    ax.grid(True, alpha=0.2)
    save_fig(path, fig)

def gen_rock_cycle(path, title='The Rock Cycle'):
    fig, ax = plt.subplots(figsize=(7, 6))
    ax.set_xlim(0, 10); ax.set_ylim(0, 10); ax.axis('off')
    # Rock type boxes
    boxes = [
        ('Igneous\nRock', (5, 8), '#ff9999'),
        ('Sedimentary\nRock', (1, 2), '#ffcc88'),
        ('Metamorphic\nRock', (9, 2), '#99ccff'),
        ('Magma', (5, 1), '#ff6600'),
    ]
    for name, (x, y), color in boxes:
        rect = FancyBboxPatch((x-1.2, y-0.7), 2.4, 1.4, boxstyle='round,pad=0.1',
                              facecolor=color, edgecolor='black', linewidth=1.5)
        ax.add_patch(rect)
        ax.text(x, y, name, ha='center', va='center', fontsize=10, fontweight='bold')
    # Arrows
    arrows = [
        ((5, 7.2), (2.2, 2.8), 'Weathering &\nErosion'),
        ((2.2, 1.3), (3.8, 0.5), 'Compaction &\nCementation'),
        ((8, 1.3), (6.2, 0.5), 'Melting'),
        ((5, 1.8), (5, 6.8), 'Volcanic\nEruption'),
        ((3.8, 2), (7.8, 2), 'Heat &\nPressure'),
        ((8, 2.8), (6.2, 7.2), 'Melting'),
    ]
    for (x1,y1), (x2,y2), lbl in arrows:
        ax.annotate('', xy=(x2, y2), xytext=(x1, y1),
                   arrowprops=dict(arrowstyle='->', color='#333333', lw=1.5))
        mx, my = (x1+x2)/2, (y1+y2)/2
        ax.text(mx, my, lbl, ha='center', va='center', fontsize=8,
               bbox=dict(facecolor='white', alpha=0.7, edgecolor='none'))
    ax.set_title(title, fontsize=13, fontweight='bold')
    save_fig(path, fig)

def gen_water_cycle(path, title='The Water Cycle'):
    fig, ax = plt.subplots(figsize=(8, 5.5))
    ax.set_xlim(0, 10); ax.set_ylim(0, 8); ax.axis('off')
    # Sky/ground
    ax.fill_between([0,10],[4.5,4.5],[0,0], color='#c8e6c9', alpha=0.4)
    ax.fill_between([0,10],[8,8],[4.5,4.5], color='#e3f2fd', alpha=0.4)
    # Mountain
    mountain = plt.Polygon([(0,4.5),(3,4.5),(4,7),(5,4.5),(10,4.5)],
                           facecolor='#7f8c8d', edgecolor='black', linewidth=1.5)
    ax.add_patch(mountain)
    # Ocean
    ocean = plt.Polygon([(7,4.5),(10,4.5),(10,2),(7,2)],
                        facecolor='#2980b9', edgecolor='black', linewidth=1)
    ax.add_patch(ocean)
    ax.text(8.5, 3.2, 'Ocean', ha='center', color='white', fontsize=10, fontweight='bold')
    # Cloud
    for cx, cy in [(4.5, 6.5), (3.8, 6.5), (5.2, 6.5)]:
        circle = mpatches.Circle((cx, cy), 0.5, color='white', ec='#aaa', lw=1)
        ax.add_patch(circle)
    ax.text(4.5, 7.2, 'Cloud', ha='center', fontsize=9)
    # Arrows and labels
    arrows = [
        ((8, 4.5), (4.8, 6.3), 'Evaporation', 'blue'),
        ((4.5, 5.9), (1.5, 5.9), 'Wind', '#555'),
        ((3.5, 6.0), (2, 4.8), 'Precipitation', 'blue'),
        ((2.5, 4.5), (7.5, 3.5), 'Runoff', '#2980b9'),
        ((2, 4.4), (4, 4.0), 'Infiltration', '#795548'),
        ((1.5, 5.5), (1.5, 4.6), 'Transpiration', 'green'),
    ]
    for (x1,y1),(x2,y2),lbl,color in arrows:
        ax.annotate('', xy=(x2,y2), xytext=(x1,y1),
                   arrowprops=dict(arrowstyle='->', color=color, lw=2))
        ax.text((x1+x2)/2, (y1+y2)/2, lbl, ha='center', fontsize=8.5,
               color=color, fontweight='bold')
    ax.set_title(title, fontsize=13, fontweight='bold')
    save_fig(path, fig)

def gen_heating_curve(path, substance='Water', title=''):
    fig, ax = plt.subplots(figsize=(7, 5))
    # Heating curve segments for water
    segments = [
        (0, 10, -40, 0, 'Solid\nheating'),     # Solid warming
        (10, 20, 0, 0, 'Melting\n(0°C)'),       # Melting plateau
        (20, 45, 0, 100, 'Liquid\nheating'),    # Liquid warming
        (45, 65, 100, 100, 'Boiling\n(100°C)'), # Boiling plateau
        (65, 80, 100, 140, 'Gas\nheating'),     # Gas warming
    ]
    for x1, x2, y1, y2, lbl in segments:
        ax.plot([x1, x2], [y1, y2], 'b-', linewidth=2.5)
        ax.text((x1+x2)/2, (y1+y2)/2 + 4, lbl, ha='center', fontsize=9, color='#333')
    ax.set_xlabel('Heat Added (kJ)', fontsize=11)
    ax.set_ylabel('Temperature (°C)', fontsize=11)
    ax.set_title(title or f'Heating Curve of {substance}', fontsize=12)
    ax.axhline(0, color='gray', linestyle='--', linewidth=1, alpha=0.5)
    ax.axhline(100, color='gray', linestyle='--', linewidth=1, alpha=0.5)
    ax.text(-1, 0, '0°C', ha='right', fontsize=9, color='gray')
    ax.text(-1, 100, '100°C', ha='right', fontsize=9, color='gray')
    ax.grid(True, alpha=0.3)
    save_fig(path, fig)

def gen_potential_energy_diagram(path, exothermic=True, title=''):
    fig, ax = plt.subplots(figsize=(7, 5))
    if exothermic:
        x = [0, 1.5, 3, 4.5, 6]
        y = [2, 2, 5, 1, 1]  # reactants at 2, products at 1
    else:
        x = [0, 1.5, 3, 4.5, 6]
        y = [1, 1, 5, 3, 3]  # products higher than reactants
    ax.plot(x, y, 'b-', linewidth=2.5)
    ax.fill_between(x, y, min(y), alpha=0.1, color='blue')
    # Labels
    ax.text(0.3, y[0]+0.2, 'Reactants', fontsize=10)
    ax.text(5.0, y[-1]+0.2, 'Products', fontsize=10)
    ax.annotate('', xy=(3, y[2]), xytext=(3, y[2]-1.5),
               arrowprops=dict(arrowstyle='<->', color='red', lw=2))
    ax.text(3.2, (y[2]+y[2]-1.5)/2, 'Ea', color='red', fontsize=11, fontweight='bold')
    if exothermic:
        ax.annotate('', xy=(5.5, y[-1]), xytext=(5.5, y[0]),
                   arrowprops=dict(arrowstyle='<->', color='green', lw=2))
        ax.text(5.7, (y[-1]+y[0])/2, 'ΔH', color='green', fontsize=11, fontweight='bold')
    ax.set_xlabel('Reaction Coordinate', fontsize=11)
    ax.set_ylabel('Potential Energy (kJ)', fontsize=11)
    ax.set_title(title or ('Exothermic Reaction' if exothermic else 'Endothermic Reaction'),
                fontsize=12)
    ax.set_ylim(0, 7); ax.set_xlim(-0.2, 6.5)
    ax.grid(True, alpha=0.3)
    save_fig(path, fig)

def gen_solubility_curve(path, title='Solubility Curves (Table G)'):
    fig, ax = plt.subplots(figsize=(7, 5.5))
    temp = np.linspace(0, 100, 100)
    # Approximate NYS Table G solubility curves
    substances = {
        'KNO₃':  0.001*temp**2 + 0.8*temp + 13,
        'NaNO₃': 0.005*temp**2 + 0.5*temp + 73,
        'NaCl':  0.003*temp**2 - 0.01*temp + 35,
        'KCl':   0.003*temp**2 + 0.2*temp + 28,
        'NH₄Cl': 0.002*temp**2 + 0.4*temp + 29,
    }
    colors = ['blue','red','green','purple','orange']
    for (name, solubility), color in zip(substances.items(), colors):
        ax.plot(temp, solubility, color=color, linewidth=2, label=name)
        # Label at end
        ax.text(101, solubility[-1], name, color=color, va='center', fontsize=9)
    ax.set_xlim(0, 100); ax.set_ylim(0, 200)
    ax.set_xlabel('Temperature (°C)', fontsize=11)
    ax.set_ylabel('Solubility (g/100 g H₂O)', fontsize=11)
    ax.set_title(title, fontsize=12)
    ax.legend(loc='upper left', fontsize=9, framealpha=0.8)
    ax.grid(True, alpha=0.3)
    save_fig(path, fig)

# ─── Living Environment ───────────────────────────────────────────────────────

def gen_enzyme_graph(path, x_axis='temperature', optimal=37, title=''):
    fig, ax = plt.subplots(figsize=(7, 5))
    if x_axis == 'temperature':
        x = np.linspace(0, 70, 200)
        xlabel = 'Temperature (°C)'
        peak_label = f'{optimal}°C (optimal)'
    else:
        x = np.linspace(1, 13, 200)
        xlabel = 'pH'
        peak_label = f'pH {optimal} (optimal)'
    y = np.exp(-0.015*(x - optimal)**2)
    ax.plot(x, y, 'b-', linewidth=2.5)
    ax.axvline(optimal, color='red', linestyle='--', linewidth=1.5, alpha=0.7)
    ax.text(optimal, 1.05, peak_label, ha='center', fontsize=9, color='red')
    ax.fill_between(x, y, alpha=0.15, color='blue')
    ax.set_xlabel(xlabel, fontsize=11)
    ax.set_ylabel('Enzyme Activity (relative units)', fontsize=11)
    ax.set_title(title or f'Effect of {x_axis.title()} on Enzyme Activity', fontsize=12)
    ax.set_ylim(0, 1.2)
    ax.grid(True, alpha=0.3)
    save_fig(path, fig)

def gen_population_graph(path, graph_type='logistic', title=''):
    fig, ax = plt.subplots(figsize=(7, 5))
    t = np.linspace(0, 100, 500)
    if graph_type == 'logistic':
        K = 1000
        r = 0.1
        N0 = 10
        N = K / (1 + ((K-N0)/N0) * np.exp(-r*t))
        ax.plot(t, N, 'g-', linewidth=2.5)
        ax.axhline(K, color='red', linestyle='--', linewidth=1.5, alpha=0.7)
        ax.text(90, K+20, 'K (carrying capacity)', ha='right', color='red', fontsize=9)
        ax.set_ylabel('Population Size', fontsize=11)
    elif graph_type == 'predator_prey':
        prey = 500 + 400*np.sin(2*np.pi*t/40)
        predator = 100 + 80*np.sin(2*np.pi*t/40 - np.pi/4)
        ax.plot(t, prey, 'g-', linewidth=2, label='Prey (Hare)')
        ax.plot(t, predator, 'r-', linewidth=2, label='Predator (Lynx)')
        ax.legend(fontsize=10)
        ax.set_ylabel('Population Size', fontsize=11)
    elif graph_type == 'exponential':
        N = 10 * np.exp(0.05*t)
        ax.plot(t, N, 'b-', linewidth=2.5)
        ax.set_ylabel('Population Size', fontsize=11)
    ax.set_xlabel('Time (years)', fontsize=11)
    ax.set_title(title or f'{graph_type.title()} Population Growth', fontsize=12)
    ax.grid(True, alpha=0.3)
    save_fig(path, fig)

def gen_food_web(path, title='Food Web', organisms=None, connections=None):
    fig, ax = plt.subplots(figsize=(8, 6))
    ax.set_xlim(0, 10); ax.set_ylim(0, 8); ax.axis('off')
    if organisms is None:
        organisms = {
            'Sun': (5, 7.5), 'Grass': (2, 6), 'Trees': (7, 6),
            'Rabbit': (1, 4), 'Deer': (5, 4), 'Mouse': (8.5, 4),
            'Fox': (2, 2), 'Owl': (6, 2), 'Wolf': (9, 2),
            'Decomposers': (5, 0.5)
        }
        connections = [
            ('Sun','Grass'), ('Sun','Trees'),
            ('Grass','Rabbit'), ('Grass','Deer'), ('Trees','Deer'), ('Trees','Mouse'),
            ('Rabbit','Fox'), ('Rabbit','Owl'), ('Mouse','Owl'), ('Deer','Wolf'),
            ('Fox','Decomposers'), ('Owl','Decomposers'), ('Wolf','Decomposers'),
        ]
    colors = {'Sun':'#FFD700', 'Grass':'#228B22', 'Trees':'#1B6B1B',
              'Rabbit':'#D2B48C', 'Deer':'#8B7355', 'Mouse':'#A9A9A9',
              'Fox':'#FF6600', 'Owl':'#8B4513', 'Wolf':'#696969',
              'Decomposers':'#6B8E23'}
    # Draw arrows
    for a, b in connections:
        if a in organisms and b in organisms:
            x1,y1 = organisms[a]; x2,y2 = organisms[b]
            ax.annotate('', xy=(x2,y2), xytext=(x1,y1),
                       arrowprops=dict(arrowstyle='->', color='gray', lw=1.2))
    # Draw organism boxes
    for name, (x, y) in organisms.items():
        color = colors.get(name, '#E0E0E0')
        bbox = FancyBboxPatch((x-0.8, y-0.35), 1.6, 0.7,
                              boxstyle='round,pad=0.1', facecolor=color,
                              edgecolor='black', linewidth=1, alpha=0.85)
        ax.add_patch(bbox)
        ax.text(x, y, name, ha='center', va='center', fontsize=8.5, fontweight='bold')
    ax.set_title(title, fontsize=13, fontweight='bold')
    save_fig(path, fig)

def gen_pedigree(path, title='Pedigree Chart', generations=3, affected=None):
    """Simple 3-generation pedigree."""
    if affected is None:
        affected = [5]  # individual numbers that are affected
    fig, ax = plt.subplots(figsize=(8, 6))
    ax.set_xlim(0, 12); ax.set_ylim(0, 8); ax.axis('off')
    # Generation positions
    individuals = {}  # id -> (x, y, sex)
    # Gen I
    individuals[1] = (3, 6.5, 'M')
    individuals[2] = (5, 6.5, 'F')
    individuals[3] = (8, 6.5, 'M')
    individuals[4] = (10, 6.5, 'F')
    # Gen II (children of I1-I2)
    for i, (x, sex) in enumerate([(2, 'M'),(4, 'F'),(6, 'M')]):
        individuals[5+i] = (x, 4.5, sex)
    # Marriage lines gen I
    ax.plot([3, 5], [6.5, 6.5], 'k-', lw=1.5)
    ax.plot([8, 10], [6.5, 6.5], 'k-', lw=1.5)
    # Descent lines gen II
    ax.plot([4, 4], [6.5, 5.2], 'k-', lw=1.5)
    ax.plot([2, 6], [5.2, 5.2], 'k-', lw=1.5)
    for x in [2, 4, 6]:
        ax.plot([x, x], [5.2, 4.9], 'k-', lw=1.5)
    # Gen III
    individuals[8] = (6, 2.5, 'M')
    individuals[9] = (8, 2.5, 'F')
    individuals[10] = (10, 2.5, 'M')
    ax.plot([8, 10], [4.5, 4.5], 'k-', lw=1.5)
    ax.plot([9, 9], [4.5, 3.2], 'k-', lw=1.5)
    ax.plot([7, 11], [3.2, 3.2], 'k-', lw=1.5)
    for x in [7, 9, 11]:
        ax.plot([x, x], [3.2, 2.9], 'k-', lw=1.5)
    # Adjust positions
    individuals[8] = (7, 2.5, 'M')
    individuals[9] = (9, 2.5, 'F')
    individuals[10] = (11, 2.5, 'M')
    # Draw individuals
    for iid, (x, y, sex) in individuals.items():
        is_affected = iid in affected
        color = 'black' if is_affected else 'white'
        ec = 'black'
        if sex == 'M':
            rect = mpatches.Rectangle((x-0.4, y-0.4), 0.8, 0.8,
                                      facecolor=color, edgecolor=ec, linewidth=2)
            ax.add_patch(rect)
        else:
            circle = mpatches.Circle((x, y), 0.4, facecolor=color,
                                     edgecolor=ec, linewidth=2)
            ax.add_patch(circle)
        ax.text(x, y-0.8, f'{"I" if y>6 else "II" if y>4 else "III"}-{iid}',
               ha='center', fontsize=7.5)
    # Legend
    ax.plot([0.3], [1], 'ks', markersize=12, label='Affected')
    ax.plot([0.3], [0.3], 'ws', markersize=12, markeredgecolor='black', markeredgewidth=2,
           label='Unaffected ♂')
    ax.plot([1.5], [0.3], 'wo', markersize=12, markeredgecolor='black', markeredgewidth=2,
           label='Unaffected ♀')
    ax.legend(loc='lower right', fontsize=8)
    # Gen labels
    for lbl, y in [('Generation I', 6.5), ('Generation II', 4.5), ('Generation III', 2.5)]:
        ax.text(0.2, y, lbl, va='center', fontsize=8.5, color='gray')
    ax.set_title(title, fontsize=12)
    save_fig(path, fig)

def gen_cell_diagram(path, cell_type='animal', title=''):
    fig, ax = plt.subplots(figsize=(7, 6))
    ax.set_xlim(0, 10); ax.set_ylim(0, 10); ax.axis('off')
    if cell_type == 'animal':
        # Cell membrane
        cell = mpatches.Ellipse((5, 5), 9, 7, facecolor='#FFF9C4',
                                edgecolor='#333', linewidth=2)
        ax.add_patch(cell)
        ax.text(5, 0.3, 'Cell Membrane', ha='center', fontsize=9)
        # Nucleus
        nucleus = mpatches.Ellipse((5, 5), 2.5, 2, facecolor='#90CAF9',
                                   edgecolor='#333', linewidth=2)
        ax.add_patch(nucleus)
        ax.text(5, 5, 'Nucleus', ha='center', va='center', fontsize=9, fontweight='bold')
        # Mitochondria
        for (cx, cy) in [(2.5, 6), (7.5, 6), (3, 3.5)]:
            mito = mpatches.Ellipse((cx, cy), 1.2, 0.6, facecolor='#A5D6A7',
                                    edgecolor='#333', linewidth=1.5, angle=20)
            ax.add_patch(mito)
        ax.text(2.2, 6.8, 'Mitochondrion', ha='center', fontsize=8)
        # Ribosomes (dots)
        for (rx, ry) in [(6.5, 7), (7, 4), (3.5, 7.5)]:
            ax.plot(rx, ry, 'k.', markersize=6)
        ax.text(7.5, 4.8, 'Ribosome', ha='center', fontsize=8)
        # Vacuole
        vac = mpatches.Ellipse((7, 5), 1.5, 1.2, facecolor='#E0F2F1',
                               edgecolor='#333', linewidth=1.5)
        ax.add_patch(vac)
        ax.text(7.5, 5.8, 'Vacuole', ha='center', fontsize=8)
    else:  # plant
        rect = mpatches.Rectangle((0.3, 0.3), 9.4, 9.4, facecolor='#F1F8E9',
                                  edgecolor='#2E7D32', linewidth=3)
        ax.add_patch(rect)
        ax.text(5, 9.8, 'Cell Wall', ha='center', fontsize=9)
        # Large central vacuole
        vac = mpatches.Ellipse((5, 4.5), 5.5, 5, facecolor='#E0F7FA',
                               edgecolor='#333', linewidth=1.5)
        ax.add_patch(vac)
        ax.text(5, 4.5, 'Central\nVacuole', ha='center', va='center', fontsize=9)
        # Chloroplasts
        for (cx, cy) in [(2, 7.5), (8, 7.5), (2, 2)]:
            chl = mpatches.Ellipse((cx, cy), 1.2, 0.7, facecolor='#66BB6A',
                                   edgecolor='#333', linewidth=1.5)
            ax.add_patch(chl)
        ax.text(2, 8.3, 'Chloroplast', ha='center', fontsize=8)
        # Nucleus
        nuc = mpatches.Ellipse((8, 2), 1.5, 1.2, facecolor='#90CAF9',
                               edgecolor='#333', linewidth=2)
        ax.add_patch(nuc)
        ax.text(8, 2, 'Nucleus', ha='center', va='center', fontsize=8, fontweight='bold')
    ax.set_title(title or f'{cell_type.title()} Cell', fontsize=12)
    save_fig(path, fig)

def gen_energy_pyramid(path, title='Energy Pyramid', levels=None):
    if levels is None:
        levels = [('Producers (Plants)', '10,000 kcal', '#66BB6A'),
                  ('Primary Consumers\n(Herbivores)', '1,000 kcal', '#FFA726'),
                  ('Secondary Consumers\n(Carnivores)', '100 kcal', '#EF5350'),
                  ('Tertiary Consumers\n(Top Predators)', '10 kcal', '#7B1FA2')]
    fig, ax = plt.subplots(figsize=(7, 6))
    ax.set_xlim(0, 10); ax.set_ylim(0, 9); ax.axis('off')
    n = len(levels)
    for i, (name, energy, color) in enumerate(levels):
        width = 9 - i * 1.8
        x0 = (10 - width) / 2
        y0 = i * 1.8 + 0.3
        rect = mpatches.Rectangle((x0, y0), width, 1.5, facecolor=color,
                                  edgecolor='black', linewidth=1.5, alpha=0.85)
        ax.add_patch(rect)
        ax.text(5, y0+0.75, f'{name}\n{energy}', ha='center', va='center',
               fontsize=9, fontweight='bold', color='white' if i>0 else 'black')
    ax.annotate('Energy flows\nupward (10% rule)', xy=(8.5, 4.5),
               xytext=(8, 4.5), fontsize=9, color='gray')
    ax.set_title(title, fontsize=12)
    save_fig(path, fig)

def gen_dna_diagram(path, title='DNA Double Helix Structure'):
    fig, ax = plt.subplots(figsize=(5, 7))
    ax.set_xlim(0, 10); ax.set_ylim(0, 14); ax.axis('off')
    # Two backbone strands
    t = np.linspace(0, 4*np.pi, 300)
    x1 = 2.5 + 2*np.sin(t); x2 = 7.5 - 2*np.sin(t)
    y = np.linspace(1, 13, 300)
    ax.plot(x1, y, 'b-', linewidth=3, alpha=0.8)
    ax.plot(x2, y, 'r-', linewidth=3, alpha=0.8)
    # Base pairs (horizontal rungs)
    n_rungs = 10
    for i in range(n_rungs):
        idx = int(i * len(t) / n_rungs)
        xL = x1[idx]; xR = x2[idx]; yR = y[idx]
        pair = ['A-T', 'T-A', 'G-C', 'C-G'][i % 4]
        mid = (xL + xR) / 2
        ax.plot([xL, xR], [yR, yR], 'k-', linewidth=2)
        ax.plot(mid, yR, 'wo', markersize=4)
        ax.text(mid, yR + 0.2, pair, ha='center', fontsize=8, color='#333')
    ax.text(0.3, 7, "5'→3'", va='center', fontsize=10, color='blue', rotation=90)
    ax.text(9.5, 7, "3'→5'", va='center', fontsize=10, color='red', rotation=90)
    ax.set_title(title, fontsize=11)
    save_fig(path, fig)

def gen_carbon_cycle(path, title='Carbon Cycle'):
    fig, ax = plt.subplots(figsize=(8, 6))
    ax.set_xlim(0, 10); ax.set_ylim(0, 8); ax.axis('off')
    # Background zones
    ax.fill_between([0,10],[3,3],[0,0], color='#E8F5E9', alpha=0.5)
    ax.fill_between([0,10],[8,8],[3,3], color='#E3F2FD', alpha=0.4)
    ax.text(0.3, 1.5, 'Earth/Ocean', fontsize=9, color='#2E7D32', style='italic')
    ax.text(0.3, 6, 'Atmosphere', fontsize=9, color='#1565C0', style='italic')
    # CO2 in atmosphere
    co2_box = FancyBboxPatch((3.5, 5.5), 3, 1.2, boxstyle='round,pad=0.15',
                             facecolor='#90CAF9', edgecolor='black', linewidth=1.5)
    ax.add_patch(co2_box)
    ax.text(5, 6.1, 'CO₂ in\nAtmosphere', ha='center', va='center', fontsize=10, fontweight='bold')
    # Boxes
    boxes = [
        ('Plants', (1.5, 3.5), '#A5D6A7'),
        ('Animals', (4.5, 3.5), '#FFCC80'),
        ('Fossil Fuels', (8, 1.5), '#B0BEC5'),
        ('Soil Organic\nMatter', (2, 1.2), '#8D6E63'),
    ]
    for name, (x, y), color in boxes:
        b = FancyBboxPatch((x-1, y-0.5), 2, 1, boxstyle='round,pad=0.1',
                          facecolor=color, edgecolor='black', linewidth=1.5)
        ax.add_patch(b)
        ax.text(x, y, name, ha='center', va='center', fontsize=9, fontweight='bold')
    # Arrows
    arrows = [
        ((5, 5.5), (1.5, 4.5), 'Photosynthesis', 'green'),
        ((1.5, 4.5), (5, 5.5), 'Respiration', 'orange'),
        ((4.5, 4.5), (5, 5.5), 'Respiration', 'orange'),
        ((8, 2.5), (5, 5.5), 'Combustion', 'red'),
        ((1.5, 3), (2, 2.2), 'Decomposition', 'brown'),
    ]
    for (x1,y1),(x2,y2),lbl,color in arrows:
        ax.annotate('', xy=(x2,y2), xytext=(x1,y1),
                   arrowprops=dict(arrowstyle='->', color=color, lw=2))
        ax.text((x1+x2)/2+0.3, (y1+y2)/2, lbl, fontsize=7.5, color=color,
               bbox=dict(facecolor='white', alpha=0.6, edgecolor='none'))
    ax.set_title(title, fontsize=13, fontweight='bold')
    save_fig(path, fig)

def gen_nitrogen_cycle(path, title='Nitrogen Cycle'):
    fig, ax = plt.subplots(figsize=(8, 6))
    ax.set_xlim(0, 10); ax.set_ylim(0, 8); ax.axis('off')
    boxes = {
        'N₂ in Atmosphere': (5, 7, '#90CAF9'),
        'Nitrate (NO₃⁻)': (2, 4.5, '#A5D6A7'),
        'Ammonia (NH₃)': (8, 4.5, '#FFCC80'),
        'Nitrite (NO₂⁻)': (5, 2.5, '#CE93D8'),
        'Organic N\n(Organisms)': (5, 5.5, '#FFAB91'),
    }
    for name, (x, y, *c) in [(k, v) for k,v in boxes.items()]:
        color = boxes[name][2] if len(boxes[name])>2 else '#E0E0E0'
        b = FancyBboxPatch((x-1.2, y-0.5), 2.4, 1.0, boxstyle='round,pad=0.1',
                          facecolor=color, edgecolor='black', linewidth=1.5)
        ax.add_patch(b)
        ax.text(x, y, name, ha='center', va='center', fontsize=9, fontweight='bold')
    arrows = [
        ((5, 6.5), (5, 6.0), 'N₂ fixation\n(bacteria)', 'blue'),
        ((5, 5.0), (3.2, 5.0), 'Plant uptake', 'green'),
        ((6.8, 5.5), (7, 5.0), 'Excretion', 'orange'),
        ((2, 4.0), (3.8, 3.0), 'Nitrification', 'purple'),
        ((8, 4.0), (6.2, 3.0), 'Nitrification', 'purple'),
        ((5, 2.0), (5, 1.2), 'Denitrification\n(back to N₂)', 'red'),
    ]
    for (x1,y1),(x2,y2),lbl,color in arrows:
        ax.annotate('', xy=(x2,y2), xytext=(x1,y1),
                   arrowprops=dict(arrowstyle='->', color=color, lw=1.8))
        ax.text((x1+x2)/2+0.2, (y1+y2)/2, lbl, fontsize=7.5, color=color)
    ax.set_title(title, fontsize=13, fontweight='bold')
    save_fig(path, fig)

def gen_ecological_succession(path, title='Ecological Succession'):
    fig, ax = plt.subplots(figsize=(9, 5))
    ax.set_xlim(0, 11); ax.set_ylim(0, 6); ax.axis('off')
    stages = [
        ('Bare\nRock', 0.8, '#D3D3D3'),
        ('Lichens\n& Mosses', 2.5, '#90EE90'),
        ('Grasses\n& Herbs', 4.3, '#32CD32'),
        ('Shrubs', 6.2, '#228B22'),
        ('Young\nForest', 8.0, '#006400'),
        ('Climax\nForest', 9.8, '#003300'),
    ]
    for name, x, color in stages:
        h = 1.5 + stages.index((name, x, color)) * 0.3
        rect = mpatches.Rectangle((x-0.6, 0.5), 1.2, h, facecolor=color,
                                  edgecolor='black', linewidth=1, alpha=0.85)
        ax.add_patch(rect)
        ax.text(x, 0.3, name, ha='center', va='top', fontsize=8.5)
        # Tree symbol for later stages
        if x > 5:
            ax.plot([x, x], [0.5+h, 0.5+h+0.7], 'k-', lw=1.5)
            tri = plt.Polygon([(x-0.4, 0.5+h+0.3), (x+0.4, 0.5+h+0.3), (x, 0.5+h+1.0)],
                             facecolor=color, edgecolor='black', lw=1)
            ax.add_patch(tri)
    # Arrow showing time
    ax.annotate('', xy=(10.8, 0.5), xytext=(0, 0.5),
               arrowprops=dict(arrowstyle='->', color='black', lw=2))
    ax.text(5.5, 0, 'Time →  (hundreds of years)', ha='center', fontsize=9)
    ax.text(10, 5.5, 'Climax\nCommunity', ha='center', fontsize=8.5, color='#003300',
           fontweight='bold')
    ax.set_title(title, fontsize=12)
    save_fig(path, fig)

# ─── Physics generators ───────────────────────────────────────────────────────

def gen_wave_diagram(path, wave_type='transverse', title=''):
    fig, ax = plt.subplots(figsize=(8, 4))
    x = np.linspace(0, 4*np.pi, 400)
    if wave_type == 'transverse':
        y = np.sin(x)
        ax.plot(x, y, 'b-', linewidth=2.5)
        # Labels
        ax.annotate('', xy=(np.pi, 1), xytext=(0, 1),
                   arrowprops=dict(arrowstyle='<->', color='red', lw=2))
        ax.text(np.pi/2, 1.2, 'λ (wavelength)', ha='center', color='red', fontsize=10)
        ax.annotate('', xy=(np.pi/2, 1), xytext=(np.pi/2, 0),
                   arrowprops=dict(arrowstyle='<->', color='green', lw=2))
        ax.text(np.pi/2+0.5, 0.5, 'A (amplitude)', va='center', color='green', fontsize=10)
        ax.text(0.2, 1.05, 'crest', fontsize=9, color='gray')
        ax.text(np.pi+0.2, -1.1, 'trough', fontsize=9, color='gray')
        ax.axhline(0, color='black', linewidth=1, linestyle='--', alpha=0.5)
        ax.set_ylabel('Displacement', fontsize=11)
    ax.set_xlabel('Position (m)', fontsize=11)
    ax.set_title(title or f'{wave_type.title()} Wave', fontsize=12)
    ax.grid(True, alpha=0.3)
    ax.set_ylim(-1.5, 1.8)
    save_fig(path, fig)

def gen_motion_graph(path, graph_type='position_time', title='',
                     motion='constant_velocity'):
    fig, ax = plt.subplots(figsize=(7, 5))
    t = np.linspace(0, 10, 200)
    if graph_type == 'position_time':
        if motion == 'constant_velocity':
            x = 2 * t
            ylabel = 'Position (m)'
        elif motion == 'acceleration':
            x = 0.5 * t**2
            ylabel = 'Position (m)'
        elif motion == 'deceleration':
            x = 20*t - t**2
            x = np.clip(x, 0, None)
            ylabel = 'Position (m)'
        else:
            x = 2 * t
            ylabel = 'Position (m)'
    elif graph_type == 'velocity_time':
        if motion == 'constant_velocity':
            x = np.ones_like(t) * 5
        elif motion == 'acceleration':
            x = 2 * t
        else:
            x = 10 - t
            x = np.clip(x, 0, None)
        ylabel = 'Velocity (m/s)'
    ax.plot(t, x, 'b-', linewidth=2.5)
    ax.set_xlabel('Time (s)', fontsize=11)
    ax.set_ylabel(ylabel, fontsize=11)
    ax.set_title(title or f'{graph_type.replace("_"," ").title()} Graph', fontsize=12)
    ax.grid(True, alpha=0.3)
    ax.set_xlim(0, 10); ax.set_ylim(0, max(x)+2 if len(x)>0 else 10)
    save_fig(path, fig)

def gen_circuit_diagram(path, circuit_type='series', title=''):
    fig, ax = plt.subplots(figsize=(7, 5))
    ax.set_xlim(0, 10); ax.set_ylim(0, 8); ax.axis('off')
    if circuit_type == 'series':
        # Battery
        ax.plot([1, 1], [2, 6], 'k-', lw=2)
        ax.plot([0.6, 1.4], [4.5, 4.5], 'k-', lw=3)
        ax.plot([0.7, 1.3], [3.8, 3.8], 'k-', lw=1.5)
        ax.text(0.3, 4.15, '+', fontsize=12, ha='center')
        ax.text(0.3, 3.65, '−', fontsize=12, ha='center')
        ax.text(0.2, 5.5, 'Battery', fontsize=9, ha='center', rotation=90)
        # Wires
        ax.plot([1, 9], [6, 6], 'k-', lw=2)
        ax.plot([1, 9], [2, 2], 'k-', lw=2)
        # Resistor 1
        for x in np.linspace(3.5, 5.5, 8):
            y = 6 + 0.25 * np.sin((x-3.5)*np.pi/2*4)
            ax.plot(x, y, 'k.', markersize=3)
        ax.plot([3.5, 5.5], [6, 6], 'k-', lw=2)
        ax.text(4.5, 6.7, 'R₁', ha='center', fontsize=11)
        # Resistor 2
        for x in np.linspace(6.5, 8.5, 8):
            y = 6 + 0.25 * np.sin((x-6.5)*np.pi/2*4)
            ax.plot(x, y, 'k.', markersize=3)
        ax.text(7.5, 6.7, 'R₂', ha='center', fontsize=11)
        ax.plot([9, 9], [2, 6], 'k-', lw=2)
        ax.text(5, 1.2, 'Series Circuit', ha='center', fontsize=12)
    save_fig(path, fig)

def gen_force_diagram(path, forces=None, title='Free Body Diagram'):
    if forces is None:
        forces = [
            (0, 1, 'Normal\nForce (FN)'),
            (0, -1, 'Weight (Fg)'),
            (1, 0, 'Applied\nForce (F)'),
            (-0.3, 0, 'Friction (Ff)'),
        ]
    fig, ax = plt.subplots(figsize=(6, 6))
    ax.set_xlim(-3, 3); ax.set_ylim(-3, 3); ax.axis('off')
    # Object
    rect = mpatches.Rectangle((-0.5, -0.5), 1, 1, facecolor='#ccc',
                              edgecolor='black', linewidth=2)
    ax.add_patch(rect)
    for dx, dy, label in forces:
        ax.annotate('', xy=(dx*2, dy*2), xytext=(0, 0),
                   arrowprops=dict(arrowstyle='->', color='blue', lw=2.5))
        ax.text(dx*2.2, dy*2.2, label, ha='center', va='center',
               fontsize=9, color='blue',
               bbox=dict(facecolor='white', alpha=0.7, edgecolor='none'))
    ax.set_title(title, fontsize=12)
    save_fig(path, fig)

# ─── Dispatch ─────────────────────────────────────────────────────────────────

def detect_image_type(subject, qnum, text, context, choices):
    combined = (text + ' ' + (context or '') + ' ' + ' '.join(choices or [])).lower()

    # CHEMISTRY
    if subject == 'chemistry':
        if 'potential energy' in combined or 'activation energy' in combined:
            return 'potential_energy_diagram'
        if 'heating curve' in combined or 'cooling curve' in combined:
            return 'heating_curve'
        if 'solubility' in combined and 'curve' in combined:
            return 'solubility_curve'
        return 'chemistry_table'

    # EARTH SCIENCE
    elif subject == 'earth-science':
        if 'topograph' in combined or 'contour' in combined or 'gradient' in combined:
            return 'topographic_map'
        if 'h-r diagram' in combined or 'luminosity' in combined or 'hertzsprung' in combined:
            return 'hr_diagram'
        if 'cross.section' in combined or 'rock layer' in combined or 'strat' in combined:
            return 'rock_cross_section'
        if 'weather' in combined and ('front' in combined or 'isobar' in combined or 'pressure' in combined):
            return 'weather_map'
        if 'rock cycle' in combined:
            return 'rock_cycle'
        if 'water cycle' in combined or 'hydrologic' in combined:
            return 'water_cycle'
        if 'heating curve' in combined or 'phase change' in combined:
            return 'heating_curve'
        if 'moon' in combined and ('phase' in combined or 'eclipse' in combined):
            return 'moon_phases'
        if 'wave' in combined and ('seismic' in combined or 'p-wave' in combined or 's-wave' in combined):
            return 'seismic_waves'
        if 'stream' in combined and ('velocity' in combined or 'particle' in combined or 'deposit' in combined):
            return 'stream_velocity'
        if 'climate' in combined and ('graph' in combined or 'temperature' in combined):
            return 'climate_graph'
        if 'velocity' in combined or 'speed' in combined:
            return 'motion_graph'
        return 'earth_science_diagram'

    # LIVING ENVIRONMENT
    elif subject == 'living-environment':
        if 'pedigree' in combined:
            return 'pedigree'
        if 'food web' in combined or 'food chain' in combined:
            return 'food_web'
        if 'energy pyramid' in combined or 'trophic level' in combined:
            return 'energy_pyramid'
        if 'enzyme' in combined and ('ph' in combined or 'temperature' in combined or 'activity' in combined):
            return 'enzyme_graph'
        if 'population' in combined and ('growth' in combined or 'logistic' in combined or 's-curve' in combined):
            return 'population_logistic'
        if ('predator' in combined and 'prey' in combined) or ('lynx' in combined and 'hare' in combined) or ('wolf' in combined and 'deer' in combined):
            return 'population_predator_prey'
        if 'cell' in combined and ('organelle' in combined or 'membrane' in combined or 'nucleus' in combined):
            if 'plant' in combined:
                return 'plant_cell'
            return 'animal_cell'
        if 'dna' in combined and ('double helix' in combined or 'strand' in combined or 'base pair' in combined):
            return 'dna_diagram'
        if 'carbon cycle' in combined:
            return 'carbon_cycle'
        if 'nitrogen cycle' in combined:
            return 'nitrogen_cycle'
        if 'succession' in combined:
            return 'ecological_succession'
        if 'water cycle' in combined or 'transpiration' in combined:
            return 'water_cycle'
        if 'graph' in combined and ('temperature' in combined or 'ph' in combined) and 'rate' in combined:
            return 'enzyme_graph'
        if 'graph' in combined and 'population' in combined:
            return 'population_logistic'
        if 'digestive' in combined or 'digest' in combined:
            return 'digestive_system'
        if 'photosynthesis' in combined and ('rate' in combined or 'light' in combined or 'graph' in combined):
            return 'photosynthesis_graph'
        if 'phylogen' in combined or 'cladogram' in combined or 'evolutionary tree' in combined:
            return 'phylogenetic_tree'
        if 'osmosis' in combined or 'diffusion' in combined:
            return 'osmosis_diagram'
        return 'le_diagram'

    # PHYSICS
    elif subject == 'physics':
        if 'wave' in combined and ('transverse' in combined or 'amplitude' in combined or 'wavelength' in combined):
            return 'wave_transverse'
        if 'circuit' in combined:
            return 'circuit_diagram'
        if 'force' in combined and ('diagram' in combined or 'body' in combined or 'vector' in combined):
            return 'force_diagram'
        if 'position' in combined and 'time' in combined and 'graph' in combined:
            return 'position_time'
        if 'velocity' in combined and 'time' in combined and 'graph' in combined:
            return 'velocity_time'
        if 'acceleration' in combined and 'graph' in combined:
            return 'velocity_time'
        return 'physics_diagram'

    # ALGEBRA 1/2
    elif subject in ('algebra-1', 'algebra-2'):
        # Check for data in text
        nums_in_text = re.findall(r'\d+\s*[,|]\s*\d+', text)
        if len(nums_in_text) >= 3 or 'table' in combined:
            return 'data_table_or_scatter'
        if 'scatter' in combined:
            return 'scatter_plot'
        if 'box' in combined and 'plot' in combined:
            return 'box_plot'
        if 'histogram' in combined:
            return 'histogram'
        if 'parabola' in combined or 'quadratic' in combined or 'axis of symmetry' in combined:
            return 'quadratic_graph'
        if 'linear' in combined or 'slope' in combined or 'y = mx' in combined:
            return 'linear_graph'
        if 'absolute value' in combined:
            return 'absolute_value_graph'
        if 'exponential' in combined:
            return 'exponential_graph'
        if 'number line' in combined or 'inequality' in combined:
            return 'number_line'
        if 'geometric' in combined and 'sequence' in combined:
            return 'sequence_diagram'
        if 'piecewise' in combined:
            return 'piecewise_graph'
        if 'trigon' in combined and subject == 'algebra-2':
            return 'trig_graph'
        if 'normal' in combined and 'distribution' in combined:
            return 'normal_distribution'
        if 'regression' in combined:
            return 'scatter_plot'
        if 'function' in combined and 'graph' in combined:
            return 'coordinate_grid'
        return 'coordinate_grid'

    # GEOMETRY
    elif subject == 'geometry':
        if 'triangle' in combined:
            return 'triangle'
        if 'circle' in combined and ('chord' in combined or 'arc' in combined or 'tangent' in combined or 'radius' in combined or 'diameter' in combined):
            return 'circle'
        if 'parallelogram' in combined or 'rectangle' in combined or 'trapezoid' in combined or 'rhombus' in combined:
            return 'quadrilateral'
        if 'pyramid' in combined or 'cone' in combined or 'prism' in combined or 'cylinder' in combined or 'sphere' in combined:
            return '3d_figure'
        if 'coordinate' in combined or 'origin' in combined or 'reflect' in combined or 'rotat' in combined or 'translat' in combined:
            return 'coordinate_geometry'
        if 'similar' in combined or 'proportion' in combined:
            return 'similar_figures'
        if 'angle' in combined:
            return 'angle_diagram'
        return 'geometry_diagram'

    return 'placeholder'

def generate_for_question(path, subject, qnum, text, context, choices):
    """Route to appropriate generator."""
    img_type = detect_image_type(subject, qnum, text, context, choices)

    try:
        if img_type == 'quadratic_graph':
            # Try to extract equation
            m = re.search(r'y\s*=\s*(-?\d*\.?\d*)\s*x\^?2\s*([+-]\s*\d+)?\s*x?\s*([+-]\s*\d+)?', text, re.I)
            if m:
                try:
                    a = float(m.group(1) or '1')
                    gen_quadratic(path, a=a)
                except: gen_quadratic(path)
            else:
                gen_quadratic(path)

        elif img_type == 'linear_graph':
            gen_linear(path)

        elif img_type == 'absolute_value_graph':
            m = re.search(r'\|x\s*([+-]\s*\d+)?\|', text)
            h = 0
            if m and m.group(1):
                h = -float(m.group(1).replace(' ', ''))
            gen_absolute_value(path, h=h)

        elif img_type == 'exponential_graph':
            decay = 'decay' in (text+context or '').lower() or 'decrease' in (text+context or '').lower()
            gen_exponential(path, decay=decay)

        elif img_type == 'coordinate_grid':
            gen_coordinate_grid(path)

        elif img_type in ('data_table_or_scatter', 'scatter_plot'):
            # Try to extract tabular data
            nums = extract_numbers(text)
            if len(nums) >= 6:
                mid = len(nums)//2
                x_data = nums[:mid]; y_data = nums[mid:]
                if len(x_data) == len(y_data):
                    gen_scatter_plot(path, x_data, y_data, regression=True)
                    return
            gen_scatter_plot(path, [1,2,3,4,5,6,7], [3,5,4,7,6,8,9],
                           xlabel='x', ylabel='y', regression=True)

        elif img_type == 'histogram':
            gen_histogram(path, [60,70,80,90,100], [3,7,12,6,2],
                         xlabel='Score', ylabel='Frequency', title='Score Distribution')

        elif img_type == 'box_plot':
            gen_box_plot(path, [[60,70,75,80,85,90,95], [55,65,72,80,88,92,98]],
                        labels=['Group A','Group B'], ylabel='Score')

        elif img_type == 'number_line':
            gen_number_line(path, -5, 10)

        elif img_type == 'piecewise_graph':
            pieces = [
                (lambda x: -x + 2, -4, 0, False, True),
                (lambda x: x**2, 0, 3, True, False),
            ]
            gen_piecewise(path, pieces)

        elif img_type == 'trig_graph':
            fig, ax = plt.subplots(figsize=(8, 4))
            x = np.linspace(-2*np.pi, 2*np.pi, 500)
            ax.plot(x, np.sin(x), 'b-', lw=2, label='y = sin(x)')
            ax.plot(x, np.cos(x), 'r--', lw=2, label='y = cos(x)')
            ax.axhline(0, color='black', lw=0.8)
            ax.set_xticks([-2*np.pi, -np.pi, 0, np.pi, 2*np.pi])
            ax.set_xticklabels(['-2π', '-π', '0', 'π', '2π'])
            ax.legend(fontsize=10); ax.grid(True, alpha=0.3)
            ax.set_xlabel('x'); ax.set_ylabel('y')
            save_fig(path, fig)

        elif img_type == 'normal_distribution':
            fig, ax = plt.subplots(figsize=(7, 5))
            x = np.linspace(-4, 4, 300)
            y = (1/(np.sqrt(2*np.pi))) * np.exp(-0.5*x**2)
            ax.plot(x, y, 'b-', lw=2.5)
            ax.fill_between(x, y, alpha=0.2, color='blue')
            ax.axvline(0, color='red', lw=1.5, linestyle='--')
            ax.set_xlabel('Standard Deviations from Mean'); ax.set_ylabel('Frequency')
            ax.set_title('Normal Distribution'); ax.grid(True, alpha=0.3)
            save_fig(path, fig)

        elif img_type == 'triangle':
            gen_triangle(path, points=[(0,0),(6,0),(2.5,4)],
                        labels=['A','B','C'], right_angle=None)

        elif img_type == 'circle':
            gen_circle(path, chord=True)

        elif img_type == 'quadrilateral':
            if 'parallelogram' in text.lower():
                pts = [(1,1),(6,1),(7,4),(2,4)]
            elif 'trapezoid' in text.lower():
                pts = [(1,1),(7,1),(6,4),(2,4)]
            else:
                pts = [(1,1),(7,1),(7,5),(1,5)]
            gen_quadrilateral(path, pts, labels=['A','B','C','D'])

        elif img_type == '3d_figure':
            shape = 'pyramid'
            if 'cylinder' in text.lower(): shape = 'cylinder'
            elif 'prism' in text.lower(): shape = 'prism'
            # Simple 2D representation for 3d figures
            fig, ax = plt.subplots(figsize=(6, 5.5))
            ax.set_xlim(0, 10); ax.set_ylim(0, 10); ax.axis('off')
            if shape == 'pyramid':
                pts = [(5, 9), (1, 2), (9, 2), (5, 9)]
                ax.plot([p[0] for p in pts], [p[1] for p in pts], 'k-', lw=2)
                ax.plot([1, 9], [2, 2], 'k-', lw=2)
                ax.plot([5, 5], [5.5, 2], 'k--', lw=1.5)
                ax.text(5, 9.5, 'Apex', ha='center', fontsize=10)
                ax.text(5, 1.2, 'Base', ha='center', fontsize=10)
            ax.set_title(f'{shape.title()} - 3D Figure', fontsize=12)
            save_fig(path, fig)

        elif img_type == 'coordinate_geometry':
            gen_coordinate_grid(path)

        elif img_type == 'similar_figures':
            gen_triangle(path, points=[(0,0),(4,0),(0,3)], labels=['A','B','C'],
                        side_labels=['4', '5', '3'])

        elif img_type == 'angle_diagram':
            fig, ax = plt.subplots(figsize=(6, 5))
            ax.set_xlim(-1, 7); ax.set_ylim(-1, 5); ax.axis('off')
            ax.plot([0, 6], [0, 0], 'k-', lw=2)
            ax.plot([0, 4], [0, 3], 'k-', lw=2)
            arc = Arc((0, 0), 1.5, 1.5, angle=0, theta1=0, theta2=36.87, color='red', lw=2)
            ax.add_patch(arc)
            ax.text(1.2, 0.3, 'θ', color='red', fontsize=14)
            save_fig(path, fig)

        elif img_type == 'geometry_diagram':
            gen_coordinate_grid(path)

        elif img_type == 'potential_energy_diagram':
            exo = 'exothermic' in text.lower() or 'release' in text.lower()
            gen_potential_energy_diagram(path, exothermic=not ('endothermic' in text.lower()))

        elif img_type == 'heating_curve':
            gen_heating_curve(path)

        elif img_type == 'solubility_curve':
            gen_solubility_curve(path)

        elif img_type == 'chemistry_table':
            gen_data_table(path, ['Element', 'Symbol', 'Atomic #', 'Mass'],
                          [['Hydrogen','H','1','1.0'],['Carbon','C','6','12.0'],
                           ['Oxygen','O','8','16.0'],['Nitrogen','N','7','14.0'],
                           ['Sodium','Na','11','23.0']], title='Selected Element Properties')

        elif img_type == 'topographic_map':
            gen_topographic_map(path)

        elif img_type == 'hr_diagram':
            gen_hr_diagram(path)

        elif img_type == 'rock_cross_section':
            gen_rock_cross_section(path)

        elif img_type == 'weather_map':
            gen_weather_map(path)

        elif img_type == 'rock_cycle':
            gen_rock_cycle(path)

        elif img_type == 'water_cycle':
            gen_water_cycle(path)

        elif img_type == 'moon_phases':
            fig, ax = plt.subplots(figsize=(8, 3))
            ax.set_xlim(0, 10); ax.set_ylim(0, 4); ax.axis('off')
            phases = [('New', 1, 'black'), ('Crescent', 2.2, '#888'),
                     ('Quarter', 3.5, 'white'), ('Gibbous', 4.8, 'white'),
                     ('Full', 6.2, 'yellow'), ('Gibbous', 7.5, 'white'),
                     ('Quarter', 8.7, 'white')]
            for name, x, color in phases:
                moon = mpatches.Circle((x, 2), 0.5, facecolor=color,
                                      edgecolor='black', lw=1.5)
                ax.add_patch(moon)
                ax.text(x, 1.2, name, ha='center', fontsize=8)
            ax.text(5, 3.5, 'Moon Phases (viewed from Northern Hemisphere)',
                   ha='center', fontsize=11, fontweight='bold')
            save_fig(path, fig)

        elif img_type == 'seismic_waves':
            fig, ax = plt.subplots(figsize=(8, 5))
            t = np.linspace(0, 20, 500)
            p_wave = 0.5 * np.sin(3*t) * np.exp(-0.05*t)
            s_wave = np.zeros_like(t)
            s_wave[t>5] = 0.8 * np.sin(2*(t[t>5]-5)) * np.exp(-0.05*(t[t>5]-5))
            ax.plot(t, p_wave + 2, 'b-', lw=2, label='P-wave (Primary)')
            ax.plot(t, s_wave, 'r-', lw=2, label='S-wave (Secondary)')
            ax.axvline(5, color='gray', lw=1.5, linestyle='--', alpha=0.7)
            ax.text(5.2, 2.8, 'S-wave\narrival', fontsize=9, color='red')
            ax.set_xlabel('Time (minutes)'); ax.set_ylabel('Ground Motion')
            ax.set_title('Seismogram — P and S Wave Arrivals', fontsize=12)
            ax.legend(fontsize=10); ax.grid(True, alpha=0.3)
            save_fig(path, fig)

        elif img_type == 'stream_velocity':
            fig, ax = plt.subplots(figsize=(7, 5))
            sizes = ['Clay', 'Silt', 'Sand', 'Pebble', 'Cobble', 'Boulder']
            velocity = [0.01, 0.05, 0.3, 1.0, 2.5, 6.0]
            ax.bar(sizes, velocity, color='steelblue', edgecolor='black')
            ax.set_xlabel('Particle Size'); ax.set_ylabel('Stream Velocity Needed to Transport (m/s)')
            ax.set_title('Stream Velocity vs. Particle Size', fontsize=12)
            ax.grid(True, axis='y', alpha=0.3)
            save_fig(path, fig)

        elif img_type == 'climate_graph':
            fig, ax1 = plt.subplots(figsize=(7, 5))
            months = ['J','F','M','A','M','J','J','A','S','O','N','D']
            temp = [-5,0,8,15,20,25,27,26,20,12,3,-3]
            precip = [50,45,60,70,80,90,100,95,75,65,55,50]
            ax2 = ax1.twinx()
            ax1.plot(months, temp, 'r-o', lw=2, label='Temp (°C)')
            ax2.bar(months, precip, color='steelblue', alpha=0.4, label='Precip (mm)')
            ax1.set_ylabel('Temperature (°C)', color='red')
            ax2.set_ylabel('Precipitation (mm)', color='blue')
            ax1.set_title('Climograph — Humid Continental Climate', fontsize=12)
            save_fig(path, fig)

        elif img_type == 'earth_science_diagram':
            gen_placeholder(path, qnum, subject, text, context)

        elif img_type == 'pedigree':
            affected = []
            if 'affected' in text.lower():
                nums = re.findall(r'\d+', text)
                affected = [int(n) for n in nums[:3]] if nums else [7]
            gen_pedigree(path, affected=affected or [7])

        elif img_type == 'food_web':
            gen_food_web(path)

        elif img_type == 'energy_pyramid':
            gen_energy_pyramid(path)

        elif img_type == 'enzyme_graph':
            if 'ph' in (text+context or '').lower():
                gen_enzyme_graph(path, x_axis='pH', optimal=7)
            else:
                gen_enzyme_graph(path, x_axis='temperature', optimal=37)

        elif img_type == 'population_logistic':
            gen_population_graph(path, 'logistic')

        elif img_type == 'population_predator_prey':
            gen_population_graph(path, 'predator_prey')

        elif img_type in ('animal_cell', 'plant_cell'):
            cell = 'plant' if 'plant' in img_type else 'animal'
            gen_cell_diagram(path, cell_type=cell)

        elif img_type == 'dna_diagram':
            gen_dna_diagram(path)

        elif img_type == 'carbon_cycle':
            gen_carbon_cycle(path)

        elif img_type == 'nitrogen_cycle':
            gen_nitrogen_cycle(path)

        elif img_type == 'ecological_succession':
            gen_ecological_succession(path)

        elif img_type == 'photosynthesis_graph':
            fig, ax = plt.subplots(figsize=(7, 5))
            light = np.linspace(0, 100, 200)
            rate = 10 * (1 - np.exp(-0.04*light))
            ax.plot(light, rate, 'g-', lw=2.5)
            ax.set_xlabel('Light Intensity (μmol/m²/s)')
            ax.set_ylabel('Rate of Photosynthesis (O₂ produced)')
            ax.set_title('Effect of Light Intensity on Photosynthesis Rate', fontsize=11)
            ax.grid(True, alpha=0.3)
            save_fig(path, fig)

        elif img_type == 'phylogenetic_tree':
            fig, ax = plt.subplots(figsize=(7, 5))
            ax.set_xlim(0, 10); ax.set_ylim(0, 10); ax.axis('off')
            # Simple cladogram
            species = ['Bacteria', 'Fungi', 'Plants', 'Invertebrates', 'Vertebrates']
            x_pos = [1, 3, 5, 7, 9]
            y_tip = 8
            # Branch points
            nodes = [(5, 2), (5, 4), (6, 5), (7, 6)]
            # Trunk
            ax.plot([5, 5], [1, 2], 'k-', lw=2)
            # Branches
            for x, sp in zip(x_pos, species):
                ax.plot([x, x], [y_tip-1, y_tip+0.3], 'k-', lw=2)
                ax.text(x, y_tip+0.5, sp, ha='center', fontsize=8.5, rotation=35)
            ax.plot([1, 9], [y_tip-1, y_tip-1], 'k-', lw=2)
            ax.set_title('Simplified Phylogenetic Tree', fontsize=12)
            save_fig(path, fig)

        elif img_type == 'osmosis_diagram':
            fig, ax = plt.subplots(figsize=(7, 5))
            ax.set_xlim(0, 10); ax.set_ylim(0, 8); ax.axis('off')
            # Three beakers
            for bx, label, fill_h in [(1.5,'Hypotonic',3.5),(5,'Isotonic',2.5),(8.5,'Hypertonic',1.5)]:
                # Beaker
                ax.plot([bx-1,bx-1,bx+1,bx+1],[4.5,1.5,1.5,4.5],'k-',lw=2)
                # Solution level
                ax.fill_between([bx-1,bx+1],[1.5,1.5],[1.5+fill_h,1.5+fill_h],
                               color='lightblue',alpha=0.5)
                # Cell
                cell = mpatches.Ellipse((bx, 1.5+fill_h*0.5+0.2), 1.2, 0.8,
                                       facecolor='#FFF9C4', edgecolor='black', lw=1.5)
                ax.add_patch(cell)
                ax.text(bx, 0.8, label, ha='center', fontsize=10, fontweight='bold')
            ax.set_title('Osmosis in Different Solutions', fontsize=12)
            save_fig(path, fig)

        elif img_type == 'digestive_system':
            fig, ax = plt.subplots(figsize=(5, 7))
            ax.set_xlim(0, 8); ax.set_ylim(0, 14); ax.axis('off')
            parts = [
                ('Mouth', (4, 12.5), '#FFB74D'),
                ('Esophagus', (4, 11), '#FF8A65'),
                ('Stomach', (3.5, 9), '#F48FB1'),
                ('Small Intestine', (4, 6.5), '#CE93D8'),
                ('Large Intestine', (5, 4), '#90CAF9'),
                ('Rectum', (4, 2), '#A5D6A7'),
            ]
            for name, (x, y), color in parts:
                b = FancyBboxPatch((x-1.2, y-0.5), 2.4, 1.0, boxstyle='round,pad=0.1',
                                  facecolor=color, edgecolor='black', linewidth=1.5)
                ax.add_patch(b)
                ax.text(x, y, name, ha='center', va='center', fontsize=9, fontweight='bold')
            # Connect with arrows
            for i in range(len(parts)-1):
                x1, y1 = parts[i][1]; x2, y2 = parts[i+1][1]
                ax.annotate('', xy=(x2,y2+0.5), xytext=(x1,y1-0.5),
                           arrowprops=dict(arrowstyle='->', color='gray', lw=1.5))
            ax.set_title('Human Digestive System', fontsize=12)
            save_fig(path, fig)

        elif img_type == 'le_diagram':
            gen_placeholder(path, qnum, subject, text, context)

        elif img_type == 'wave_transverse':
            gen_wave_diagram(path, 'transverse')

        elif img_type == 'circuit_diagram':
            gen_circuit_diagram(path)

        elif img_type == 'force_diagram':
            gen_force_diagram(path)

        elif img_type in ('position_time', 'velocity_time', 'motion_graph'):
            gt = 'position_time' if 'position' in img_type else 'velocity_time'
            gen_motion_graph(path, gt)

        elif img_type == 'physics_diagram':
            gen_placeholder(path, qnum, subject, text, context)

        elif img_type == 'sequence_diagram':
            gen_coordinate_grid(path)

        else:
            gen_placeholder(path, qnum, subject, text, context)

    except Exception as e:
        print(f"  ERROR generating {path}: {e}")
        try:
            gen_placeholder(path, qnum, subject, text, context)
        except: pass

# ─── Parse Exam Files ─────────────────────────────────────────────────────────

def parse_exam_file(fpath):
    """Extract questions from exam JS file."""
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    questions = []
    # Find each question object by number
    pattern = r'\{\s*number:\s*(\d+),\s*part:\s*\'([^\']+)\'.*?(?=\{\s*number:|]\s*\})'
    for m in re.finditer(r'\{\s*number:\s*(\d+)[^}]+image:\s*\'([^\']+)\'', content, re.DOTALL):
        qnum = int(m.group(1))
        img_path = m.group(2)
        # Extract text for this question
        start = m.start()
        chunk = content[start:start+2000]
        text_m = re.search(r'text:\s*[\'"`](.*?)[\'"`](?:,|$)', chunk, re.DOTALL)
        ctx_m = re.search(r'context:\s*[\'"`](.*?)[\'"`](?:,|$)', chunk, re.DOTALL)
        choices_m = re.findall(r'[\'"`](.*?)[\'"`]', chunk[chunk.find('choices:'):chunk.find('choices:')+500] if 'choices:' in chunk else '')
        text = text_m.group(1) if text_m else ''
        context = ctx_m.group(1) if ctx_m else ''
        questions.append((qnum, img_path, text, context, choices_m[:4]))
    return questions

# ─── Main ─────────────────────────────────────────────────────────────────────

def main():
    total = 0; generated = 0; skipped = 0
    subjects = sorted(os.listdir(EXAM_DIR))

    for subject in subjects:
        subj_dir = os.path.join(EXAM_DIR, subject)
        if not os.path.isdir(subj_dir): continue
        print(f"\n=== {subject.upper()} ===")

        for fname in sorted(os.listdir(subj_dir)):
            if not fname.endswith('.js') or fname == 'index.js': continue
            fpath = os.path.join(subj_dir, fname)

            try:
                questions = parse_exam_file(fpath)
            except Exception as e:
                print(f"  Parse error {fname}: {e}")
                continue

            for qnum, img_path, text, context, choices in questions:
                total += 1
                # Convert /images/exams/folder/file.png to disk path
                disk_path = PUBLIC_DIR + img_path.replace('/images/exams', '')

                if os.path.exists(disk_path):
                    skipped += 1
                    continue

                print(f"  Generating q{qnum} → {os.path.basename(disk_path)}")
                generate_for_question(disk_path, subject, qnum, text, context, choices)
                generated += 1

    print(f"\n{'='*50}")
    print(f"Total image references: {total}")
    print(f"Already existed (skipped): {skipped}")
    print(f"Generated: {generated}")
    print(f"Done!")

if __name__ == '__main__':
    main()
