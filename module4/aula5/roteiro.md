**Instalar xk6**

```bash
docker run --rm -e GOOS=darwin -u "$(id -u):$(id -g)" -v "${PWD}:/xk6" \
  grafana/xk6 build \
  --with github.com/distribworks/xk6-ethereum
```
