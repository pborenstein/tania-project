#! /usr/bin/env bash

source="$HOME/projects/minimal-11ty/"
dest="$1"

echo source $source
echo dest $dest

rsync -av --exclude=".git/" \
          --exclude=".*" \
          --exclude="dist/" \
          --exclude="node_modules/" \
          --exclude="README.md" \
          --exclude="src/posts" \
          --exclude="src/data/config.json" \
      $source \
      $dest
