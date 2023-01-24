let id = 0
const createId = () => {
  id += 1
  return id
}
const create = (attrs?: Partial<Item>): Item => {
  return {
    id: createId(),
    user_id: 1,
    amount: 1000,
    tag_ids: [1, 2],
    happen_at: '2021-08-01T00:00:00.000Z',
    created_at: '2021-08-01T00:00:00.000Z',
    updated_at: '2021-08-01T00:00:00.000Z',
    kind: 'expenses',
    ...attrs
  }
}

const createList = (n: number, attrs?: Partial<Item>): Item[] => {
  return Array.from({ length: n }).map(() => create(attrs))
}
const createResponse = ({ count = 100, perPage = 10, page = 1 }, attrs?: Partial<Item>): Resources<Item> => {
  return {
    resources: createList(perPage, attrs),
    pager: {
      page,
      per_page: perPage,
      count
    }
  }
}

export const itemsMock = {
  url: '/api/v1/items',
  method: 'get',
  response: ({ query }: ResponseParms): Resources<Item> => {
    return createResponse({ count: 100, perPage: 10, page: parseInt(query.page) })
  },
}
