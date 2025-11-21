// app/global.d.ts

export {} // Asegura que este archivo se trate como un módulo si es necesario

declare global {
  // Definimos la forma del objeto connection
  interface NetworkInformation extends EventTarget {
    readonly effectiveType: 'slow-2g' | '2g' | '3g' | '4g';
    readonly downlink: number;
    readonly rtt: number;
    readonly saveData: boolean;
    onchange: ((this: NetworkInformation, ev: Event) => unknown) | null;
  }

  // Extendemos la interfaz Navigator existente
  interface Navigator {
    readonly connection?: NetworkInformation;
    readonly mozConnection?: NetworkInformation;
    readonly webkitConnection?: NetworkInformation;
  }
}
