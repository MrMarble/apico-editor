export interface Player {
  slots: Array<Item | Bee>
  name: string
  money: number
  honeycore: number
}

interface Item {
  item: string
  stats: Record<string, unknown>
  total_health: number
  current_health: number
  count: number
}



export interface Bee extends Item {
  item: "bee"
  stats: {
    species: string
    beetrice: number
    queen: number
    shiny: number
    d_traits: Traits
    r_traits: Traits
  }
}

export const isBee = (item: Item): item is Bee => item.item === "bee"

export interface Traits {
  aggresive: number
  behaviour: string
  chionophile: number
  climate: string
  fertility: string
  lifespan: string
  pluviophile: number
  productivity: string
  species: string
  stability: string
}
