export interface Actor {
  id: string
  name: string
  musicalIds: string[]
}

export const actors: Actor[] = [
  { id: "a1", name: "홍광호", musicalIds: ["1", "3"] },
  { id: "a2", name: "박강현", musicalIds: ["1"] },
  { id: "a3", name: "김준수", musicalIds: ["2"] },
  { id: "a4", name: "조승우", musicalIds: ["3"] },
  { id: "a5", name: "옥주현", musicalIds: ["2", "3"] },
]