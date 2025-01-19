

export default function TagManager({ tags, addedtag, deletedTag}) {

  async function postTag(event) {
    event.preventDefault();
    const name = event.target.name.value;

    const response = await fetch("api/tags", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "name": name
      })
    })

    addedtag({name: name})
  }

  async function deleteTag(id) {

    const response = await fetch(`api/tags/${id}`, {
      method: "DELETE"
    })

    deletedTag(id);
  }

  return (
    <div className="tag-manager">
      <form onSubmit={postTag}>
        <input type="text" id="name" name="name" placeholder="Add new tag" required></input>
        <input type="submit" className="button green" value="Add"></input>
      </form>
      <div className="tag-pool flex justify-center">
        {
          tags.map((tag) => {
            return (
              <div key={tag.id} className="tag flex">
                {tag.name}
                <button onClick={() => deleteTag(tag.id)} className="button red">X</button>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}