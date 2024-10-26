interface HubSpace {
  title: string
  hubs: SubHub[]
}

interface SubHub {
  id: string
  title: string
}

interface Post {
  id: string,
  title: string,
  numberOfComments: number,
  content: string,
  aura: number
}
