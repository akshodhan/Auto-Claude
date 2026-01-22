/**
 * AI Provider constants and configurations
 */

import type {
  AIProvider,
  AIProviderConfig,
  AIProviderModel,
  CodingAgentProfile
} from '../types/ai-provider';

// ============================================
// AI Provider Models
// ============================================

const CLAUDE_MODELS: AIProviderModel[] = [
  {
    id: 'claude-sonnet-4.5-20250929',
    name: 'Claude 3.5 Sonnet',
    tier: 'standard',
    contextWindow: 200000,
    supportsTools: true,
    supportsStreaming: true,
    recommendedFor: ['coding', 'reasoning', 'analysis'],
    isDefault: true
  },
  {
    id: 'claude-opus-4.5-20251101',
    name: 'Claude 3.5 Opus',
    tier: 'flagship',
    contextWindow: 200000,
    supportsTools: true,
    supportsStreaming: true,
    recommendedFor: ['complex-coding', 'deep-reasoning', 'architecture']
  },
  {
    id: 'claude-haiku-4.5-20251001',
    name: 'Claude 3.5 Haiku',
    tier: 'basic',
    contextWindow: 200000,
    supportsTools: true,
    supportsStreaming: true,
    recommendedFor: ['quick-tasks', 'editing', 'validation']
  }
];

const OPENAI_MODELS: AIProviderModel[] = [
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    tier: 'standard',
    contextWindow: 128000,
    supportsTools: true,
    supportsStreaming: true,
    recommendedFor: ['coding', 'multimodal', 'reasoning'],
    isDefault: true
  },
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o Mini',
    tier: 'basic',
    contextWindow: 128000,
    supportsTools: true,
    supportsStreaming: true,
    recommendedFor: ['quick-tasks', 'validation', 'editing']
  },
  {
    id: 'o3-mini',
    name: 'o3-mini',
    tier: 'premium',
    contextWindow: 200000,
    supportsTools: true,
    supportsStreaming: true,
    recommendedFor: ['coding', 'reasoning', 'problem-solving']
  }
];

const GOOGLE_MODELS: AIProviderModel[] = [
  {
    id: 'gemini-2.5-pro',
    name: 'Gemini 2.5 Pro',
    tier: 'premium',
    contextWindow: 2000000,
    supportsTools: true,
    supportsStreaming: true,
    recommendedFor: ['coding', 'reasoning', 'long-context'],
    isDefault: true
  },
  {
    id: 'gemini-2.5-flash',
    name: 'Gemini 2.5 Flash',
    tier: 'standard',
    contextWindow: 1000000,
    supportsTools: true,
    supportsStreaming: true,
    recommendedFor: ['speed', 'coding', 'multimodal']
  },
  {
    id: 'gemini-2.0-flash-thinking-exp',
    name: 'Gemini 2.0 Flash Thinking',
    tier: 'flagship',
    contextWindow: 1000000,
    supportsTools: true,
    supportsStreaming: true,
    recommendedFor: ['deep-reasoning', 'complex-coding']
  }
];

const DEEPSEEK_MODELS: AIProviderModel[] = [
  {
    id: 'deepseek-chat',
    name: 'DeepSeek Chat',
    tier: 'standard',
    contextWindow: 128000,
    supportsTools: true,
    supportsStreaming: true,
    recommendedFor: ['coding', 'reasoning'],
    isDefault: true
  },
  {
    id: 'deepseek-reasoner',
    name: 'DeepSeek Reasoner',
    tier: 'premium',
    contextWindow: 64000,
    supportsTools: true,
    supportsStreaming: false,
    recommendedFor: ['deep-reasoning', 'math', 'logic']
  }
];

const GROQ_MODELS: AIProviderModel[] = [
  {
    id: 'llama-3.3-70b-versatile',
    name: 'Llama 3.3 70B Versatile',
    tier: 'standard',
    contextWindow: 128000,
    supportsTools: true,
    supportsStreaming: true,
    recommendedFor: ['coding', 'reasoning', 'speed'],
    isDefault: true
  },
  {
    id: 'mixtral-8x7b-32768',
    name: 'Mixtral 8x7B',
    tier: 'basic',
    contextWindow: 32768,
    supportsTools: true,
    supportsStreaming: true,
    recommendedFor: ['quick-tasks', 'speed']
  }
];

