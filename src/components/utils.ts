function extract_menu_key_list(data: any) {
  let menu_key_list: string[] = [];
  for (let item in data) {
    menu_key_list.push(data[item].url);
    if (data[item].children) {
      menu_key_list = menu_key_list.concat(
        extract_menu_key_list(data[item].children),
      );
    }
  }
  return menu_key_list;
}

export { extract_menu_key_list };
