FROM livekit/livekit-server:latest

CMD ["--dev", "--node-ip=0.0.0.0", "--bind=0.0.0.0"]