const OPENROUTER_MODELS: AIProviderModel[] = [
  {
    id: 'anthropic/claude-3.5-sonnet',
    name: 'Claude 3.5 Sonnet (via OpenRouter)',
    tier: 'standard',
    contextWindow: 200000,
    supportsTools: true,
    supportsStreaming: true,
    recommendedFor: ['coding', 'reasoning'],
    isDefault: true
  },
  {
    id: 'openai/gpt-4o',
    name: 'GPT-4o (via OpenRouter)',
    tier: 'standard',
    contextWindow: 128000,
    supportsTools: true,
    supportsStreaming: true,
    recommendedFor: ['coding', 'multimodal']
  }
];

const OLLAMA_MODELS: AIProviderModel[] = [
  {
    id: 'llama3.2',
    name: 'Llama 3.2',
    tier: 'standard',
    contextWindow: 128000,
    supportsTools: true,
    supportsStreaming: true,
    recommendedFor: ['coding', 'reasoning'],
    isDefault: true
  },
  {
    id: 'codellama',
    name: 'Code Llama',
    tier: 'basic',
    contextWindow: 16384,
    supportsTools: false,
    supportsStreaming: true,
    recommendedFor: ['coding']
  },
  {
    id: 'deepseek-coder',
    name: 'DeepSeek Coder',
    tier: 'standard',
    contextWindow: 16000,
    supportsTools: false,
    supportsStreaming: true,
    recommendedFor: ['coding']
  }
];

// ============================================
// AI Provider Configurations
// ============================================

export const AI_PROVIDERS: Record<AIProvider, AIProviderConfig> = {
  claude: {
    id: 'claude',
    name: 'Claude',
    icon: 'Brain',
    description: 'Anthropic\'s AI assistant with strong reasoning and coding capabilities',
    models: CLAUDE_MODELS,
    apiKeyEnvVar: 'CLAUDE_API_KEY',
    authType: 'api-key',
    enabled: true
  },
  openai: {
    id: 'openai',
    name: 'OpenAI',
    icon: 'Bot',
    description: 'OpenAI\'s GPT models for coding and general tasks',
    models: OPENAI_MODELS,
    apiKeyEnvVar: 'OPENAI_API_KEY',
    authType: 'api-key',
    enabled: false
  },
  google: {
    id: 'google',
    name: 'Google Gemini',
    icon: 'Sparkles',
    description: 'Google\'s Gemini models with large context windows',
    models: GOOGLE_MODELS,
    apiKeyEnvVar: 'GOOGLE_API_KEY',
    authType: 'api-key',
    enabled: false
  },
  deepseek: {
    id: 'deepseek',
    name: 'DeepSeek',
    icon: 'Zap',
    description: 'DeepSeek models optimized for coding and reasoning',
    models: DEEPSEEK_MODELS,
    apiKeyEnvVar: 'DEEPSEEK_API_KEY',
    authType: 'api-key',
    enabled: false
  },
  groq: {
    id: 'groq',
    name: 'Groq',
    icon: 'Cpu',
    description: 'Ultra-fast inference with Groq\'s LPU technology',
    models: GROQ_MODELS,
    apiKeyEnvVar: 'GROQ_API_KEY',
    authType: 'api-key',
    enabled: false
  },
  openrouter: {
    id: 'openrouter',
    name: 'OpenRouter',
    icon: 'Globe',
    description: 'Unified API for multiple AI models',
    models: OPENROUTER_MODELS,
    apiKeyEnvVar: 'OPENROUTER_API_KEY',
    baseUrl: 'https://openrouter.ai/api/v1',
    authType: 'api-key',
    enabled: false
  },
  ollama: {
    id: 'ollama',
    name: 'Ollama',
    icon: 'Download',
    description: 'Run local open-source models',
    models: OLLAMA_MODELS,
    apiKeyEnvVar: '',
    baseUrl: 'http://localhost:11434',
    authType: 'api-key',
    enabled: false
  },
  anthropic: {
    id: 'anthropic',
    name: 'Anthropic (Legacy)',
    icon: 'Brain',
    description: 'Legacy Anthropic API access (use Claude provider for OAuth)',
    models: CLAUDE_MODELS,
    apiKeyEnvVar: 'ANTHROPIC_API_KEY',
    authType: 'api-key',
    enabled: false
  }
};

