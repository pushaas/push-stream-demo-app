let globalId = 1

export const generateGlobalId = () => globalId++

export const createIdGenerator = () => {
  let id = 1
  return () => id++
}
