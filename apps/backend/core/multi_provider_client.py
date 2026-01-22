"""
Multi-Provider AI Client Factory
================================

Supports multiple AI providers (Claude, OpenAI, Google, DeepSeek, Groq, OpenRouter, Ollama)
for coding agents.

Provides a unified interface for creating AI clients regardless of provider.
"""

import os
import logging
from typing import Any, Optional
from pathlib import Path
from enum import Enum

from core.auth import get_auth_token

logger = logging.getLogger(__name__)


class AIProvider(Enum):
    """Supported AI providers"""
    CLAUDE = "claude"
    OPENAI = "openai"
    GOOGLE = "google"
    DEEPSEEK = "deepseek"
    GROQ = "groq"
    OPENROUTER = "openrouter"
    OLLAMA = "ollama"
    ANTHROPIC = "anthropic"


class AIModelConfig:
    """Configuration for an AI model"""
    def __init__(
        self,
        provider: AIProvider,
        model_id: str,
        context_window: int,
        supports_tools: bool = True,
        supports_streaming: bool = True
    ):
        self.provider = provider
        self.model_id = model_id
        self.context_window = context_window
        self.supports_tools = supports_tools
        self.supports_streaming = supports_streaming


# Model configurations for each provider
PROVIDER_MODELS = {
    AIProvider.CLAUDE: {
        "claude-sonnet-4.5-20250929": AIModelConfig(
            AIProvider.CLAUDE, "claude-sonnet-4.5-20250929", 200000, True, True
        ),
        "claude-opus-4.5-20251101": AIModelConfig(
            AIProvider.CLAUDE, "claude-opus-4.5-20251101", 200000, True, True
        ),
        "claude-haiku-4.5-20251001": AIModelConfig(
            AIProvider.CLAUDE, "claude-haiku-4.5-20251001", 200000, True, True
        )
    },
    AIProvider.OPENAI: {
        "gpt-4o": AIModelConfig(
            AIProvider.OPENAI, "gpt-4o", 128000, True, True
        ),
        "gpt-4o-mini": AIModelConfig(
            AIProvider.OPENAI, "gpt-4o-mini", 128000, True, True
        ),
        "o3-mini": AIModelConfig(
            AIProvider.OPENAI, "o3-mini", 200000, True, True
        )
    },
    AIProvider.GOOGLE: {
        "gemini-2.5-pro": AIModelConfig(
            AIProvider.GOOGLE, "gemini-2.5-pro", 2000000, True, True
        ),
        "gemini-2.5-flash": AIModelConfig(
            AIProvider.GOOGLE, "gemini-2.5-flash", 1000000, True, True
        ),
        "gemini-2.0-flash-thinking-exp": AIModelConfig(
            AIProvider.GOOGLE, "gemini-2.0-flash-thinking-exp", 1000000, True, True
        )
    },
    AIProvider.DEEPSEEK: {
        "deepseek-chat": AIModelConfig(
            AIProvider.DEEPSEEK, "deepseek-chat", 128000, True, True
        ),
        "deepseek-reasoner": AIModelConfig(
            AIProvider.DEEPSEEK, "deepseek-reasoner", 64000, True, False
        )
    },
    AIProvider.GROQ: {
        "llama-3.3-70b-versatile": AIModelConfig(
            AIProvider.GROQ, "llama-3.3-70b-versatile", 128000, True, True
        ),
        "mixtral-8x7b-32768": AIModelConfig(
            AIProvider.GROQ, "mixtral-8x7b-32768", 32768, True, True
        )
    },
    AIProvider.OPENROUTER: {
        "anthropic/claude-3.5-sonnet": AIModelConfig(
            AIProvider.OPENROUTER, "anthropic/claude-3.5-sonnet", 200000, True, True
        ),
        "openai/gpt-4o": AIModelConfig(
            AIProvider.OPENROUTER, "openai/gpt-4o", 128000, True, True
        )
    },
    AIProvider.OLLAMA: {
        "llama3.2": AIModelConfig(
            AIProvider.OLLAMA, "llama3.2", 128000, True, True
        ),
        "codellama": AIModelConfig(
            AIProvider.OLLAMA, "codellama", 16384, False, True
        ),
        "deepseek-coder": AIModelConfig(
            AIProvider.OLLAMA, "deepseek-coder", 16000, False, True
        )
    }
}


def get_provider_api_key(provider: AIProvider) -> Optional[str]:
    """Get API key for a provider from environment variables"""
    env_var_map = {
        AIProvider.CLAUDE: "CLAUDE_API_KEY",
        AIProvider.OPENAI: "OPENAI_API_KEY",
        AIProvider.GOOGLE: "GOOGLE_API_KEY",
        AIProvider.DEEPSEEK: "DEEPSEEK_API_KEY",
        AIProvider.GROQ: "GROQ_API_KEY",
        AIProvider.OPENROUTER: "OPENROUTER_API_KEY",
        AIProvider.ANTHROPIC: "ANTHROPIC_API_KEY",
        AIProvider.OLLAMA: ""  # Ollama doesn't need an API key
    }
    
    env_var = env_var_map.get(provider)
    if not env_var:
        return None
    
    return os.environ.get(env_var)


def is_provider_configured(provider: AIProvider) -> bool:
    """Check if a provider is configured with necessary credentials"""
    if provider == AIProvider.OLLAMA:
        # Ollama just needs to be running locally
        return True
    
    api_key = get_provider_api_key(provider)
    return bool(api_key)


def get_provider_oauth_token(provider: AIProvider) -> Optional[str]:
    """Get OAuth token for providers that support OAuth (Claude)"""
    if provider == AIProvider.CLAUDE:
        # For Claude, use the existing OAuth token from core.auth
        return get_auth_token()
    
    return None


