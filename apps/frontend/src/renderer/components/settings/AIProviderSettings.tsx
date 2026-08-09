import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Brain,
  Bot,
  Sparkles,
  Globe,
  Zap,
  Cpu,
  Download,
  Key,
  Check,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  RotateCcw
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { AI_PROVIDERS, DEFAULT_CODING_AGENT_PROFILES } from '../../../shared/constants';
import { useSettingsStore, saveSettings } from '../../stores/settings-store';
import { SettingsSection } from './SettingsSection';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog';
import type {
  AIProvider,
  CodingAgentProfile,
  AIProviderModel
} from '../../../shared/types';
import { Badge } from '../ui/badge';

/**
 * Icon mapping for AI providers
 */
const iconMap: Record<string, React.ElementType> = {
  Brain,
  Bot,
  Sparkles,
  Globe,
  Zap,
  Cpu,
  Download
};

/**
 * AI Provider Settings component
 * Manages multiple AI providers and custom agent profiles
 */
export function AIProviderSettings() {
  const { t } = useTranslation('settings');
  const settings = useSettingsStore((state) => state.settings);
  const [expandedProviders, setExpandedProviders] = useState<Record<string, boolean>>({});
  const [customProfiles, setCustomProfiles] = useState<CodingAgentProfile[]>(
    settings.customAIProfiles || []
  );
  const [showAddProfile, setShowAddProfile] = useState(false);
  const [newProfile, setNewProfile] = useState<Partial<CodingAgentProfile>>({
    provider: 'claude',
    model: '',
    thinkingLevel: 'medium'
  });

  const activeProvider = settings.activeAIProvider || 'claude';
  const selectedProfile = settings.selectedAIProfile || 'claude-sonnet';

  /**
   * Toggle provider expansion
   */
  const toggleProvider = (providerId: string) => {
    setExpandedProviders(prev => ({
      ...prev,
      [providerId]: !prev[providerId]
    }));
  };

  /**
   * Select active provider
   */
  const handleSelectProvider = async (providerId: AIProvider) => {
    await saveSettings({ activeAIProvider: providerId });
  };

  /**
   * Select agent profile
   */
  const handleSelectProfile = async (profileId: string) => {
    await saveSettings({ selectedAIProfile: profileId });
  };

  /**
   * Save API key for a provider
   */
  const handleSaveApiKey = async (providerId: AIProvider, apiKey: string) => {
    const provider = AI_PROVIDERS[providerId];
    if (!provider) return;

    const settingsKey = `global${provider.id.charAt(0).toUpperCase() + provider.id.slice(1)}ApiKey`;
    await saveSettings({ [settingsKey]: apiKey });
  };

  /**
   * Enable/disable a provider
   */
  const handleToggleProvider = async (providerId: AIProvider, enabled: boolean) => {
    const updatedProviders = settings.customAIProfiles?.map(p =>
      p.provider === providerId ? { ...p, providerSettings: { ...p.providerSettings, enabled } } : p
    );
    await saveSettings({ customAIProfiles: updatedProviders });
  };

  /**
   * Add custom agent profile
   */
  const handleAddProfile = async () => {
    if (!newProfile.name || !newProfile.model) return;

    const profile: CodingAgentProfile = {
      id: `custom-${Date.now()}`,
      name: newProfile.name,
      description: newProfile.description || 'Custom agent profile',
      provider: newProfile.provider || 'claude',
      model: newProfile.model,
      thinkingLevel: newProfile.thinkingLevel,
      icon: 'Bot',
      tags: ['custom']
    };

    const updatedProfiles = [...customProfiles, profile];
    await saveSettings({ customAIProfiles: updatedProfiles });
    setCustomProfiles(updatedProfiles);
    setNewProfile({ provider: 'claude', model: '', thinkingLevel: 'medium' });
    setShowAddProfile(false);
  };

  /**
   * Delete custom profile
   */
  const handleDeleteProfile = async (profileId: string) => {
    const updatedProfiles = customProfiles.filter(p => p.id !== profileId);
    await saveSettings({ customAIProfiles: updatedProfiles });
    setCustomProfiles(updatedProfiles);
  };

  /**
   * Get all available models for a provider
   */
  const getProviderModels = (providerId: AIProvider): AIProviderModel[] => {
    return AI_PROVIDERS[providerId]?.models || [];
  };

  /**
   * Get default model for a provider
   */
  const getDefaultModel = (providerId: AIProvider): string => {
    const models = getProviderModels(providerId);
    return models.find(m => m.isDefault)?.id || models[0]?.id || '';
  };

  /**
   * Get API key value for a provider
   */
  const getProviderApiKey = (providerId: AIProvider): string => {
    const provider = AI_PROVIDERS[providerId];
    const settingsKey = `global${provider.id.charAt(0).toUpperCase() + provider.id.slice(1)}ApiKey`;
    return (settings as any)[settingsKey] || '';
  };

  /**
   * Render a provider card
   */
  const renderProviderCard = (provider: any) => {
    const isExpanded = expandedProviders[provider.id];
    const isSelected = activeProvider === provider.id;
    const Icon = iconMap[provider.icon] || Bot;
    const apiKey = getProviderApiKey(provider.id);

    return (
      <div
        key={provider.id}
        className={cn(
          'border rounded-lg transition-all',
          isSelected ? 'border-primary bg-primary/5' : 'border-border bg-card'
        )}
      >
        {/* Provider Header */}
        <button
          type="button"
          onClick={() => toggleProvider(provider.id)}
          className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className={cn(
              'flex h-10 w-10 items-center justify-center rounded-lg shrink-0',
              isSelected ? 'bg-primary/10' : 'bg-muted'
            )}>
              <Icon className={cn(
                'h-5 w-5',
                isSelected ? 'text-primary' : 'text-muted-foreground'
              )} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-sm text-foreground">{provider.name}</h3>
                {apiKey && (
                  <Check className="h-3.5 w-3.5 text-green-500" />
                )}
              </div>
              <p className="text-xs text-muted-foreground truncate">
                {provider.description}
              </p>
            </div>
          </div>
          {isExpanded ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
          )}
        </button>

        {/* Provider Details */}
        {isExpanded && (
          <div className="border-t border-border p-4 space-y-4">
            {/* API Key Input */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">API Key</Label>
              <div className="flex gap-2">
                <Input
                  type="password"
                  placeholder={`Enter ${provider.name} API key`}
                  value={apiKey}
                  onChange={(e) => handleSaveApiKey(provider.id, e.target.value)}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant={isSelected ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleSelectProvider(provider.id)}
                >
                  {isSelected ? 'Active' : 'Select'}
                </Button>
              </div>
            </div>

            {/* Available Models */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Available Models</Label>
              <div className="space-y-1">
                {provider.models.map((model: AIProviderModel) => (
                  <div
                    key={model.id}
                    className="flex items-center justify-between text-xs p-2 rounded bg-muted/30"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-foreground truncate">
                        {model.name}
                      </div>
                      <div className="text-muted-foreground">
                        {model.contextWindow.toLocaleString()} tokens
                      </div>
                    </div>
                    <Badge variant="outline" className="ml-2 shrink-0">
                      {model.tier}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  /**
   * Render an agent profile card
   */
  const renderProfileCard = (profile: CodingAgentProfile) => {
    const isSelected = selectedProfile === profile.id;
    const provider = AI_PROVIDERS[profile.provider];
    const Icon = iconMap[profile.icon || 'Bot'] || Bot;
    const model = provider?.models.find(m => m.id === profile.model);

    return (
      <button
        key={profile.id}
        onClick={() => handleSelectProfile(profile.id)}
        className={cn(
          'relative w-full rounded-lg border p-4 text-left transition-all duration-200',
          'hover:border-primary/50 hover:shadow-sm',
          isSelected
            ? 'border-primary bg-primary/5'
            : 'border-border bg-card'
        )}
      >
        {/* Selected indicator */}
        {isSelected && (
          <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
            <Check className="h-3 w-3 text-primary-foreground" />
          </div>
        )}

        {/* Profile content */}
        <div className="flex items-start gap-3">
          <div
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-lg shrink-0',
              isSelected ? 'bg-primary/10' : 'bg-muted'
            )}
          >
            <Icon
              className={cn(
                'h-5 w-5',
                isSelected ? 'text-primary' : 'text-muted-foreground'
              )}
            />
          </div>

          <div className="flex-1 min-w-0 pr-6">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-sm text-foreground">{profile.name}</h3>
              {profile.isDefault && (
                <Badge variant="secondary" className="text-[10px]">Default</Badge>
              )}
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
              {profile.description}
            </p>

            {/* Provider and model info */}
            <div className="mt-2 flex flex-wrap gap-1.5">
              <span className="inline-flex items-center rounded bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                {provider?.name}
              </span>
              {model && (
                <span className="inline-flex items-center rounded bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                  {model.name}
                </span>
              )}
              {profile.thinkingLevel && (
                <span className="inline-flex items-center rounded bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                  {profile.thinkingLevel}
                </span>
              )}
            </div>

            {/* Tags */}
            {profile.tags && profile.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {profile.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="text-[10px] h-5 px-1.5">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Delete custom profiles */}
          {profile.tags?.includes('custom') && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteProfile(profile.id);
              }}
              className="absolute bottom-3 right-3 text-muted-foreground hover:text-destructive transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </button>
    );
  };

  return (
    <SettingsSection
      title="AI Providers"
      description="Manage multiple AI providers and coding agent profiles"
    >
      <div className="space-y-6">
        {/* Providers Section */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-3">AI Providers</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {Object.values(AI_PROVIDERS).map(renderProviderCard)}
          </div>
        </div>

        {/* Agent Profiles Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-foreground">Agent Profiles</h3>
            <Dialog open={showAddProfile} onOpenChange={setShowAddProfile}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Profile
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Custom Agent Profile</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Profile Name</Label>
                    <Input
                      placeholder="e.g., My Fast Coder"
                      value={newProfile.name || ''}
                      onChange={(e) => setNewProfile({ ...newProfile, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Provider</Label>
                    <Select
                      value={newProfile.provider}
                      onValueChange={(value) => {
                        setNewProfile({ 
                          ...newProfile, 
                          provider: value as AIProvider,
                          model: getDefaultModel(value as AIProvider)
                        });
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(AI_PROVIDERS).map(provider => (
                          <SelectItem key={provider.id} value={provider.id}>
                            {provider.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {newProfile.provider && (
                    <div className="space-y-2">
                      <Label>Model</Label>
                      <Select
                        value={newProfile.model}
                        onValueChange={(value) => setNewProfile({ ...newProfile, model: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {getProviderModels(newProfile.provider as AIProvider).map(model => (
                            <SelectItem key={model.id} value={model.id}>
                              {model.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label>Thinking Level</Label>
                    <Select
                      value={newProfile.thinkingLevel}
                      onValueChange={(value) => setNewProfile({ ...newProfile, thinkingLevel: value as any })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="ultrathink">Ultra Think</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Input
                      placeholder="Brief description of this profile"
                      value={newProfile.description || ''}
                      onChange={(e) => setNewProfile({ ...newProfile, description: e.target.value })}
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline" onClick={() => setShowAddProfile(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddProfile}>
                      Add Profile
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-3">
            {[...DEFAULT_CODING_AGENT_PROFILES, ...customProfiles].map(renderProfileCard)}
          </div>
        </div>
      </div>
    </SettingsSection>
  );
}
