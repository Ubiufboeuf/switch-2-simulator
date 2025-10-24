import type { Section } from './Section'

export type FocusNode = {
  up: string
  left: string
  down: string
  right: string
}

export type MapStructure = (string | null)[][]

export class FocusMap {
  // Guarda todas las secciones: {'sectionA': Section, 'sectionB': Section, ...}
  private entities: Map<string, Section> = new Map()

  // Estructura de las conexiones: {'boxA': {'up': 'boxB', ...}, ...}
  private topology: Map<string, FocusNode> = new Map()

  // "Memoria" del foco de las secciones: {'sectionId': 'lastFocusedBoxId', ...}
  private sectionMemory: Map<string, string> = new Map()

  constructor (structure: MapStructure) {
    console.log('FocusMap', structure)
  }

  getRestoredFocusId (sectionId: string) {
    return this.sectionMemory.get(sectionId) || null
  }
  
  saveFocus (sectionId: string, boxId: string) {
    this.sectionMemory.set(sectionId, boxId)
  }
}
