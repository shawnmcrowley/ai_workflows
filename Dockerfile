# syntax=docker/dockerfile:1
FROM python:3.12-slim AS builder

# Set environment variables to avoid interactive apt prompts
ENV DEBIAN_FRONTEND=noninteractive

# Update apt, install system dependencies, and clean up apt lists in a single layer
# We install ffmpeg as an example of a custom apt package
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    git \
    ffmpeg \
    libgl1 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copy SSL certificates to /usr/local/share/ca-certificates
COPY ca-certificates/* /usr/local/share/ca-certificates/

# Run apt update (simulate) and upgrade
#RUN apt update -s && apt full-upgrade -y

# Install update-ca-certificates
#RUN apt-get install -y update-ca-certificates && update-ca-certificates --fresh
RUN update-ca-certificates --fresh

# Install libgl1-mesa-glx
# RUN apt-get install -y libgl1-mesa-glx

# Set the working directory inside the container
WORKDIR /app


# Install Python dependencies
#RUN pip install --upgrade pip

# Install the main langflow package
RUN pip install langflow

# --- Final Stage: Runtime ---
FROM python:3.12-slim

# Set environment variables
ENV DEBIAN_FRONTEND=noninteractive
# Set LANGFLOW_COMPONENTS_PATH if using custom components
# ENV LANGFLOW_COMPONENTS_PATH=/app/custom_components

# Install runtime apt dependencies, including the required ffmpeg
RUN apt-get update && apt-get install -y --no-install-recommends \
    ffmpeg \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /app

# Copy the installed Python packages from the builder stage
COPY --from=builder /usr/local/lib/python3.12/site-packages /usr/local/lib/python3.12/site-packages
# Copy your application code or custom components
# COPY src/backend/base/langflow/components/helpers ./custom_components

# Expose the port Langflow runs on
EXPOSE 7860

# Command to run the Langflow application when the container starts
CMD ["langflow", "run", "--host", "0.0.0.0", "--port", "7860"]
