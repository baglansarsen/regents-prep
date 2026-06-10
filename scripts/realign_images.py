#!/usr/bin/env python3
"""
realign_images.py — cue-gated realignment of question image refs to the PNGs
that are actually deployed under public/images/exams/.

Why: across most subjects, content `image:` refs point at qN.png files that
don't exist (→ the mobile-web SPA returns index.html, so ExamImage shows
nothing), while many extracted crops sit deployed but unreferenced. This script
re-points refs at existing assets, gated on a visual text-cue so we don't attach
a (multi-question page-strip) crop to a text-only question, and removes refs
whose file is missing.

It does NOT download PDFs, re-crop, or deploy — it only rewrites content JS,
using the crops already present in public/images/exams/. Run with no args for a
dry-run summary; pass --apply to write. Edits both the mobile and shared copies.

Question objects may be single-line or multi-line, so we operate on the span
between each `number:` anchor and the next — format-agnostic.
"""
import os, re, sys, glob

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ASSET_ROOT = os.path.join(REPO, 'public', 'images', 'exams')

# Subjects with broken refs / orphans (LS already fixed separately; humanities clean).
PREFIX = {
    'living-environment': 'le', 'earth-science': 'es', 'algebra-1': 'alg1',
    'physics': 'phys', 'geometry': 'geo', 'algebra-2': 'alg2', 'chemistry': 'chem',
}
CONTENT_ROOTS = [
    os.path.join(REPO, 'mobile', 'src', 'content', 'regents-exams'),
    os.path.join(REPO, 'shared', 'content', 'regents-exams'),
]

# Same visual cue used by scripts/extract-exam-images.py, plus a few common phrasings.
VISUAL_RE = re.compile(
    r'(A (graph|chart|diagram|table|map|data table|bar graph|line graph|photograph|cross section|block diagram|contour map|seismogram|station model)'
    r'|The (graph|chart|diagram|table|map|model|data table)'
    r'|Based on the (graph|chart|diagram|table|data|map|information|model)'
    r'|Which (graph|chart|diagram)'
    r'|(diagram|graph|table|chart|map|model|figure|picture|photograph) below'
    r'|(shown|represented|illustrated) (below|in the (diagram|graph|table|model)))',
    re.IGNORECASE,
)

NUMBER_RE = re.compile(r'number:\s*(\d+)')
TEXT_RE   = re.compile(r"text:\s*'((?:\\.|[^'])*)'|text:\s*`([^`]*)`", re.DOTALL)
IMAGE_RE  = re.compile(r"\s*image:\s*'[^']*'\s*,?")
IMAGE_PATH_RE = re.compile(r"(image:\s*')([^']*)(')")
CTX_RE    = re.compile(r'context_(\d+)_(\d+)\.png$')


def folder_assets(folder):
    """Return (set_of_q_numbers, list_of_(lo,hi,filename)) for a deployed folder."""
    d = os.path.join(ASSET_ROOT, folder)
    if not os.path.isdir(d):
        return None
    qs, ctx = set(), []
    for f in os.listdir(d):
        qm = re.fullmatch(r'q(\d+)\.png', f)
        if qm:
            qs.add(int(qm.group(1)))
            continue
        cm = CTX_RE.search(f)
        if cm:
            ctx.append((int(cm.group(1)), int(cm.group(2)), f))
    return qs, ctx


def derive_folder(content, subject, basename):
    """Folder name from an existing ref, else <prefix>-<basename> (e.g. le-january-2018)."""
    m = re.search(r"image:\s*'/images/exams/([^/]+)/", content)
    if m:
        return m.group(1)
    return f'{PREFIX[subject]}-{basename}'


def target_for(num, qs, ctx):
    """qN.png if present, else the context_X_Y covering N, else None."""
    if num in qs:
        return f'q{num}.png'
    for lo, hi, fname in ctx:
        if lo <= num <= hi:
            return fname
    return None


