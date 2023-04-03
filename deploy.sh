#!/usr/bin/env bash
rm -rf dist
npm run build -- --base=/react-shany-1-preview/
cd dist
git init
git add .
git commit -m deploy
git remote add origin git@github.com:DownGrowth/react-shany-1-preview.git
git branch -M master
git push -f origin master:master
echo "======================部署成功========================="
cd -