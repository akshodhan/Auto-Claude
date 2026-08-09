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
    id: 'claude-sonnet-4-5-20250929',
    name: 'Claude 4.5 Sonnet',
    tier: 'standard',
    contextWindow: 200000,
    supportsTools: true,
    supportsStreaming: true,
    supportsReasoning: true,
    recommendedFor: ['coding', 'reasoning', 'analysis'],
    isDefault: true,
    variants: ['high', 'max']
  },
  {
    id: 'claude-opus-4-5-20251101',
    name: 'Claude 4.5 Opus',
    tier: 'flagship',
    contextWindow: 200000,
    supportsTools: true,
    supportsStreaming: true,
    supportsReasoning: true,
    recommendedFor: ['complex-coding', 'deep-reasoning', 'architecture'],
    variants: ['high', 'max']
  },
  {
    id: 'claude-haiku-4-5-20251001',
    name: 'Claude 4.5 Haiku',
    tier: 'basic',
    contextWindow: 200000,
    supportsTools: true,
    supportsStreaming: true,
    recommendedFor: ['quick-tasks', 'editing', 'validation']
  },
  {
    id: 'claude-sonnet-4',
    name: 'Claude 4 Sonnet',
    tier: 'standard',
    contextWindow: 200000,
    supportsTools: true,
    supportsStreaming: true,
    supportsReasoning: true,
    recommendedFor: ['coding', 'reasoning'],
    variants: ['high', 'max']
  },
  {
    id: 'claude-opus-4',
    name: 'Claude 4 Opus',
    tier: 'flagship',
    contextWindow: 200000,
    supportsTools: true,
    supportsStreaming: true,
    supportsReasoning: true,
    recommendedFor: ['deep-reasoning', 'complex-coding'],
    variants: ['high', 'max']
  },
  {
    id: 'claude-3.7-sonnet',
    name: 'Claude 3.7 Sonnet',
    tier: 'premium',
    contextWindow: 200000,
    supportsTools: true,
    supportsStreaming: true,
    supportsReasoning: true,
    recommendedFor: ['advanced-coding', 'reasoning'],
    variants: ['high', 'max']
  },
  {
    id: 'claude-3.5-sonnet',
    name: 'Claude 3.5 Sonnet',
    tier: 'standard',
    contextWindow: 200000,
    supportsTools: true,
    supportsStreaming: true,
    supportsReasoning: true,
    recommendedFor: ['coding', 'reasoning']
  },
  {
    id: 'claude-3.7-sonnet-thinking',
    name: 'Claude 3.7 Sonnet Thinking',
    tier: 'flagship',
    contextWindow: 200000,
    supportsTools: true,
    supportsStreaming: true,
    supportsReasoning: true,
    recommendedFor: ['deep-reasoning', 'complex-tasks']
  },
  {
    id: 'claude-3-haiku',
    name: 'Claude 3 Haiku',
    tier: 'basic',
    contextWindow: 200000,
    supportsTools: true,
    supportsStreaming: true,
    recommendedFor: ['speed', 'validation']
  },
  {
    id: 'claude-3-opus',
    name: 'Claude 3 Opus',
    tier: 'premium',
    contextWindow: 200000,
    supportsTools: true,
    supportsStreaming: true,
    recommendedFor: ['advanced-coding', 'reasoning']
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
    supportsReasoning: true,
    recommendedFor: ['coding', 'multimodal', 'reasoning'],
    isDefault: true,
    variants: ['none', 'minimal', 'low', 'medium', 'high', 'xhigh']
  },
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o Mini',
    tier: 'basic',
    contextWindow: 128000,
    supportsTools: true,
    supportsStreaming: true,
    supportsReasoning: true,
    recommendedFor: ['quick-tasks', 'validation', 'editing'],
    variants: ['none', 'minimal', 'low', 'medium', 'high']
  },
  {
    id: 'gpt-4.1',
    name: 'GPT-4.1',
    tier: 'premium',
    contextWindow: 1000000,
    supportsTools: true,
    supportsStreaming: true,
    supportsReasoning: true,
    recommendedFor: ['complex-coding', 'long-context'],
    variants: ['none', 'minimal', 'low', 'medium', 'high']
  },
  {
    id: 'gpt-4.1-mini',
    name: 'GPT-4.1 Mini',
    tier: 'basic',
    contextWindow: 1000000,
    supportsTools: true,
    supportsStreaming: true,
    supportsReasoning: true,
    recommendedFor: ['speed', 'validation'],
    variants: ['none', 'minimal', 'low']
  },
  {
    id: 'gpt-4.1-nano',
    name: 'GPT-4.1 Nano',
    tier: 'basic',
    contextWindow: 1000000,
    supportsTools: true,
    supportsStreaming: true,
    supportsReasoning: true,
    recommendedFor: ['speed'],
    variants: ['none']
  },
  {
    id: 'o3-mini',
    name: 'o3-mini',
    tier: 'premium',
    contextWindow: 200000,
    supportsTools: true,
    supportsStreaming: true,
    supportsReasoning: true,
    recommendedFor: ['coding', 'reasoning', 'problem-solving'],
    variants: ['low', 'medium', 'high']
  },
  {
    id: 'o3',
    name: 'o3',
    tier: 'flagship',
    contextWindow: 200000,
    supportsTools: true,
    supportsStreaming: true,
    supportsReasoning: true,
    recommendedFor: ['deep-reasoning', 'complex-coding'],
    variants: ['low', 'medium', 'high']
  },
  {
    id: 'o4-mini',
    name: 'O4 Mini',
    tier: 'flagship',
    contextWindow: 200000,
    supportsTools: true,
    supportsStreaming: true,
    supportsReasoning: true,
    recommendedFor: ['advanced-coding', 'reasoning'],
    variants: ['low', 'high']
  },
  {
    id: 'gpt-4.5-preview',
    name: 'GPT-4.5 Preview',
    tier: 'flagship',
    contextWindow: 128000,
    supportsTools: true,
    supportsStreaming: true,
    supportsReasoning: true,
    recommendedFor: ['cutting-edge', 'reasoning']
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
    supportsReasoning: true,
    recommendedFor: ['coding', 'reasoning', 'long-context'],
    isDefault: true,
    variants: ['low', 'high']
  },
  {
    id: 'gemini-2.5-flash',
    name: 'Gemini 2.5 Flash',
    tier: 'standard',
    contextWindow: 1000000,
    supportsTools: true,
    supportsStreaming: true,
    supportsReasoning: true,
    recommendedFor: ['speed', 'coding', 'multimodal'],
    variants: ['low', 'high']
  },
  {
    id: 'gemini-2.0-flash-thinking-exp',
    name: 'Gemini 2.0 Flash Thinking',
    tier: 'flagship',
    contextWindow: 1000000,
    supportsTools: true,
    supportsStreaming: true,
    supportsReasoning: true,
    recommendedFor: ['deep-reasoning', 'complex-coding']
  },
  {
    id: 'gemini-2.0-flash',
    name: 'Gemini 2.0 Flash',
    tier: 'standard',
    contextWindow: 1000000,
    supportsTools: true,
    supportsStreaming: true,
    supportsReasoning: true,
    recommendedFor: ['speed', 'coding']
  },
  {
    id: 'gemini-2.0-flash-lite',
    name: 'Gemini 2.0 Flash Lite',
    tier: 'basic',
    contextWindow: 1000000,
    supportsTools: true,
    supportsStreaming: true,
    recommendedFor: ['speed', 'validation']
  },
  {
    id: 'gemini-3-pro',
    name: 'Gemini 3 Pro',
    tier: 'flagship',
    contextWindow: 2000000,
    supportsTools: true,
    supportsStreaming: true,
    supportsReasoning: true,
    recommendedFor: ['cutting-edge', 'deep-reasoning']
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
    id: 'llama-4-maverick-17b-128e-instruct',
    name: 'Llama 4 Maverick 17B',
    tier: 'premium',
    contextWindow: 128000,
    supportsTools: true,
    supportsStreaming: true,
    recommendedFor: ['coding', 'reasoning', 'speed'],
    isDefault: true
  },
  {
    id: 'llama-4-scout-17b-16e-instruct',
    name: 'Llama 4 Scout 17B',
    tier: 'standard',
    contextWindow: 128000,
    supportsTools: true,
    supportsStreaming: true,
    recommendedFor: ['coding', 'speed']
  },
  {
    id: 'qwen-qwq-32b',
    name: 'QWEN QWQ-32B',
    tier: 'standard',
    contextWindow: 32768,
    supportsTools: true,
    supportsStreaming: true,
    recommendedFor: ['reasoning', 'speed']
  },
  {
    id: 'deepseek-r1-distill-llama-70b',
    name: 'DeepSeek R1 Distill Llama 70B',
    tier: 'premium',
    contextWindow: 32768,
    supportsTools: true,
    supportsStreaming: true,
    recommendedFor: ['deep-reasoning', 'coding']
  },
  {
    id: 'llama-3.3-70b-versatile',
    name: 'Llama 3.3 70B Versatile',
    tier: 'standard',
    contextWindow: 128000,
    supportsTools: true,
    supportsStreaming: true,
    recommendedFor: ['coding', 'reasoning', 'speed']
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
// GitHub Copilot Models
// ============================================

const GITHUB_COPILOT_MODELS: AIProviderModel[] = [
  {
    id: 'gpt-4o',
    name: 'GPT-4o (via Copilot)',
    tier: 'standard',
    contextWindow: 128000,
    supportsTools: true,
    supportsStreaming: true,
    supportsReasoning: true,
    recommendedFor: ['coding', 'multimodal'],
    isDefault: true
  },
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o Mini (via Copilot)',
    tier: 'basic',
    contextWindow: 128000,
    supportsTools: true,
    supportsStreaming: true,
    recommendedFor: ['quick-tasks', 'validation']
  },
  {
    id: 'gpt-4.1',
    name: 'GPT-4.1 (via Copilot)',
    tier: 'premium',
    contextWindow: 1000000,
    supportsTools: true,
    supportsStreaming: true,
    recommendedFor: ['complex-coding', 'long-context']
  },
  {
    id: 'claude-3.5-sonnet',
    name: 'Claude 3.5 Sonnet (via Copilot)',
    tier: 'standard',
    contextWindow: 200000,
    supportsTools: true,
    supportsStreaming: true,
    recommendedFor: ['coding', 'reasoning']
  },
  {
    id: 'claude-3.7-sonnet',
    name: 'Claude 3.7 Sonnet (via Copilot)',
    tier: 'premium',
    contextWindow: 200000,
    supportsTools: true,
    supportsStreaming: true,
    recommendedFor: ['advanced-coding', 'reasoning']
  },
  {
    id: 'claude-sonnet-4',
    name: 'Claude Sonnet 4 (via Copilot)',
    tier: 'premium',
    contextWindow: 200000,
    supportsTools: true,
    supportsStreaming: true,
    recommendedFor: ['advanced-coding']
  },
  {
    id: 'o1',
    name: 'O1 (via Copilot)',
    tier: 'premium',
    contextWindow: 200000,
    supportsTools: true,
    supportsStreaming: true,
    recommendedFor: ['reasoning', 'problem-solving']
  },
  {
    id: 'o3-mini',
    name: 'O3 Mini (via Copilot)',
    tier: 'flagship',
    contextWindow: 200000,
    supportsTools: true,
    supportsStreaming: true,
    recommendedFor: ['deep-reasoning', 'complex-coding']
  },
  {
    id: 'o4-mini',
    name: 'O4 Mini (via Copilot)',
    tier: 'flagship',
    contextWindow: 200000,
    supportsTools: true,
    supportsStreaming: true,
    recommendedFor: ['advanced-coding', 'reasoning']
  },
  {
    id: 'gemini-2.0-flash',
    name: 'Gemini 2.0 Flash (via Copilot)',
    tier: 'standard',
    contextWindow: 1000000,
    supportsTools: true,
    supportsStreaming: true,
    recommendedFor: ['speed', 'coding']
  },
  {
    id: 'gemini-2.5-pro',
    name: 'Gemini 2.5 Pro (via Copilot)',
    tier: 'premium',
    contextWindow: 2000000,
    supportsTools: true,
    supportsStreaming: true,
    recommendedFor: ['long-context', 'reasoning']
  }
];

