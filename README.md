# AI Workflows with Langflow, PostgreSQL, and Ollama

A comprehensive AI-powered system that combines Langflow's visual workflow builder with PostgreSQL's vector database capabilities and local Ollama models to create intelligent agents and document processing workflows.

## 🏗️ Architecture Overview

This project demonstrates the integration of three powerful technologies:

- **Langflow**: Visual AI workflow builder for creating sophisticated AI agents and processing pipelines
- **PostgreSQL**: Vector database for efficient document storage and semantic search
- **Ollama**: Local LLM runtime for privacy-focused AI processing

## 🚀 Available Workflows

The `flows/` directory contains pre-built Langflow workflows for various AI tasks:

### 1. Document Q&A Workflow
- **File**: `Document Q&A.json`
- **Purpose**: Question-answering system for uploaded documents
- **Components**: Chat input, prompt templates, Ollama model integration
- **Use Case**: Interactive document querying with natural language

### 2. Docling Processing Workflow  
- **File**: `Docling Processing.json`
- **Purpose**: Advanced document parsing and processing using Docling
- **Components**: Document ingestion, text splitting, export functionality
- **Use Case**: Structured data extraction from various document formats

### 3. News and Web Search Workflow
- **File**: `News and Web Search.json` 
- **Purpose**: AI-powered web content aggregation and analysis
- **Components**: News search, web scraping, agent-based processing
- **Use Case**: Real-time information gathering and summarization

## 🛠️ Technology Stack

### Langflow Integration
- **Visual Workflow Builder**: Drag-and-drop interface for creating AI pipelines
- **Multi-Agent Support**: Orchestrate complex AI interactions
- **Component Library**: Pre-built components for common AI tasks
- **API Deployment**: Export workflows as RESTful endpoints
- **Code Access**: Full Python customization capabilities

### PostgreSQL Vector Database
- **Vector Extension**: `pgvector` for high-dimensional similarity search
- **Document Storage**: Efficient storage of document embeddings
- **Semantic Search**: Fast cosine similarity queries
- **Scalable Architecture**: IVFFlat indexes for production performance

### Ollama Integration
- **Local Models**: Run LLMs locally without API costs
- **Privacy First**: No data sent to external services
- **Model Flexibility**: Support for Llama, Mistral, and custom models
- **Embedding Generation**: Snowflake Arctic Embed for semantic search

## 📁 Project Structure

```
ai_workflows/
├── flows/                          # Langflow workflow definitions
│   ├── Docling Processing.json     # Document processing pipeline
│   ├── Document Q&A.json          # Question-answering workflow
│   └── News and Web Search.json   # Web content aggregation
├── postgres/                       # Database schema and setup
└── langflow/                       # Langflow source and configuration
```

## 🗄️ Database Schema

The PostgreSQL database includes optimized tables for document storage and retrieval:

```sql
-- Documents table with vector embeddings
CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    filename TEXT NOT NULL,
    content TEXT NOT NULL,
    metadata JSONB NOT NULL,
    embedding vector(1536),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Document chunks for improved retrieval
CREATE TABLE document_chunks (
    id SERIAL PRIMARY KEY,
    document_id INTEGER REFERENCES documents(id) ON DELETE CASCADE,
    chunk_index INTEGER NOT NULL,
    content TEXT NOT NULL,
    embedding vector(1536) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## 🎯 Key Features

### Document Processing
- **Multi-format Support**: PDF, text, and web content processing
- **Intelligent Chunking**: Optimal text segmentation for embedding
- **Metadata Extraction**: Automatic document metadata capture
- **Vector Embeddings**: High-quality semantic representations

### AI Agent Capabilities
- **Natural Language Understanding**: Advanced query comprehension
- **Contextual Responses**: Relevant answer generation
- **Multi-turn Conversations**: Maintained conversation state
- **Tool Integration**: External API and database access

### User Interface
- **Intuitive Upload**: Drag-and-drop document ingestion
- **Real-time Search**: Instant semantic query results
- **Responsive Design**: Mobile-friendly interface
- **Progress Tracking**: Visual feedback for processing status

## 🔧 Development Setup

### Prerequisites
- PostgreSQL 14+ with pgvector extension
- Python 3.10+ (for Langflow)
- Ollama installed locally
- Docker (optional, for containerized deployment)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai_workflows
   ```

2. **Set up PostgreSQL**
   ```bash
   # Create database
   createdb vectordb
   
   # Enable vector extension
   psql vectordb -c "CREATE EXTENSION IF NOT EXISTS vector;"
   ```

3. **Install Ollama**
   ```bash
   # Download from https://ollama.ai
   # Pull required models
   ollama pull llama3.2
   ollama pull snowflake-arctic-embed2
   ```

4. **Install Langflow**
   ```bash
   pip install langflow
   ```

5. **Configure environment variables**
   ```bash
   DATABASE_URL=postgresql://postgres:postgres@localhost/vectordb
   OLLAMA_HOST=http://localhost:11434
   ```

### Running the Application

1. **Start PostgreSQL**
   ```bash
   # Using Docker
   docker-compose up -d postgres
   ```

2. **Start Ollama**
   ```bash
   ollama serve
   # Runs at http://localhost:11434
   ```

3. **Launch Langflow**
   ```bash
   langflow run
   # Access at http://localhost:7860
   ```

## 🔄 Workflow Integration

### Importing Workflows
1. Open Langflow at `http://localhost:7860`
2. Import JSON files from the `flows/` directory
3. Configure API endpoints and model settings
4. Test workflows in the Langflow playground

### API Integration
- Workflows expose RESTful endpoints automatically
- Ollama provides local model inference
- Real-time processing with streaming responses
- Error handling and retry mechanisms

## 🚀 Deployment

### Docker Deployment
```bash
# Build and run all services
docker-compose up -d
```

### Production Considerations
- **Database Scaling**: Connection pooling and read replicas
- **Caching Strategy**: Redis for session and result caching
- **Load Balancing**: Nginx for traffic distribution
- **Monitoring**: Application performance and error tracking

## 🔮 Future Enhancements

- **Multi-modal Processing**: Image and audio document support
- **Advanced Analytics**: Usage metrics and insights
- **Workflow Templates**: Pre-built industry-specific solutions
- **Collaboration Features**: Multi-user workflow sharing
- **Enhanced Security**: Authentication and authorization

## 📚 Resources

- [Langflow Documentation](https://docs.langflow.org)
- [PostgreSQL pgvector Extension](https://github.com/pgvector/pgvector)
- [Ollama Documentation](https://ollama.ai/docs)
- [Snowflake Arctic Embed](https://huggingface.co/Snowflake/snowflake-arctic-embed-m)

---

**Built with ❤️ using Langflow, PostgreSQL, and Ollama**