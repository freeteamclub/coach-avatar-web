import { useState, useEffect, useCallback } from 'react';
import { supabase } from './supabase';

export interface TrainingMaterial {
  id?: string;
  avatar_id?: string;
  type: 'document' | 'video' | 'link';
  name: string;
  url?: string;
  path?: string;
  size?: string;
  created_at?: string;
}

interface UseTrainingMaterialsReturn {
  materials: TrainingMaterial[];
  loading: boolean;
  error: string | null;
  addMaterial: (material: Omit<TrainingMaterial, 'id' | 'avatar_id' | 'created_at'>) => Promise<TrainingMaterial | null>;
  removeMaterial: (id: string) => Promise<boolean>;
  refreshMaterials: () => Promise<void>;
}

export function useTrainingMaterials(avatarId: string | null): UseTrainingMaterialsReturn {
  const [materials, setMaterials] = useState<TrainingMaterial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch materials when avatarId changes
  useEffect(() => {
    const fetchMaterials = async () => {
      if (!avatarId) {
        setMaterials([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);

      try {
        const { data, error: fetchError } = await supabase
          .from('training_materials')
          .select('*')
          .eq('avatar_id', avatarId)
          .order('created_at', { ascending: true });

        if (fetchError) {
          throw fetchError;
        }
        setMaterials(data || []);
      } catch (err: any) {
        console.error('Error fetching training materials:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, [avatarId]);

  // Add a new material
  const addMaterial = useCallback(async (
    material: Omit<TrainingMaterial, 'id' | 'avatar_id' | 'created_at'>
  ): Promise<TrainingMaterial | null> => {
    if (!avatarId) {
      return null;
    }

    try {
      const { data, error: insertError } = await supabase
        .from('training_materials')
        .insert({
          avatar_id: avatarId,
          type: material.type,
          name: material.name,
          url: material.url || null,
          path: material.path || null,
          size: material.size || null,
        })
        .select()
        .single();

      if (insertError) {
        throw insertError;
      }

      if (data) {
        setMaterials(prev => [...prev, data]);
        return data;
      }
      return null;
    } catch (err: any) {
      console.error('Error adding training material:', err);
      setError(err.message);
      return null;
    }
  }, [avatarId]);

  // Remove a material
  const removeMaterial = useCallback(async (id: string): Promise<boolean> => {
    if (!avatarId) return false;

    try {
      const { error: deleteError } = await supabase
        .from('training_materials')
        .delete()
        .eq('id', id)
        .eq('avatar_id', avatarId);

      if (deleteError) throw deleteError;

      setMaterials(prev => prev.filter(m => m.id !== id));
      return true;
    } catch (err: any) {
      console.error('Error removing training material:', err);
      setError(err.message);
      return false;
    }
  }, [avatarId]);

  // Refresh
  const refreshMaterials = useCallback(async () => {
    if (!avatarId) return;
    
    setLoading(true);
    try {
      const { data, error: fetchError } = await supabase
        .from('training_materials')
        .select('*')
        .eq('avatar_id', avatarId)
        .order('created_at', { ascending: true });

      if (fetchError) throw fetchError;
      setMaterials(data || []);
    } catch (err: any) {
      console.error('Error refreshing training materials:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [avatarId]);

  return {
    materials,
    loading,
    error,
    addMaterial,
    removeMaterial,
    refreshMaterials,
  };
}
