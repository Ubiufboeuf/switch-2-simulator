// app/global.d.ts

export {}

declare global {
  // --- Network Information API (Tu código existente) ---
  interface NetworkInformation extends EventTarget {
    readonly effectiveType: 'slow-2g' | '2g' | '3g' | '4g';
    readonly downlink: number;
    readonly rtt: number;
    readonly saveData: boolean;
    onchange: ((this: NetworkInformation, ev: Event) => unknown) | null;
  }

  // --- Battery Status API (Nuevo código) ---
  interface BatteryManager extends EventTarget {
    readonly charging: boolean;
    readonly chargingTime: number;
    readonly dischargingTime: number;
    readonly level: number;
    onchargingchange: ((this: BatteryManager, ev: Event) => unknown) | null;
    onchargingtimechange: ((this: BatteryManager, ev: Event) => unknown) | null;
    ondischargingtimechange: ((this: BatteryManager, ev: Event) => unknown) | null;
    onlevelchange: ((this: BatteryManager, ev: Event) => unknown) | null;
  }

  // --- Extensión de la interfaz Navigator ---
  interface Navigator {
    // Network
    readonly connection?: NetworkInformation;
    readonly mozConnection?: NetworkInformation;
    readonly webkitConnection?: NetworkInformation;
    
    // Battery
    // getBattery devuelve una promesa que resuelve con el BatteryManager
    getBattery?: () => Promise<BatteryManager>; 
  }
}
