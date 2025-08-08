# Interactive Story Generator

A full-stack web application that generates interactive "choose your own adventure" stories using AI. Built with FastAPI backend and React frontend. Users enter a theme, and the AI creates a branching narrative with multiple paths, choices, and different endings.

## 🎮 Features

- **AI-Powered Story Generation**: Uses OpenAI GPT models via LangChain to create dynamic, branching narratives with 3-4 levels of depth
- **Interactive Storytelling**: Choose-your-own-adventure style gameplay with 2-3 options per story node
- **Multiple Endings**: Stories include both winning and losing endings based on player choices
- **Real-time Processing**: Background job processing for story generation with polling-based status tracking
- **Session Management**: Cookie-based session tracking to maintain user state across interactions
- **Story Restart**: Players can restart stories or generate new ones
- **Modern UI**: Clean, responsive React frontend with intuitive navigation
- **RESTful API**: Well-documented FastAPI backend with automatic OpenAPI documentation

## 🏗️ Architecture

### Backend (FastAPI)
- **Framework**: FastAPI with async support and CORS middleware
- **Database**: PostgreSQL with SQLAlchemy ORM (auto-creates tables on startup)
- **AI Integration**: LangChain with OpenAI API for structured story generation
- **Background Jobs**: FastAPI BackgroundTasks for asynchronous story processing
- **Data Models**: Pydantic v2 schemas with `from_attributes = True` configuration
- **API Documentation**: Automatic OpenAPI/Swagger docs at `/docs` and `/redoc`

### Frontend (React)
- **Framework**: React 19 with Vite build tool
- **Routing**: React Router DOM for SPA navigation
- **HTTP Client**: Axios for API communication with polling mechanism
- **State Management**: React hooks for component state and effect management
- **Styling**: CSS with responsive design patterns

## 🚀 Quick Start

### Prerequisites

- Python 3.12+ (as specified in pyproject.toml)
- Node.js 18+
- PostgreSQL database
- OpenAI API key

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone: https://github.com/sunnyaquostic/adventure-game
   cd fastapi-full-project
   ```

2. **Set up Python environment**
   ```bash
   cd backend
   # Option 1: Using pip
   pip install -r requirements.txt
   
   # Option 2: Using uv (if available)
   uv sync
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

**Response (StoryJobResponse):**
```json
{
  "job_id": "uuid",
  "status": "pending",
  "created_at": "2024-01-01T00:00:00Z",
  "story_id": null,
  "completed_at": null,
  "error": null
}
```

**Note:** The API automatically sets a session cookie for tracking.

#### Get Complete Story
```http
GET /api/stories/{story_id}/complete
```

**Response (CompleteStoryResponse):**
```json
{
  "id": 1,
  "title": "The Enchanted Forest Quest",
  "session_id": "uuid",
  "created_at": "2024-01-01T00:00:00Z",
  "root_node": {
    "id": 1,
    "content": "You stand at the edge of an enchanted forest...",
    "is_ending": false,
    "is_winning_ending": false,
    "options": [
      {
        "text": "Enter the forest cautiously",
        "node_id": 2
      },
      {
        "text": "Call out loudly",
        "node_id": 3
      }
    ]
  },
  "all_nodes": {
    "1": { /* root node details */ },
    "2": { /* option 1 node details */ },
    "3": { /* option 2 node details */ }
  }
}
```

### Job Management

#### Get Job Status
```http
GET /api/jobs/{job_id}
```

**Response:**
```json
{
  "job_id": "uuid",
  "status": "completed",
  "created_at": "2024-01-01T00:00:00Z",
  "story_id": 1,
  "completed_at": "2024-01-01T00:01:30Z",
  "error": null
}
```

**Status Values:** `pending`, `processing`, `completed`, `failed`

## 🎯 Usage

1. **Generate a Story**
   - Visit the homepage at `/`
   - Enter a theme in the input field (e.g., "space exploration", "medieval quest", "cyberpunk mystery", "pirates")
   - Click "Generate Story" button
   - The system creates a background job and shows a loading status

2. **Monitor Generation**
   - The frontend polls the job status every 5 seconds
   - Status progresses: `pending` → `processing` → `completed`
   - If generation fails, an error message is displayed with retry option

3. **Play the Story**
   - Once completed, you're automatically redirected to `/story/{id}`
   - Read the story content and choose from 2-3 available options
   - Click on option buttons to navigate through the story tree
   - Experience different paths leading to winning or losing endings

4. **Story Controls**
   - **Restart Story**: Return to the beginning of the current story
   - **New Story**: Generate a completely new story with a different theme
   - Stories persist in your session until you clear cookies

5. **Story Structure**
   - Stories have 3-4 levels of depth from root to endings
   - Each non-ending node offers 2-3 choices
   - Multiple ending types: winning endings and regular endings
   - Branching narrative paths create replayability

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
- **StoryGenerator**: AI-powered story generation using LangChain with structured Pydantic output parsing
- **StoryJob Model**: Tracks story generation jobs with status, errors, and completion timestamps
- **Story & StoryNode Models**: Hierarchical story structure with JSON options for branching paths
- **Background Tasks**: Asynchronous story processing with database state management
- **Session Management**: Cookie-based user session tracking with UUID generation

#### Frontend
- **StoryGenerator**: Main story creation interface with theme input and job polling
- **StoryGame**: Interactive story playback component with choice navigation
- **StoryLoader**: Route component that fetches and displays complete stories
- **ThemeInput**: Form component for story theme submission with validation
- **LoadingStatus**: Real-time job status tracking with 5-second polling intervals

#### Database Schema
- **stories**: `id`, `title`, `session_id`, `created_at`
- **story_nodes**: `id`, `story_id`, `content`, `is_root`, `is_ending`, `is_winning_ending`, `options` (JSON)
- **story_jobs**: `id`, `job_id`, `session_id`, `theme`, `status`, `story_id`, `error`, `created_at`, `completed_at`

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
2. Configure environment variables (see `.env` example above)
3. Install dependencies: `pip install -r requirements.txt` or `uv sync`
4. Tables will be created automatically on first run
5. Run with uvicorn: `uvicorn main:app --host 0.0.0.0 --port 8000`

### Frontend Deployment
1. Update `API_BASE_URL` in `src/utils.js` for production
2. Build the application: `npm run build`
3. Serve the `dist` folder with a web server (nginx, Apache, etc.)
4. Ensure the web server proxies `/api/*` requests to the backend

### Development vs Production
- **Development**: Frontend runs on port 5173, backend on 8000
- **Production**: Configure reverse proxy to serve both from same domain
- **CORS**: Update `ALLOWED_ORIGINS` environment variable for production domains

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
- Check the API documentation at `/docs` or `/redoc`
- Review the project structure and component documentation
- Verify environment variables are correctly configured
- Check PostgreSQL connection and database permissions
- Ensure OpenAI API key has sufficient credits and permissions

### Common Issues
- **Story generation fails**: Check OpenAI API key and model availability
- **Database connection errors**: Verify PostgreSQL is running and connection string is correct
- **CORS errors**: Update `ALLOWED_ORIGINS` to include your frontend domain
- **Session issues**: Clear browser cookies if experiencing session problems

---

**Built with ❤️ using FastAPI, React, LangChain, and OpenAI** 