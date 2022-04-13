function core(item:any){
  if(item.children.length === 0){
    return {
      ...item,
      children: null
    }
  }else{
    for(let i = 0; i < item.children.length; i++){
      item.children[i] = core(item.children[i])
    }
    return item
  }
}

function childrenHandler(items:any) {
  // 校验数组中的每个 children 是否为空数组，若为空数组，则转化为 null。避免 antd 的表格渲染空列表
  for(let i = 0; i < items.length; i++) {
    items[i] = core(items[i])
  }
  return items
}

export default childrenHandler