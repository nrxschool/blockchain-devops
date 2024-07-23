 docker run \
    -v $(pwd):/config \
    -w /config \
    -p 8545:8545 \
    hyperledger/besu \
    --config-file=besu.toml