export interface LaunchRecord {
  id: string;
  mission_name: string;
  net: string;
  provider_name: string;
  status_name: "Success" | "Failure" | "Go for Launch" | string;
  country_code: string;
  location_name: string;
  payload_capacity_kg: number;
  total_launch_count: number;
}

export interface LaunchMetadata {
  source: string;
  total_records: number;
  generated_at: string;
}