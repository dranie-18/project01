import { supabase } from '../lib/supabase';

export interface Location {
  id: string;
  name: string;
  type: 'provinsi' | 'kota' | 'kecamatan' | 'kelurahan';
  parent_id?: string;
  slug: string;
  description?: string;
  is_active?: boolean;
  property_count?: number;
  latitude?: number;
  longitude?: number;
  created_at: string;
  updated_at: string;
}

class LocationService {
  async getProvinces(): Promise<{id: string, name: string}[]> {
    try {
      const { data, error } = await supabase
        .from('locations')
        .select('id, name')
        .eq('type', 'provinsi')
        .eq('is_active', true)
        .order('name');

      if (error) {
        console.error('Error fetching provinces:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Failed to fetch provinces:', error);
      throw error;
    }
  }

  async getCitiesByProvince(provinceId: string): Promise<{id: string, name: string}[]> {
    try {
      const { data, error } = await supabase
        .from('locations')
        .select('id, name')
        .eq('type', 'kota')
        .eq('parent_id', provinceId)
        .eq('is_active', true)
        .order('name');

      if (error) {
        console.error('Error fetching cities:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Failed to fetch cities:', error);
      throw error;
    }
  }

  async getDistrictsByCity(cityId: string): Promise<{id: string, name: string}[]> {
    try {
      const { data, error } = await supabase
        .from('locations')
        .select('id, name')
        .eq('type', 'kecamatan')
        .eq('parent_id', cityId)
        .eq('is_active', true)
        .order('name');

      if (error) {
        console.error('Error fetching districts:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Failed to fetch districts:', error);
      throw error;
    }
  }

  async getLocationById(id: string): Promise<Location | null> {
    try {
      const { data, error } = await supabase
        .from('locations')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching location:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Failed to fetch location:', error);
      throw error;
    }
  }

  async searchLocations(query: string, type?: string): Promise<Location[]> {
    try {
      let queryBuilder = supabase
        .from('locations')
        .select('*')
        .eq('is_active', true)
        .ilike('name', `%${query}%`)
        .order('name')
        .limit(9);

      if (type) {
        queryBuilder = queryBuilder.eq('type', type);
      }

      const { data, error } = await queryBuilder;

      if (error) {
        console.error('Error searching locations:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Failed to search locations:', error);
      throw error;
    }
  }

  async getAllLocations(filters?: {
    isActive?: boolean;
    search?: string;
    type?: string;
  }, orderBy?: { column: string; ascending: boolean }, limit?: number): Promise<Location[]> {
    try {
      let queryBuilder = supabase
        .from('locations')
        .select('*, image_url'); // MODIFIED LINE: Added image_url to select

      if (filters?.isActive !== undefined) {
        queryBuilder = queryBuilder.eq('is_active', filters.isActive);
      }

      if (filters?.search) {
        queryBuilder = queryBuilder.ilike('name', `%${filters.search}%`);
      }

      if (filters?.type) {
        queryBuilder = queryBuilder.eq('type', filters.type);
      }

      // Add orderBy clause
      if (orderBy) {
        queryBuilder = queryBuilder.order(orderBy.column, { ascending: orderBy.ascending });
      } else {
        queryBuilder = queryBuilder.order('name');
      }

      // Add limit clause
      if (limit) {
        queryBuilder = queryBuilder.limit(limit);
      }

      const { data, error } = await queryBuilder;

      if (error) {
        console.error('Error fetching all locations:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Failed to fetch all locations:', error);
      throw error;
    }
  }
}

export const locationService = new LocationService();