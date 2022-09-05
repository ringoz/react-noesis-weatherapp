export type UnitType = "metric" | "imperial";

export interface SettingsModel {
  unit: UnitType;
}

export const defaultSettings: SettingsModel = {
  unit: "metric",
};
