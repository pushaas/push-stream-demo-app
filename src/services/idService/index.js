let globalId = 1

const generateGlobalId = () => globalId++

const createIdGenerator = () => {
  let id = 1
  return () => id++
}

export default {
  generateGlobalId,
  createIdGenerator,
}