// ============================================
// Azure OpenAI Models
// ============================================

const AZURE_OPENAI_MODELS: AIProviderModel[] = [
  {
    id: 'gpt-4.1',
    name: 'GPT-4.1 (Azure)',
    tier: 'premium',
    contextWindow: 1000000,
    supportsTools: true,
    supportsStreaming: true,
    recommendedFor: ['enterprise-coding', 'long-context'],
    isDefault: true,
    variants: ['none', 'minimal', 'low', 'medium', 'high']
  },
  {
    id: 'gpt-4.1-mini',
    name: 'GPT-4.1 Mini (Azure)',
    tier: 'basic',
    contextWindow: 1000000,
    supportsTools: true,
    supportsStreaming: true,
    recommendedFor: ['speed', 'validation']
  },
  {
    id: 'gpt-4.1-nano',
    name: 'GPT-4.1 Nano (Azure)',
    tier: 'basic',
    contextWindow: 1000000,
    supportsTools: true,
    supportsStreaming: true,
    recommendedFor: ['speed']
  },
  {
    id: 'gpt-4o',
    name: 'GPT-4o (Azure)',
    tier: 'standard',
    contextWindow: 128000,
    supportsTools: true,
    supportsStreaming: true,
    recommendedFor: ['coding', 'multimodal']
  },
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o Mini (Azure)',
    tier: 'basic',
    contextWindow: 128000,
    supportsTools: true,
    supportsStreaming: true,
    recommendedFor: ['quick-tasks']
  }
];

