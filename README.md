# Interactive Story Generator

A full-stack web application that generates interactive "choose your own adventure" stories using AI. Built with FastAPI backend and React frontend.

## 🎮 Features

- **AI-Powered Story Generation**: Uses OpenAI's language models to create dynamic, branching narratives
- **Interactive Storytelling**: Choose-your-own-adventure style gameplay with multiple story paths
- **Real-time Processing**: Background job processing for story generation with status tracking
- **Session Management**: Persistent story sessions with cookie-based tracking
- **Modern UI**: Clean, responsive React frontend with smooth user experience
- **RESTful API**: Well-documented FastAPI backend with automatic OpenAPI documentation

## 🏗️ Architecture

### Backend (FastAPI)
- **Framework**: FastAPI with async support
- **Database**: PostgreSQL with SQLAlchemy ORM
- **AI Integration**: LangChain with OpenAI API
- **Background Jobs**: FastAPI BackgroundTasks for story generation
- **API Documentation**: Automatic OpenAPI/Swagger docs

### Frontend (React)
- **Framework**: React 19 with Vite
- **Routing**: React Router DOM
- **HTTP Client**: Axios for API communication
- **Styling**: CSS with modern design patterns

## 🚀 Quick Start

### Prerequisites

- Python 3.8+
- Node.js 18+
- PostgreSQL database
- OpenAI API key

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fastapi-full-project
   ```

2. **Set up Python environment**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. **Configure environment variables**
   Create a `.env` file in the `backend` directory:
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/story_db
   OPENAI_API_KEY=your_openai_api_key_here
   LLM_MODEL=gpt-4
   ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
   DEBUG=true
   ```

4. **Set up database**
   ```bash
   # Create PostgreSQL database
   createdb story_db
   
   # Run the application (tables will be created automatically)
   python main.py
   ```

### Frontend Setup

1. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

## 📚 API Documentation

### Story Generation

#### Create a New Story
```http
POST /api/stories/create
Content-Type: application/json

{
  "theme": "fantasy adventure"
}
```

**Response:**
```json
{
  "job_id": "uuid",
  "session_id": "uuid",
  "theme": "fantasy adventure",
  "status": "pending",
  "created_at": "2024-01-01T00:00:00Z"
}
```

#### Get Story Status
```http
GET /api/jobs/{job_id}
```

#### Get Complete Story
```http
GET /api/stories/{story_id}/complete
```

### Job Management

#### Get Job Status
```http
GET /api/jobs/{job_id}
```

#### Get User Jobs
```http
GET /api/jobs/user/{session_id}
```

## 🎯 Usage

1. **Generate a Story**
   - Visit the homepage
   - Enter a theme (e.g., "space exploration", "medieval quest", "cyberpunk mystery")
   - Click "Generate Story"

2. **Play the Story**
   - Wait for story generation to complete
   - Navigate through story nodes by clicking on choices
   - Experience different endings based on your decisions

3. **Story Features**
   - Multiple branching paths
   - Different endings (winning/losing)
   - Persistent session tracking
   - Real-time generation status

## 🛠️ Development

### Project Structure

```
fastapi-full-project/
├── backend/
│   ├── core/           # Core functionality and AI integration
│   ├── db/            # Database configuration
│   ├── models/        # SQLAlchemy models
│   ├── routers/       # API endpoints
│   ├── schemas/       # Pydantic schemas
│   └── main.py        # FastAPI application
├── frontend/
│   ├── src/
│   │   ├── components/ # React components
│   │   └── utils.js   # Utility functions
│   └── package.json
└── README.md
```

### Key Components

#### Backend
- **StoryGenerator**: AI-powered story generation using LangChain
- **Background Tasks**: Asynchronous story processing
- **Session Management**: Cookie-based user session tracking
- **Database Models**: Story and StoryNode for narrative structure

#### Frontend
- **StoryGenerator**: Main story creation interface
- **StoryLoader**: Story playback component
- **LoadingStatus**: Real-time job status tracking

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `OPENAI_API_KEY` | OpenAI API key for story generation | Yes |
| `LLM_MODEL` | OpenAI model name (e.g., gpt-4) | Yes |
| `ALLOWED_ORIGINS` | CORS allowed origins | No |
| `DEBUG` | Enable debug mode | No |

## 🔧 Configuration

### Database
The application uses PostgreSQL with SQLAlchemy. Tables are created automatically on startup.

### AI Model
Configure the OpenAI model in your `.env` file:
```env
LLM_MODEL=gpt-4  # or gpt-3.5-turbo
```

### CORS
Configure allowed origins for frontend communication:
```env
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

## 🚀 Deployment

### Backend Deployment
1. Set up a PostgreSQL database
2. Configure environment variables
3. Install dependencies: `pip install -r requirements.txt`
4. Run with uvicorn: `uvicorn main:app --host 0.0.0.0 --port 8000`

### Frontend Deployment
1. Build the application: `npm run build`
2. Serve the `dist` folder with a web server

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:
- Check the API documentation at `/docs`
- Review the code structure
- Open an issue on GitHub

---

**Built with ❤️ using FastAPI, React, and OpenAI** 