
/**
 * Renders total of all scores, and score by tag.
 * @param {Object[]} scores Array of score objects, score objects must have tags and points
 * @param {Object[]} tags Array of tag objects, tag objects must have an id and a name
 * @returns a list of scores :)
 */
export default function Scoreboard({ scores = [], tags = [] }) {

  let total = 0;

  // Count total score
  for (let score of scores) {
    total += score.points;
  }

  // Count all tags scores
  for (let tag of tags) {
    tag.score = 0;
    for (let score of scores) {
      for (let stag of score.tags) {
        if (tag.id == stag.id) { tag.score++ };
      }
    }
  }

  return (
    <div className="scoreboard">
      <h3>Total: {total}</h3>
      {
        tags.map((tag) => {
          return (
            <h3 key={tag.id}>{tag.name}: {tag.score}</h3>
          )
        })
      }

    </div>
  )
}