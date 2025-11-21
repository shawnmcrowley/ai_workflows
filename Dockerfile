# Use the official Langflow image as the base
FROM langflowai/langflow:latest

# Switch to root user to install system packages (if not already root)
# The default user might be non-root, check the base image documentation if needed.
USER root

# Copy SSL certificates to /usr/local/share/ca-certificates
COPY ca-certificates/* /usr/local/share/ca-certificates/

# Install update-ca-certificates
RUN update-ca-certificates --fresh

# Update the package list and install libgl1 and other potentially useful headless libraries
RUN apt-get update && apt-get install -y apt-utils libgl1 libglib2.0-0 ffmpeg libsm6 libxext6 && rm -rf /var/lib/apt/lists/*

# Update package list and install latest version of Node and NPM

RUN apt-get update && apt-get install -y \
    curl \
    && curl -fsSL https://deb.nodesource.com/setup_24.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g npm

RUN node --version && npm --version

# Copy SSL certificates to /usr/local/share/ca-certificates
#COPY ca-certificates/* /usr/local/share/ca-certificates/

# Install update-ca-certificates
#RUN update-ca-certificates --fresh

# Switch back to the default user if the base image uses a specific user
# Check the base image documentation for the correct user, often 'langflow' or 'app'
USER user 

# Set the working directory (if the base image doesn't set it)
WORKDIR /app

# Optional: Copy your specific flows or requirements if needed
# COPY requirements.txt .
#RUN pip install
COPY ./flows /app/flows

