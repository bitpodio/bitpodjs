export function formatGQLResult(data, modelName) {
  if (!data[modelName]) {
    return []
  }
  let { edges } = data[modelName][`${modelName}Find`]
  edges = edges.map(({ node }) => node)
  return edges
}
