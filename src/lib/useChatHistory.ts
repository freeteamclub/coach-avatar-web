import { useState, useEffect, useCallback } from 'react';
import { supabase } from './supabase';

interface ChatMessage {
  id?: string;
  role: 'user' | 'assistant';
  content: string;
  created_at?: string;
}

interface UseChatHistoryReturn {
  messages: ChatMessage[];
  loading: boolean;
  error: string | null;
  addMessage: (role: 'user' | 'assistant', content: string) => Promise<void>;
  clearHistory: () => Promise<void>;
  refreshHistory: () => Promise<void>;
}

export function useChatHistory(avatarId: string | null): UseChatHistoryReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch chat history
  const fetchHistory = useCallback(async () => {
    if (!avatarId) {
      setMessages([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('avatar_id', avatarId)
        .order('created_at', { ascending: true });

      if (fetchError) throw fetchError;

      setMessages(data || []);
    } catch (err: any) {
      console.error('Error fetching chat history:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [avatarId]);

  // Load history on mount and when avatarId changes
  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  // Add a new message
  const addMessage = useCallback(async (role: 'user' | 'assistant', content: string) => {
    if (!avatarId) return;

    try {
      const { data, error: insertError } = await supabase
        .from('chat_messages')
        .insert({
          avatar_id: avatarId,
          role,
          content,
        })
        .select()
        .single();

      if (insertError) throw insertError;

      // Add to local state
      if (data) {
        setMessages(prev => [...prev, data]);
      }
    } catch (err: any) {
      console.error('Error adding message:', err);
      setError(err.message);
    }
  }, [avatarId]);

  // Clear all history for this avatar
  const clearHistory = useCallback(async () => {
    if (!avatarId) return;

    try {
      const { error: deleteError } = await supabase
        .from('chat_messages')
        .delete()
        .eq('avatar_id', avatarId);

      if (deleteError) throw deleteError;

      setMessages([]);
    } catch (err: any) {
      console.error('Error clearing chat history:', err);
      setError(err.message);
    }
  }, [avatarId]);

  // Refresh history
  const refreshHistory = useCallback(async () => {
    await fetchHistory();
  }, [fetchHistory]);

  return {
    messages,
    loading,
    error,
    addMessage,
    clearHistory,
    refreshHistory,
  };
}
