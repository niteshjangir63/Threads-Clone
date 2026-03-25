export default function PostActions() {
  return (
    <div className="d-flex flex-row mt-1 gap-4">

      <span title="Like">
        <img className="post-bottom-button" src="src/svgIcons/heart.svg" alt="like" />
      </span>

      <span title="Comment">
        <img className="post-bottom-button" src="src/svgIcons/comment.svg" alt="comment" />
      </span>

      <span title="Repost">
        <img className="post-bottom-button" src="src/svgIcons/repost.svg" alt="repost" />
      </span>

      <span title="Share">
        <img className="post-bottom-button" src="src/svgIcons/share.svg" alt="share" />
      </span>

    </div>
  );
}