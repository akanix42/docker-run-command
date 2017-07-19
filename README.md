This image runs a small node server that can execute any scripts on the specified server's directory via SSH.

Example request:
``` bash
curl http://localhost:3000/run/test?test_var=123
```

This is equivalent to running the following bash command (from the scripts directory):
``` bash
test_var=123 ./test
```

Environment Variables:
SSH_HOST: name or ip of host
SSH_USERNAME: username to access host
SSH_PASSWORD: password to access host
SCRIPT_DIR: directory path containing the script files.

Basic docker-compose.yml:

``` yaml
version: '3'
services:
  run-command:
    image: nathantreid/run-command
    environment:
      SSH_HOST: 192.168.1.1
      SSH_USERNAME: myUser
      SSH_PASSWORD: password123
      SCRIPT_DIR: /scripts
    restart: always
    ports:
      - "3000:3000"
```

Sample docker-compose.yml for use with [Traefik](https://traefik.io/):

``` yaml
version: '3'
networks:
  web:
    external: true
services:
  run-command:
    image: nathantreid/run-command
    labels:
      - "traefik.backend=my-backend"
      - "traefik.frontend.rule=Host:api.mydomain.com;PathPrefix:/run/"
      - "traefik.port=3000"
      - "traefik.enable=true"
      - "traefik.docker.network=web"
      - "traefik.frontend.auth.basic=aUsername:$$2y$$05$$BtgBJv5cbUcuBoakDm7OXeU0cA8sriiduBqor2tD8EzVS2DvVWvCm"
    environment:
      SSH_HOST: 192.168.1.1
      SSH_USERNAME: myUser
      SSH_PASSWORD: password123
      SCRIPT_DIR: /scripts
    restart: always
    networks:
      - web
```