// ============================================
// AWS Bedrock Models
// ============================================

const AWS_BEDROCK_MODELS: AIProviderModel[] = [
  {
    id: 'claude-3.7-sonnet',
    name: 'Claude 3.7 Sonnet (AWS)',
    tier: 'premium',
    contextWindow: 200000,
    supportsTools: true,
    supportsStreaming: true,
    recommendedFor: ['enterprise-coding', 'reasoning'],
    isDefault: true
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
  },
  'github-copilot': {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    icon: 'Github',
    description: 'GitHub\'s AI coding assistant with access to latest models',
    models: GITHUB_COPILOT_MODELS,
    apiKeyEnvVar: 'GITHUB_TOKEN',
    authType: 'api-key',
    enabled: false
  },
  'azure-openai': {
    id: 'azure-openai',
    name: 'Azure OpenAI',
    icon: 'Cloud',
    description: 'Microsoft Azure\'s OpenAI deployment with enterprise features',
    models: AZURE_OPENAI_MODELS,
    apiKeyEnvVar: 'AZURE_OPENAI_API_KEY',
    baseUrl: 'AZURE_OPENAI_ENDPOINT',
    authType: 'azure-credentials',
    enabled: false
  },
  'aws-bedrock': {
    id: 'aws-bedrock',
    name: 'AWS Bedrock',
    icon: 'Server',
    description: 'Amazon Web Services Bedrock for Claude models',
    models: AWS_BEDROCK_MODELS,
    apiKeyEnvVar: 'AWS_ACCESS_KEY_ID',
    apiKeyEnvVar2: 'AWS_SECRET_ACCESS_KEY',
    regionEnvVar: 'AWS_REGION',
    authType: 'aws-credentials',
    enabled: false
  }
};

