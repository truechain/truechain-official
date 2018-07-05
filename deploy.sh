# ! /bin/bash

git reset --hard origin/master
git clean -f
git pull origin master
cnpm install
npm run build
pm2 restart my-nuxt