// ============================================
// Default Coding Agent Profiles
// ============================================

export const DEFAULT_CODING_AGENT_PROFILES: CodingAgentProfile[] = [
  {
    id: 'claude-sonnet',
    name: 'Claude Sonnet',
    description: 'Balanced performance for most coding tasks',
    provider: 'claude',
    model: 'claude-sonnet-4.5-20250929',
    thinkingLevel: 'medium',
    icon: 'Brain',
    tags: ['recommended', 'balanced'],
    isDefault: true
  },
  {
    id: 'claude-opus',
    name: 'Claude Opus',
    description: 'Highest quality for complex tasks',
    provider: 'claude',
    model: 'claude-opus-4.5-20251101',
    thinkingLevel: 'high',
    icon: 'Sparkles',
    tags: ['premium', 'complex']
  },
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    description: 'Fast and capable for general coding',
    provider: 'openai',
    model: 'gpt-4o',
    thinkingLevel: 'medium',
    icon: 'Bot',
    tags: ['fast', 'multimodal']
  },
  {
    id: 'gemini-pro',
    name: 'Gemini 2.5 Pro',
    description: 'Large context for complex projects',
    provider: 'google',
    model: 'gemini-2.5-pro',
    thinkingLevel: 'medium',
    icon: 'Sparkles',
    tags: ['large-context', 'advanced']
  },
  {
    id: 'deepseek-chat',
    name: 'DeepSeek Chat',
    description: 'Affordable and efficient coding assistant',
    provider: 'deepseek',
    model: 'deepseek-chat',
    thinkingLevel: 'medium',
    icon: 'Zap',
    tags: ['affordable', 'efficient']
  },
  {
    id: 'groq-llama',
    name: 'Llama via Groq',
    description: 'Ultra-fast inference for quick iterations',
    provider: 'groq',
    model: 'llama-3.3-70b-versatile',
    thinkingLevel: 'low',
    icon: 'Cpu',
    tags: ['fast', 'local-model']
  },
  {
    id: 'ollama-local',
    name: 'Ollama Local',
    description: 'Run models locally (no API needed)',
    provider: 'ollama',
    model: 'llama3.2',
    icon: 'Download',
    tags: ['local', 'privacy']
  }
];

// ============================================
// Utility Functions
// ============================================

/**
 * Get provider by ID
 */
export function getProvider(providerId: AIProvider): AIProviderConfig | undefined {
  return AI_PROVIDERS[providerId];
}

/**
 * Get model by provider and model ID
 */
export function getModel(providerId: AIProvider, modelId: string): AIProviderModel | undefined {
  const provider = AI_PROVIDERS[providerId];
  return provider?.models.find(m => m.id === modelId);
}

/**
 * Get default model for a provider
 */
export function getDefaultModel(providerId: AIProvider): AIProviderModel | undefined {
  const provider = AI_PROVIDERS[providerId];
  return provider?.models.find(m => m.isDefault);
}

/**
 * Check if provider is configured (has API key set)
 */
export function isProviderConfigured(providerId: AIProvider, envVars: Record<string, string>): boolean {
  const provider = AI_PROVIDERS[providerId];
  if (!provider) return false;
  
  // For Ollama, just check if it's enabled (no API key needed)
  if (providerId === 'ollama') {
    return provider.enabled;
  }
  
  return Boolean(envVars[provider.apiKeyEnvVar]);
}

/**
 * Get all configured providers
 */
export function getConfiguredProviders(envVars: Record<string, string>): AIProviderConfig[] {
  return Object.values(AI_PROVIDERS).filter(provider =>
    isProviderConfigured(provider.id, envVars)
  );
}
