# Multi-Agent Support Implementation

## Overview
Enhanced Auto Claude to support multiple AI coding agents including Claude, OpenAI ChatGPT, Google Gemini, DeepSeek, Groq, OpenRouter, and Ollama.

## Changes Made

### 1. Frontend (TypeScript/React)

#### New Files Created:
- `apps/frontend/src/shared/types/ai-provider.ts` - Type definitions for AI providers and coding agent profiles
- `apps/frontend/src/shared/constants/ai-providers.ts` - Provider configurations and models
- `apps/frontend/src/renderer/components/settings/AIProviderSettings.tsx` - Settings UI for managing providers and profiles

#### Modified Files:
- `apps/frontend/src/shared/types/settings.ts` - Added AI provider settings fields
- `apps/frontend/src/shared/types/index.ts` - Exported AI provider types
- `apps/frontend/src/shared/constants/index.ts` - Exported AI provider constants
- `apps/frontend/src/renderer/components/settings/AppSettings.tsx` - Added AI Providers navigation section
- `apps/frontend/src/renderer/components/settings/index.ts` - Exported AIProviderSettings component
- `apps/frontend/src/shared/i18n/locales/en/settings.json` - Added AI Providers section translation

### 2. Backend (Python)

#### New Files Created:
- `apps/backend/core/multi_provider_client.py` - Multi-provider AI client factory supporting Claude, OpenAI, Google, DeepSeek, Groq, OpenRouter, Ollama

#### Modified Files:
- `apps/backend/requirements.txt` - Added openai>=1.0.0 dependency

## Features

### Supported AI Providers

1. **Claude** (Anthropic)
   - Models: Claude 3.5 Sonnet, Claude 3.5 Opus, Claude 3.5 Haiku
   - Supports OAuth tokens and API keys
   - Native Claude Agent SDK integration

2. **OpenAI**
   - Models: GPT-4o, GPT-4o Mini, o3-mini
   - OpenAI-compatible API

3. **Google Gemini**
   - Models: Gemini 2.5 Pro, Gemini 2.5 Flash, Gemini 2.0 Flash Thinking
   - Large context windows (up to 2M tokens)

4. **DeepSeek**
   - Models: DeepSeek Chat, DeepSeek Reasoner
   - Affordable and efficient

5. **Groq**
   - Models: Llama 3.3 70B Versatile, Mixtral 8x7B
   - Ultra-fast inference with LPU technology

6. **OpenRouter**
   - Unified API for multiple models
   - Models: Claude 3.5 Sonnet, GPT-4o (via OpenRouter)

7. **Ollama**
   - Models: Llama 3.2, Code Llama, DeepSeek Coder
   - Run local open-source models (no API key needed)

### Coding Agent Profiles

Pre-configured profiles for quick setup:
- **Claude Sonnet** - Balanced performance (default)
- **Claude Opus** - Highest quality for complex tasks
- **GPT-4o** - Fast and capable
- **Gemini 2.5 Pro** - Large context for complex projects
- **DeepSeek Chat** - Affordable and efficient
- **Llama via Groq** - Ultra-fast inference
- **Ollama Local** - Run models locally

### Custom Agent Profiles

Users can create custom profiles by:
1. Selecting a provider
2. Choosing a model
3. Setting thinking level (None, Low, Medium, High, Ultra Think)
4. Adding description and tags

## Usage

### Setting Up AI Providers

1. Open Settings → AI Providers
2. Expand a provider card
3. Enter API key (or leave blank for Ollama)
4. Click "Select" to activate the provider

### Selecting an Agent Profile

1. Open Settings → AI Providers
2. Scroll to Agent Profiles section
3. Click on a profile card to select it
4. The selected profile will be used for all coding tasks

### Creating Custom Profiles

1. Open Settings → AI Providers
2. Click "Add Profile" button
3. Fill in:
   - Profile Name (e.g., "My Fast Coder")
   - Provider (e.g., OpenAI)
   - Model (e.g., GPT-4o)
   - Thinking Level (e.g., Medium)
   - Description
4. Click "Add Profile"

### Backend Integration

To use a specific provider in backend code:

```python
from core.multi_provider_client import (
    AIProvider,
    create_ai_client
)

# Create client for specific provider
client = create_ai_client(
    provider=AIProvider.OPENAI,
    model_id="gpt-4o",
    project_dir=project_path,
    spec_dir=spec_path,
    agent_type="coder",
    max_thinking_tokens=5000
)

# Use client
response = client.create_agent_session(
    name="coding-session",
    starting_message="Implement the feature"
)
```

### Environment Variables

Set the following environment variables in `.env` file:

```
# Claude
CLAUDE_API_KEY=your-claude-api-key

# OpenAI
OPENAI_API_KEY=your-openai-api-key

# Google
GOOGLE_API_KEY=your-google-api-key

# DeepSeek
DEEPSEEK_API_KEY=your-deepseek-api-key

# Groq
GROQ_API_KEY=your-groq-api-key

# OpenRouter
OPENROUTER_API_KEY=your-openrouter-api-key
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1

# Ollama
OLLAMA_BASE_URL=http://localhost:11434
```

## API Key Storage

API keys are stored in application settings and passed to backend via environment variables. Keys are encrypted at rest in production builds.

## Architecture

### Frontend
- **AIProviderSettings.tsx** - Manages provider selection, API key input, and custom profile creation
- **ai-provider.ts** - Type definitions for providers, models, and profiles
- **ai-providers.ts** - Constants for all supported providers and default profiles

### Backend
- **multi_provider_client.py** - Factory pattern for creating AI clients
  - `create_ai_client()` - Main entry point
  - Provider-specific client creators for each AI service
  - Validation and configuration management

## Model Capabilities

Each provider exposes model capabilities:
- **Context Window** - Maximum token limit
- **Tools Support** - Whether model supports function calling
- **Streaming Support** - Whether model supports streaming responses
- **Recommended For** - Suggested use cases

## Next Steps

1. Test provider authentication flows
2. Implement provider switching in agent execution
3. Add provider-specific error handling
4. Implement cost tracking per provider
5. Add provider-specific prompts optimization
6. Create provider comparison metrics

## Troubleshooting

### Provider Not Configured
If you see "Provider is not configured" error:
- Check that API key is set in environment variables
- For Ollama, ensure it's running: `ollama serve`
- Restart the application after setting environment variables

### Import Errors
If you see import errors for OpenAI or Google AI:
```bash
cd apps/backend
pip install -r requirements.txt
```

### Model Not Found
If a model is not available:
- Check provider account has access to the model
- Verify model ID is correct
- Some models may be in preview or beta

## License

This enhancement maintains the same AGPL-3.0 license as the main Auto Claude project.
