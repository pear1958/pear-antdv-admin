import { deepClone } from '@/utils/common'

/**
 * @description 扁平化数组对象(主要用来处理路由菜单) 他的children不剔除, 只是把所有children下的元素 提到第一级来
 * @param {Array} menuList 所有菜单列表
 * @return Array
 */
export function getFlatArr(menuList) {
  let newMenuList = JSON.parse(JSON.stringify(menuList))

  return newMenuList.reduce((pre, current) => {
    let flatArr = [...pre, current]

    if (current.children) flatArr = [...flatArr, ...getFlatArr(current.children)]

    return flatArr
  }, [])
}

/**
 * @description: 根据 当前的路径 获取 匹配的所有路由对象
 * @param {String} path 当前的路径
 * @param {menuItem[]} menuList 所有的菜单数据
 * @return Array
 */
export function getBreadcrumbList(path, menuList) {
  let matchRouteList = []

  try {
    const getNodePath = node => {
      matchRouteList.push(node)

      // 找到该路径, 结束循环
      if (node.path === path) throw new Error('Find IT!')

      if (node.children?.length) node.children.forEach(item => getNodePath(item))

      // 没有找到该路径, 删除路由对象
      matchRouteList.pop()
    }

    menuList.forEach(item => getNodePath(item))
  } catch (e) {
    return matchRouteList
  }
}

// 递归删除meta中 showInMenu 为false的路由
export function filterMenuData(menuData) {
  // 处理第一层的菜单数据
  const tempData = deepClone(menuData).filter(item => item.meta?.showInMenu !== false)

  tempData.forEach(item => {
    if (item.children) item.children = filterMenuData(item.children)
  })

  return tempData
}
