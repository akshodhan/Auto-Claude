/**
 * AI Provider types for multi-agent support
 */

/**
 * Supported AI providers
 */
export type AIProvider = 'claude' | 'openai' | 'google' | 'openrouter' | 'ollama' | 'deepseek' | 'anthropic' | 'groq' | 'github-copilot' | 'azure-openai' | 'aws-bedrock';

/**
 * Model configuration for a specific provider
 */
export interface AIProviderModel {
  /** Model identifier (e.g., 'gpt-4', 'claude-3-opus') */
  id: string;
  /** Display name for the model */
  name: string;
  /** Model capability tier */
  tier: 'basic' | 'standard' | 'premium' | 'flagship';
  /** Maximum context window (tokens) */
  contextWindow: number;
  /** Whether model supports function calling/tools */
  supportsTools: boolean;
  /** Whether model supports streaming */
  supportsStreaming: boolean;
  /** Recommended for which tasks */
  recommendedFor: string[];
  /** Whether this is the default model for the provider */
  isDefault?: boolean;
  /** Available variants for this model (e.g., 'low', 'medium', 'high') */
  variants?: string[];
  /** Whether model supports reasoning/thinking */
  supportsReasoning?: boolean;
}

/**
 * AI Provider configuration
 */
export interface AIProviderConfig {
  /** Provider identifier */
  id: AIProvider;
  /** Display name */
  name: string;
  /** Provider logo/icon name (Lucide icon) */
  icon: string;
  /** Description */
  description: string;
  /** Available models for this provider */
  models: AIProviderModel[];
  /** API key environment variable name */
  apiKeyEnvVar: string;
  /** Secondary API key environment variable (for AWS) */
  apiKeyEnvVar2?: string;
  /** Region/project ID (for AWS/Azure) */
  regionEnvVar?: string;
  /** Base API URL (for self-hosted/custom endpoints) */
  baseUrl?: string;
  /** Authentication type */
  authType: 'api-key' | 'oauth' | 'bearer' | 'aws-credentials' | 'azure-credentials';
  /** Whether provider is enabled/configured */
  enabled: boolean;
  /** Configuration timestamp */
  configuredAt?: Date;
  /** Additional provider-specific settings */
  settings?: Record<string, any>;
}

/**
 * Provider-specific settings stored in AppSettings
 */
export interface AIProviderSettings {
  /** All configured providers */
  providers: AIProviderConfig[];
  /** Currently active provider */
  activeProvider: AIProvider;
  /** Selected model for each provider */
  selectedModels: Record<AIProvider, string>;
  /** Default thinking level for each provider (if supported) */
  thinkingLevels?: Record<AIProvider, 'none' | 'low' | 'medium' | 'high' | 'ultrathink'>;
}

/**
 * Coding agent profile (preset configuration combining provider + model + settings)
 */
export interface CodingAgentProfile {
  /** Profile ID */
  id: string;
  /** Profile name */
  name: string;
  /** Description */
  description: string;
  /** AI provider */
  provider: AIProvider;
  /** Model ID */
  model: string;
  /** Thinking level (if supported) */
  thinkingLevel?: 'none' | 'low' | 'medium' | 'high' | 'ultrathink';
  /** Icon */
  icon?: string;
  /** Tags for categorization */
  tags?: string[];
  /** Whether this is the default profile */
  isDefault?: boolean;
  /** Provider-specific settings overrides */
  providerSettings?: Record<string, any>;
}
