# Stage 1: Build stage to pull the model
FROM ollama/ollama:latest AS builder

# Start Ollama server in the background and wait for it to become ready
# nohup ensures the process continues even if the shell exits
# sleep allows the server to initialize
# ollama pull downloads the desired model
RUN nohup ollama serve > /tmp/ollama.log 2>&1 & \
    sleep 10 && \
    ollama pull minimax-m2:cloud && \
    ollama pull glm-4.6:cloud && \
    ollama pull snowflake-arctic-embed2 && \
    ollama pull llama3.1 && \
    kill $(jobs -p)

# Stage 2: Final image for deployment
FROM ollama/ollama:latest

# Copy the preloaded model cache from the builder stage
# This transfers the downloaded model files to the final image
COPY --from=builder /root/.ollama /root/.ollama

# Expose the default Ollama port
EXPOSE 11434

# Run the Ollama server when the container starts
CMD ["serve"]