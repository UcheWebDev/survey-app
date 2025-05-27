export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      real_estate_surveys: {
        Row: {
          biggest_challenges: string[] | null
          communication_importance: string | null
          created_at: string
          id: string
          listing_methods: string[] | null
          platform_interest: string | null
          primary_role: string | null
          seo_importance: string | null
          service_providers_value: string | null
          subscription_interest: string | null
          valuable_features: string[] | null
        }
        Insert: {
          biggest_challenges?: string[] | null
          communication_importance?: string | null
          created_at?: string
          id?: string
          listing_methods?: string[] | null
          platform_interest?: string | null
          primary_role?: string | null
          seo_importance?: string | null
          service_providers_value?: string | null
          subscription_interest?: string | null
          valuable_features?: string[] | null
        }
        Update: {
          biggest_challenges?: string[] | null
          communication_importance?: string | null
          created_at?: string
          id?: string
          listing_methods?: string[] | null
          platform_interest?: string | null
          primary_role?: string | null
          seo_importance?: string | null
          service_providers_value?: string | null
          subscription_interest?: string | null
          valuable_features?: string[] | null
        }
        Relationships: []
      }
      service_provider_surveys: {
        Row: {
          biggest_challenges: string[] | null
          client_acquisition: string[] | null
          created_at: string
          id: string
          mobile_importance: string | null
          payment_willingness: string | null
          platform_interest: string | null
          preferred_payments: string[] | null
          service_type: string[] | null
          valuable_features: string[] | null
          verification_importance: string | null
        }
        Insert: {
          biggest_challenges?: string[] | null
          client_acquisition?: string[] | null
          created_at?: string
          id?: string
          mobile_importance?: string | null
          payment_willingness?: string | null
          platform_interest?: string | null
          preferred_payments?: string[] | null
          service_type?: string[] | null
          valuable_features?: string[] | null
          verification_importance?: string | null
        }
        Update: {
          biggest_challenges?: string[] | null
          client_acquisition?: string[] | null
          created_at?: string
          id?: string
          mobile_importance?: string | null
          payment_willingness?: string | null
          platform_interest?: string | null
          preferred_payments?: string[] | null
          service_type?: string[] | null
          valuable_features?: string[] | null
          verification_importance?: string | null
        }
        Relationships: []
      }
      user_surveys: {
        Row: {
          created_at: string
          current_platforms: string | null
          id: string
          important_filters: string[] | null
          main_challenges: string[] | null
          mobile_importance: string | null
          preferred_communication: string[] | null
          primary_reason: string | null
          search_frequency: string | null
          single_platform_useful: string | null
          struggled_with_providers: string | null
          useful_features: string[] | null
        }
        Insert: {
          created_at?: string
          current_platforms?: string | null
          id?: string
          important_filters?: string[] | null
          main_challenges?: string[] | null
          mobile_importance?: string | null
          preferred_communication?: string[] | null
          primary_reason?: string | null
          search_frequency?: string | null
          single_platform_useful?: string | null
          struggled_with_providers?: string | null
          useful_features?: string[] | null
        }
        Update: {
          created_at?: string
          current_platforms?: string | null
          id?: string
          important_filters?: string[] | null
          main_challenges?: string[] | null
          mobile_importance?: string | null
          preferred_communication?: string[] | null
          primary_reason?: string | null
          search_frequency?: string | null
          single_platform_useful?: string | null
          struggled_with_providers?: string | null
          useful_features?: string[] | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      survey_type: "user" | "service_provider" | "real_estate"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      survey_type: ["user", "service_provider", "real_estate"],
    },
  },
} as const
