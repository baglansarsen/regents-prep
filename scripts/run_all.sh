#!/bin/bash
# Master script to crawl and parse all NYS Regents exams

PROJECT_ROOT="/Users/baglansarsen/regents-prep"
PYTHON_BIN="$PROJECT_ROOT/.venv/bin/python3"

echo "=== STARTING NYS REGENTS DOWNLOAD AND PARSE PIPELINE ==="
date

# 1. Run Crawler to download all PDFs
echo "--> Step 1: Crawling and downloading all subject PDFs..."
$PYTHON_BIN "$PROJECT_ROOT/scripts/regents_crawler.py"

# 2. Run Parser to extract questions and crop diagrams
echo "--> Step 2: Parsing questions and cropping diagrams..."
$PYTHON_BIN "$PROJECT_ROOT/scripts/regents_parser.py"

echo "=== PIPELINE COMPLETED SUCCESSFULLY ==="
date
