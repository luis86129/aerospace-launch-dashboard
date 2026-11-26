import { useEffect, useState } from "react";
import { obtenerLanzamientos, obtenerMetadata } from "../services/launchService";
import type { LaunchMetadata, LaunchRecord } from "../types/Launch";

export default function useFetchLaunches() {
  const [launches, setLaunches] = useState<LaunchRecord[]>([]);
  const [metadata, setMetadata] = useState<LaunchMetadata | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function cargarDatos() {
      try {
        setLoading(true);
        setError(null);

        const [recordsData, metaData] = await Promise.all([
          obtenerLanzamientos(),
          obtenerMetadata(),
        ]);

        if (isMounted) {
          setLaunches(recordsData);
          setMetadata(metaData);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error
              ? err.message
              : "Error al conectar con Firebase Realtime Database.",
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    cargarDatos();

    return () => {
      isMounted = false;
    };
  }, []);

  return { launches, metadata, loading, error };
}