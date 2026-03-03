# KN04: Docker Compose

## A) Docker Compose: Lokal (60%)

### Teil a) Verwendung von Original Images

In KN02 mussten für die beiden Container zwei Images gestartet werden. Mit Docker Compose lassen sich beide Images gleichzeitig starten.

#### Bedingungen:

- **Datenbank**:
  - Image: `mariadb:latest`
  - Konfiguration direkt in Docker Compose, kein Dockerfile
  - Containername: `m347-kn04a-db`
  - Umgebungsvariablen:
    ```yaml
    MYSQL_ROOT_PASSWORD: rootpass
    MYSQL_DATABASE: mydb
    MYSQL_USER: user
    MYSQL_PASSWORD: userpass
    ```
- **Webserver**:
  - Dockerfile aus KN02 verwenden
  - Containername: `m347-kn04a-web`
- **Netzwerk**:
    ```yaml
    subnet: 172.10.0.0/16
    ip_range: 172.10.5.0/24
    gateway: 172.10.5.254
    ```

#### Docker Compose Datei (Teil a):

```yaml
version: '3.8'

services:
  db:
    image: mariadb:latest
    container_name: m347-kn04a-db
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: rootpass
      MYSQL_DATABASE: mydb
      MYSQL_USER: user
      MYSQL_PASSWORD: userpass
    networks:
      m347net:
        ipv4_address: 172.20.5.10

  web:
    image: honorednerd/347_kn04-web:latest
    container_name: m347-kn04a-web
    ports:
      - "8080:80"
    depends_on:
      - db
    networks:
      m347net:
        ipv4_address: 172.20.5.20

networks:
  m347net:
    driver: bridge
    ipam:
      config:
        - subnet: 172.20.0.0/16
          ip_range: 172.20.5.0/24
          gateway: 172.20.5.254
```

docker compose up

docker compose up führt folgende Schritte aus:

- Images bauen (bei Build) oder ziehen (bei Image)
- Netzwerk erstellen, falls noch nicht vorhanden
- Container starten in Abhängigkeit (depends_on)
- Logs anzeigen (wenn ohne -d)
- Optional: Container im Hintergrund starten (-d)

![db.php](TeilA\db.php-a.png)
![db.php](TeilA\info.php-a.png)

## Teil b) Verwendung eigener Images

- Eigene Images aus KN02 verwenden, Dockerfile entfällt

- IP-Range ändern (z.B. 172.20.0.0/16)

- Container starten via docker compose up -d

Beispiel Docker Compose Datei (Teil b):

```yaml
version: '3.8'

services:
  db:
    image: mariadb:latest
    container_name: m347-kn04a-db
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: rootpass
      MYSQL_DATABASE: mydb
      MYSQL_USER: user
      MYSQL_PASSWORD: userpass
    networks:
      m347net:
        ipv4_address: 172.20.5.10

  web:
    image: honorednerd/347_kn04-web:latest
    container_name: m347-kn04a-web
    ports:
      - "8080:80"
    depends_on:
      - db
    networks:
      m347net:
        ipv4_address: 172.20.5.20

networks:
  m347net:
    driver: bridge
    ipam:
      config:
        - subnet: 172.20.0.0/16
          ip_range: 172.20.5.0/24
          gateway: 172.20.5.254
```

Erklärung Fehler db.php

- Fehler tritt auf, wenn Webserver Container nicht korrekt mit DB kommuniziert

- Lösung: Docker Compose Netzwerk korrekt verbinden oder Hostname db in PHP-Skript verwenden

![db.php](TeilB\info.php-b.png)
![db.php](TeilB\db.php-b.png)

## B) Docker Compose: Cloud (40%)

1. Cloud-VM via Cloud-Init vorbereiten

2. Docker & Docker Compose installieren

3. Docker Compose YAML erstellen

4. Container starten (docker compose up -d)

5. Sicherheitsgruppe prüfen (Port 22 & 80 offen)

6. SSH Verbindung testen:
ssh -i ~/.ssh/id_rsa ubuntu@Public-IP

7. Logs prüfen: /var/log/cloud-init-output.log

```
users:
  - name: ubuntu
    sudo: ALL=(ALL) NOPASSWD:ALL
    groups: users, admin, docker
    home: /home/ubuntu
    shell: /bin/bash
    ssh_authorized_keys:
      - ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCUBo+qnNu5xx... teacher
      - ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCDEIN-DEIN... moreno@pc
ssh_pwauth: false
disable_root: false
package_update: true
package_upgrade: true
groups:
  - docker
packages:
  - apt-transport-https
  - ca-certificates
  - curl
  - gnupg
  - lsb-release
  - unattended-upgrades
final_message: "Cloud-Init: Docker Compose Installation erfolgreich abgeschlossen."
write_files:
  - path: /home/ubuntu/docker-compose.yml
    content: |
      version: '3.8'
      services:
        db:
          image: mariadb:latest
          container_name: m347-cloud-db
          restart: always
          environment:
            MYSQL_ROOT_PASSWORD: rootpass
            MYSQL_DATABASE: mydb
            MYSQL_USER: user
            MYSQL_PASSWORD: userpass
        web:
          image: honorednerd/347_kn04-web:latest
          container_name: m347-cloud-web
          ports:
            - "80:80"
          depends_on:
            - db
runcmd:
  - mkdir -p /etc/apt/keyrings
  - curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
  - echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
  - apt-get update
  - apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
  - systemctl enable docker
  - systemctl start docker
  - cd /home/ubuntu
  - docker compose up -d
  ```

  ![db.php](Teil2\db.php.png)
  ![db.php](Teil2\info.php.png)