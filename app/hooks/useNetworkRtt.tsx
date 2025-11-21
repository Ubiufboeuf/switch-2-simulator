import { useState, useEffect } from 'react'

export function useNetworkRtt () {
  // Valor inicial seguro
  const [rtt, setRtt] = useState<number>(0)

  useEffect(() => {
    const conn = navigator.connection
    
    if (!conn) {
      console.warn('Tu navegador no soporta navigator.connection')
      console.warn('El icono de WiFi quedará en gris por no poder manejar el RTT de conexión')
      return
    }

    // Función para actualizar estado
    const updateRtt = () => {
      // A veces el navegador reporta 0 si no sabe, podemos filtrar eso si quieres
      setRtt(conn.rtt)
    }

    // Setear valor inicial
    updateRtt()

    // Escuchar cambios
    conn.addEventListener('change', updateRtt)

    return () => {
      conn.removeEventListener('change', updateRtt)
    }
  }, [])

  return rtt
}

// Uso en tu componente:
// const rtt = useNetworkRtt();
// return <div>Ping: {rtt} ms</div>
