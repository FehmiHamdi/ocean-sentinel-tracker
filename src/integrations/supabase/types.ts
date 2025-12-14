export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      alerts: {
        Row: {
          beach_id: string | null
          created_at: string
          id: string
          is_read: boolean
          message: string
          severity: Database["public"]["Enums"]["threat_level"]
          title: string
          turtle_id: string | null
          type: string
        }
        Insert: {
          beach_id?: string | null
          created_at?: string
          id?: string
          is_read?: boolean
          message: string
          severity?: Database["public"]["Enums"]["threat_level"]
          title: string
          turtle_id?: string | null
          type?: string
        }
        Update: {
          beach_id?: string | null
          created_at?: string
          id?: string
          is_read?: boolean
          message?: string
          severity?: Database["public"]["Enums"]["threat_level"]
          title?: string
          turtle_id?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "alerts_beach_id_fkey"
            columns: ["beach_id"]
            isOneToOne: false
            referencedRelation: "beaches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "alerts_turtle_id_fkey"
            columns: ["turtle_id"]
            isOneToOne: false
            referencedRelation: "turtles"
            referencedColumns: ["id"]
          },
        ]
      }
      beaches: {
        Row: {
          country: string
          created_at: string
          id: string
          last_patrol: string | null
          latitude: number
          longitude: number
          name: string
          nests_count: number
          photo_url: string | null
          region: string | null
          threat_level: Database["public"]["Enums"]["threat_level"]
          threats: string[] | null
          updated_at: string
          volunteers_count: number
        }
        Insert: {
          country: string
          created_at?: string
          id?: string
          last_patrol?: string | null
          latitude: number
          longitude: number
          name: string
          nests_count?: number
          photo_url?: string | null
          region?: string | null
          threat_level?: Database["public"]["Enums"]["threat_level"]
          threats?: string[] | null
          updated_at?: string
          volunteers_count?: number
        }
        Update: {
          country?: string
          created_at?: string
          id?: string
          last_patrol?: string | null
          latitude?: number
          longitude?: number
          name?: string
          nests_count?: number
          photo_url?: string | null
          region?: string | null
          threat_level?: Database["public"]["Enums"]["threat_level"]
          threats?: string[] | null
          updated_at?: string
          volunteers_count?: number
        }
        Relationships: []
      }
      nests: {
        Row: {
          actual_hatch_date: string | null
          beach_id: string
          created_at: string
          eggs_count: number
          expected_hatch_date: string | null
          hatched_count: number | null
          id: string
          laid_date: string
          notes: string | null
          status: string
          turtle_id: string | null
          updated_at: string
        }
        Insert: {
          actual_hatch_date?: string | null
          beach_id: string
          created_at?: string
          eggs_count?: number
          expected_hatch_date?: string | null
          hatched_count?: number | null
          id?: string
          laid_date: string
          notes?: string | null
          status?: string
          turtle_id?: string | null
          updated_at?: string
        }
        Update: {
          actual_hatch_date?: string | null
          beach_id?: string
          created_at?: string
          eggs_count?: number
          expected_hatch_date?: string | null
          hatched_count?: number | null
          id?: string
          laid_date?: string
          notes?: string | null
          status?: string
          turtle_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "nests_beach_id_fkey"
            columns: ["beach_id"]
            isOneToOne: false
            referencedRelation: "beaches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nests_turtle_id_fkey"
            columns: ["turtle_id"]
            isOneToOne: false
            referencedRelation: "turtles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      stats: {
        Row: {
          active_turtles: number
          active_volunteers: number
          created_at: string
          hatched_eggs: number
          id: string
          protected_beaches: number
          stat_date: string
          total_nests: number
          total_turtles: number
        }
        Insert: {
          active_turtles?: number
          active_volunteers?: number
          created_at?: string
          hatched_eggs?: number
          id?: string
          protected_beaches?: number
          stat_date?: string
          total_nests?: number
          total_turtles?: number
        }
        Update: {
          active_turtles?: number
          active_volunteers?: number
          created_at?: string
          hatched_eggs?: number
          id?: string
          protected_beaches?: number
          stat_date?: string
          total_nests?: number
          total_turtles?: number
        }
        Relationships: []
      }
      turtle_locations: {
        Row: {
          depth: number | null
          id: string
          latitude: number
          longitude: number
          recorded_at: string
          speed: number | null
          temperature: number | null
          turtle_id: string
        }
        Insert: {
          depth?: number | null
          id?: string
          latitude: number
          longitude: number
          recorded_at?: string
          speed?: number | null
          temperature?: number | null
          turtle_id: string
        }
        Update: {
          depth?: number | null
          id?: string
          latitude?: number
          longitude?: number
          recorded_at?: string
          speed?: number | null
          temperature?: number | null
          turtle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "turtle_locations_turtle_id_fkey"
            columns: ["turtle_id"]
            isOneToOne: false
            referencedRelation: "turtles"
            referencedColumns: ["id"]
          },
        ]
      }
      turtles: {
        Row: {
          age: number | null
          created_at: string
          depth: number | null
          health_status: string | null
          id: string
          last_latitude: number | null
          last_longitude: number | null
          last_seen: string | null
          length: number | null
          name: string
          photo_url: string | null
          species: string
          speed: number | null
          status: Database["public"]["Enums"]["turtle_status"]
          tag_id: string
          temperature: number | null
          threat_level: Database["public"]["Enums"]["threat_level"]
          updated_at: string
          weight: number | null
        }
        Insert: {
          age?: number | null
          created_at?: string
          depth?: number | null
          health_status?: string | null
          id?: string
          last_latitude?: number | null
          last_longitude?: number | null
          last_seen?: string | null
          length?: number | null
          name: string
          photo_url?: string | null
          species: string
          speed?: number | null
          status?: Database["public"]["Enums"]["turtle_status"]
          tag_id: string
          temperature?: number | null
          threat_level?: Database["public"]["Enums"]["threat_level"]
          updated_at?: string
          weight?: number | null
        }
        Update: {
          age?: number | null
          created_at?: string
          depth?: number | null
          health_status?: string | null
          id?: string
          last_latitude?: number | null
          last_longitude?: number | null
          last_seen?: string | null
          length?: number | null
          name?: string
          photo_url?: string | null
          species?: string
          speed?: number | null
          status?: Database["public"]["Enums"]["turtle_status"]
          tag_id?: string
          temperature?: number | null
          threat_level?: Database["public"]["Enums"]["threat_level"]
          updated_at?: string
          weight?: number | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      threat_level: "low" | "medium" | "high" | "critical"
      turtle_status: "active" | "missing" | "released" | "deceased"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      threat_level: ["low", "medium", "high", "critical"],
      turtle_status: ["active", "missing", "released", "deceased"],
    },
  },
} as const