def get_provider_base_url(provider: AIProvider) -> Optional[str]:
    """Get base URL for provider (for custom endpoints)"""
    if provider == AIProvider.OPENROUTER:
        return os.environ.get("OPENROUTER_BASE_URL", "https://openrouter.ai/api/v1")
    
    if provider == AIProvider.OLLAMA:
        return os.environ.get("OLLAMA_BASE_URL", "http://localhost:11434")
    
    return None


def create_ai_client(
    provider: AIProvider,
    model_id: str,
    project_dir: Optional[Path] = None,
    spec_dir: Optional[Path] = None,
    agent_type: str = "coder",
    max_thinking_tokens: Optional[int] = None,
    **kwargs
) -> Any:
    """
    Create an AI client for the specified provider and model.
    
    This factory function creates the appropriate client based on the provider.
    For Claude, it uses the Claude Agent SDK. For other providers, it creates
    appropriate OpenAI-compatible clients.
    
    Args:
        provider: The AI provider to use
        model_id: The model ID to use
        project_dir: Project directory (for Claude SDK)
        spec_dir: Spec directory (for Claude SDK)
        agent_type: Type of agent (planner, coder, qa_reviewer, qa_fixer)
        max_thinking_tokens: Maximum thinking tokens (for Claude)
        **kwargs: Additional provider-specific arguments
        
    Returns:
        An AI client instance
        
    Raises:
        ValueError: If provider is not configured or model is invalid
        ImportError: If required dependencies are not installed
    """
    # Check if provider is configured
    if not is_provider_configured(provider) and provider != AIProvider.OLLAMA:
        raise ValueError(
            f"Provider {provider.value} is not configured. "
            f"Please set the {get_provider_api_key.__name__} environment variable."
        )
    
    # Validate model exists for provider
    if provider not in PROVIDER_MODELS:
        raise ValueError(f"Unsupported provider: {provider.value}")
    
    if model_id not in PROVIDER_MODELS[provider]:
        available_models = ", ".join(PROVIDER_MODELS[provider].keys())
        raise ValueError(
            f"Model {model_id} not found for provider {provider.value}. "
            f"Available models: {available_models}"
        )
    
    # Import client creation functions
    if provider == AIProvider.CLAUDE:
        from core.client import create_client as create_claude_client
        return create_claude_client(
            project_dir=project_dir,
            spec_dir=spec_dir,
            model=model_id,
            agent_type=agent_type,
            max_thinking_tokens=max_thinking_tokens,
            **kwargs
        )
    
    # For OpenAI-compatible providers (OpenAI, DeepSeek, Groq, OpenRouter)
    if provider in [AIProvider.OPENAI, AIProvider.DEEPSEEK, AIProvider.GROQ, AIProvider.OPENROUTER]:
        return create_openai_compatible_client(
            provider=provider,
            model_id=model_id,
            **kwargs
        )
    
    # For Google Gemini
    if provider == AIProvider.GOOGLE:
        return create_google_client(
            model_id=model_id,
            **kwargs
        )
    
    # For Ollama
    if provider == AIProvider.OLLAMA:
        return create_ollama_client(
            model_id=model_id,
            **kwargs
        )
    
    raise ValueError(f"Unsupported provider: {provider.value}")


def create_openai_compatible_client(
    provider: AIProvider,
    model_id: str,
    **kwargs
) -> Any:
    """Create an OpenAI-compatible client for OpenAI, DeepSeek, Groq, or OpenRouter"""
    try:
        from openai import OpenAI
    except ImportError:
        raise ImportError(
            f"OpenAI library is required for {provider.value}. "
            "Install with: pip install openai"
        )
    
    api_key = get_provider_api_key(provider)
    base_url = get_provider_base_url(provider)
    
    client_kwargs = {"api_key": api_key}
    if base_url:
        client_kwargs["base_url"] = base_url
    
    return OpenAI(**client_kwargs)


def create_google_client(
    model_id: str,
    **kwargs
) -> Any:
    """Create a Google Gemini client"""
    try:
        import google.generativeai as genai
    except ImportError:
        raise ImportError(
            "Google Generative AI library is required for Google provider. "
            "Install with: pip install google-generativeai"
        )
    
    api_key = get_provider_api_key(AIProvider.GOOGLE)
    genai.configure(api_key=api_key)
    
    return genai.GenerativeModel(model_id)


def create_ollama_client(
    model_id: str,
    **kwargs
) -> Any:
    """Create an Ollama client"""
    try:
        from openai import OpenAI
    except ImportError:
        raise ImportError(
            "OpenAI library is required for Ollama client. "
            "Install with: pip install openai"
        )
    
    base_url = get_provider_base_url(AIProvider.OLLAMA) or "http://localhost:11434"
    
    return OpenAI(
        base_url=base_url,
        api_key="ollama"  # Ollama doesn't need a real API key
    )


def get_default_model_for_provider(provider: AIProvider) -> Optional[str]:
    """Get the default model for a provider"""
    if provider not in PROVIDER_MODELS:
        return None
    
    models = PROVIDER_MODELS[provider]
    for model_id, config in models.items():
        if config.supports_tools:  # Prefer models that support tools
            return model_id
    
    return next(iter(models.keys()), None)


def list_available_providers() -> list[AIProvider]:
    """List all providers that are configured"""
    return [
        provider for provider in AIProvider
        if is_provider_configured(provider)
    ]


def list_models_for_provider(provider: AIProvider) -> list[str]:
    """List all available models for a provider"""
    if provider not in PROVIDER_MODELS:
        return []
    
    return list(PROVIDER_MODELS[provider].keys())
