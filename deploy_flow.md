1. 在 truechain-offical 项目中打开终端
2. 执行 npm run build
3. 把打包出来的 dist 文件通过 scp 上传到服务器
4. 更改老官网里面的静态文件和新官网的文件保持同步
5. 更改nginx中的配置文件, 参考如下

```
user  nginx;
worker_processes  1;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;


events {
    worker_connections  1024;
}


http {

    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  120;

    #gzip  on;

    server {
        listen       80 default_server;
        server_name  "";
        return       444;
    }



    server {
        listen       80;
        server_name  lijian.buditem.com;
        charset        utf-8;
        root        /var/app/nginx/buditem;
        index       index.html index.htm;

        location / {
            root        /var/app/nginx/buditem;
            index       index.html index.htm;
        }

        location ~* ^.+.(jpg|jpeg|gif|css|png|js|ico)$ {
            access_log        off;
            expires           30d;
        }

        #打开部分目录列表浏览
        location   /res {
            autoindex on;
            autoindex_exact_size off;
            autoindex_localtime on;
        }
    }

    server {
        listen       80;
        listen       443 ssl;
        server_name  api.buditem.com;

        ssl on;
        ssl_certificate   /var/app/nginx/ssl/214594989770172.pem;
        ssl_certificate_key  /var/app/nginx/ssl/214594989770172.key;
        ssl_session_timeout 5m;
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        ssl_prefer_server_ciphers on;

        charset        utf-8;
        client_body_timeout 300s;
        client_max_body_size 500m;
        location / {
               proxy_pass   http://nodeserver;
               index  index.html index.htm;
        }
        location /api {
            proxy_pass http://39.105.125.189:7001;
        }
        location /api2 {
            proxy_pass http://39.105.125.189:8001;
        }
    }


    upstream nodeserver {
        server 39.105.125.189:7688;
    }

    #include /etc/nginx/conf.d/*.conf;
}

```