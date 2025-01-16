
/**
 * Renders a list of options with checkboxes, and calls back with form submission event.
 *
 * @param {Object[]} options An array of objects to check off, option objects require an id and a name
 * @param {function} callback Function to be called back when form is submitted
 * @returns A table of a column of checkboxes and a column of option names
 */
export default function CheckList({ options, callback }) {

  return (
    <form onSubmit={callback}>
    <table className="checklist">
      <tbody>
        {
          options.map((option) => {
            return (
              <tr key={option.id}>
                <td><input type="checkbox" id={option.id} name={option.name}></input></td>
                <td><h3>{option.name}</h3></td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
    <button type="submit" className="button">Apply</button>
  </form>
  )
}