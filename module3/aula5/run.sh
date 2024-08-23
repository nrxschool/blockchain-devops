# run Blockchain Network
docker-compose -f docker-compose.nodes.yml up -d
# run  BlockExplorer and Observability
docker-compose -f docker-compose.blockexplorer.yml -f docker-compose.observability.yml up -d
# create Networks and Volumes
docker-compose -f docker-compose.networks.yml -f docker-compose.volumes.yml up -d