// ============================================
// Default Coding Agent Profiles
// ============================================

export const DEFAULT_CODING_AGENT_PROFILES: CodingAgentProfile[] = [
  {
    id: 'claude-sonnet',
    name: 'Claude 4.5 Sonnet',
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
    name: 'Claude 4.5 Opus',
    description: 'Highest quality for complex tasks',
    provider: 'claude',
    model: 'claude-opus-4.5-20251101',
    thinkingLevel: 'high',
    icon: 'Sparkles',
    tags: ['premium', 'complex']
  },
  {
    id: 'claude-3.7',
    name: 'Claude 3.7 Sonnet',
    description: 'Advanced Claude model with enhanced reasoning',
    provider: 'claude',
    model: 'claude-3.7-sonnet',
    thinkingLevel: 'high',
    icon: 'Sparkles',
    tags: ['advanced', 'reasoning']
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
    id: 'gpt-4.1',
    name: 'GPT-4.1',
    description: 'Latest OpenAI model with 1M token context',
    provider: 'openai',
    model: 'gpt-4.1',
    thinkingLevel: 'high',
    icon: 'Bot',
    tags: ['cutting-edge', 'large-context']
  },
  {
    id: 'o3-mini',
    name: 'o3-mini',
    description: 'Reasoning model for complex problem solving',
    provider: 'openai',
    model: 'o3-mini',
    thinkingLevel: 'high',
    icon: 'Bot',
    tags: ['reasoning', 'problem-solving']
  },
  {
    id: 'gemini-2.5-pro',
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
    id: 'llama-4-maverick',
    name: 'Llama 4 Maverick (Groq)',
    description: 'Latest Llama model with ultra-fast inference',
    provider: 'groq',
    model: 'llama-4-maverick-17b-128e-instruct',
    thinkingLevel: 'low',
    icon: 'Cpu',
    tags: ['fast', 'cutting-edge']
  },
  {
    id: 'github-copilot-gpt4o',
    name: 'GPT-4o (GitHub Copilot)',
    description: 'GPT-4o via GitHub Copilot subscription',
    provider: 'github-copilot',
    model: 'gpt-4o',
    icon: 'Github',
    tags: ['github', 'integrated']
  },
  {
    id: 'github-copilot-claude',
    name: 'Claude 3.7 Sonnet (GitHub Copilot)',
    description: 'Claude via GitHub Copilot subscription',
    provider: 'github-copilot',
    model: 'claude-3.7-sonnet',
    icon: 'Github',
    tags: ['github', 'reasoning']
  },
  {
    id: 'azure-gpt-4.1',
    name: 'GPT-4.1 (Azure OpenAI)',
    description: 'Enterprise OpenAI deployment on Azure',
    provider: 'azure-openai',
    model: 'gpt-4.1',
    thinkingLevel: 'high',
    icon: 'Cloud',
    tags: ['enterprise', 'azure']
  },
  {
    id: 'aws-claude',
    name: 'Claude 3.7 Sonnet (AWS Bedrock)',
    description: 'Claude hosted on AWS Bedrock',
    provider: 'aws-bedrock',
    model: 'claude-3.7-sonnet',
    thinkingLevel: 'high',
    icon: 'Server',
    tags: ['enterprise', 'aws']
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
