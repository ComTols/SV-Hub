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
  aura: number,
  comments: Post[]
}

interface Answer<T> {
  access: boolean
  msg: string
  error: []
  content?: T
}

interface User {
  id: string
  email: string
  username: string
  forename: string
  lastname?: string
  telenum?: string
  password?: string
  token?: string
}
