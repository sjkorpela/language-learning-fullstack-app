
async function formatTags(tagString, tagList) {
  return new Promise(async (resolve) => {

    //If tag string is already array, return it as is
    if (tagString instanceof Array) {
      return tagString;
    }

    // Array to store parsed ids in
    const ids = [];

    // Regex to find digits of any length
    const regex = new RegExp(/(\d+)/g);

    // Find and store all ids from tag string, "1,2,3" -> [1, 2, 3]
    const matches = [...tagString.matchAll(regex)];
    matches.forEach((it) => {
      ids.push(it[0]);
    })

    // Array to store tags in
    const tags = [];

    // Find all tags based on id from tag list
    for (let id of ids) {
      for (let tag of tagList) {
        if (tag.id == id) {
          tags.push(tag);
          break;
        }
      }
    }

    // Resolve with found tags
    resolve(tags);
  });
}

export {
  formatTags
}