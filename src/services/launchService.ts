import { get, ref } from "firebase/database";
import { database } from "../firebase/firebase";
import type { LaunchMetadata, LaunchRecord } from "../types/Launch";

export async function obtenerLanzamientos(): Promise<LaunchRecord[]> {
  const referencia = ref(database, "launches");
  const snapshot = await get(referencia);

  if (snapshot.exists()) {
    const val = snapshot.val();
    return Array.isArray(val) ? val : (Object.values(val) as LaunchRecord[]);
  }
  return [];
}

export async function obtenerMetadata(): Promise<LaunchMetadata | null> {
  const referencia = ref(database, "metadata");
  const snapshot = await get(referencia);

  if (snapshot.exists()) {
    return snapshot.val() as LaunchMetadata;
  }
  return null;
}