def process_file(path, subject, apply):
    basename = os.path.splitext(os.path.basename(path))[0]
    content  = open(path, encoding='utf-8').read()
    folder   = derive_folder(content, subject, basename)
    assets   = folder_assets(folder)
    folder_missing = assets is None
    # A missing folder means none of this exam's images were ever extracted/
    # deployed — so every ref is broken. Treat assets as empty: no adds, and all
    # existing (broken) refs get removed so there are zero dangling refs.
    qs, ctx = (set(), []) if folder_missing else assets

    anchors = [(m.start(), int(m.group(1))) for m in NUMBER_RE.finditer(content)]
    spans = []
    for i, (pos, num) in enumerate(anchors):
        end = anchors[i + 1][0] if i + 1 < len(anchors) else len(content)
        spans.append((pos, end, num))

    added = repointed = removed = 0
    examples = []
    # Edit from last to first so earlier offsets stay valid.
    for start, end, num in reversed(spans):
        seg = content[start:end]
        tm = TEXT_RE.search(seg)
        text = (tm.group(1) or tm.group(2) or '') if tm else ''
        has_img = IMAGE_RE.search(seg)
        wants = bool(has_img) or bool(VISUAL_RE.search(text))
        tgt = target_for(num, qs, ctx)
        desired = f'/images/exams/{folder}/{tgt}' if tgt else None

        new_seg = seg
        if desired and wants:
            if has_img:
                cur = IMAGE_PATH_RE.search(seg)
                if cur and cur.group(2) != desired:
                    new_seg = IMAGE_PATH_RE.sub(lambda m: m.group(1) + desired + m.group(3), seg, count=1)
                    repointed += 1
                    if len(examples) < 4: examples.append(f'repoint q{num} -> {tgt}')
            else:
                new_seg = re.sub(r'(number:\s*\d+,?)', r"\1 image: '" + desired + "',", seg, count=1)
                added += 1
                if len(examples) < 4: examples.append(f'add q{num} -> {tgt}')
        elif has_img and not desired:
            new_seg = IMAGE_RE.sub('', seg, count=1)
            # tidy any resulting ", }" or doubled spaces
            new_seg = re.sub(r',\s*}', ' }', new_seg, count=1) if new_seg.rstrip().endswith('}') else new_seg
            removed += 1
            if len(examples) < 4: examples.append(f'remove q{num} (no file)')

        if new_seg != seg:
            content = content[:start] + new_seg + content[end:]

    if apply and (added or repointed or removed):
        open(path, 'w', encoding='utf-8').write(content)

    return {'file': path, 'folder': folder, 'added': added,
            'repointed': repointed, 'removed': removed, 'examples': examples,
            'folder_missing': folder_missing}


def main():
    apply = '--apply' in sys.argv
    only = [a for a in sys.argv[1:] if not a.startswith('-')]  # optional subject filter
    print(('APPLY' if apply else 'DRY-RUN') + ' — realign image refs to deployed assets\n')
    tot = {'added': 0, 'repointed': 0, 'removed': 0}
    missing_folders = []
    for subject in PREFIX:
        if only and subject not in only:
            continue
        subtot = {'added': 0, 'repointed': 0, 'removed': 0}
        for root in CONTENT_ROOTS:
            for path in sorted(glob.glob(os.path.join(root, subject, '*.js'))):
                r = process_file(path, subject, apply)
                if r['folder_missing']:
                    missing_folders.append((path, r['folder']))
                for k in subtot:
                    subtot[k] += r[k]; tot[k] += r[k]
                if r['added'] or r['repointed'] or r['removed']:
                    tag = 'mobile' if '/mobile/' in path else 'shared'
                    note = '  [folder missing → refs removed]' if r['folder_missing'] else ''
                    print(f"  [{tag}] {subject}/{os.path.basename(path)}: "
                          f"+{r['added']} add  ~{r['repointed']} repoint  -{r['removed']} remove{note}"
                          + (f"   e.g. {', '.join(r['examples'])}" if r['examples'] else ''))
        print(f"  == {subject}: +{subtot['added']} add  ~{subtot['repointed']} repoint  -{subtot['removed']} remove ==\n")
    print(f"TOTAL: +{tot['added']} added  ~{tot['repointed']} repointed  -{tot['removed']} removed")
    if missing_folders:
        print('\nFOLDER NOT FOUND (skipped):')
        for p, f in missing_folders:
            print(f'  {f}  <-  {os.path.relpath(p, REPO)}')
    if not apply:
        print('\n(dry-run — no files written; re-run with --apply)')


if __name__ == '__main__':
    main()
