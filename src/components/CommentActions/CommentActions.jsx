import "./CommentActions.css";

export default function CommentActions() {
    return (
        <div className="post-actions">

            <span className="post-action like" title="Like">
                <img
                    className="post-bottom-button"
                    src="/svgIcons/heart.svg"
                    alt="Like"
                />
                <span className="post-action-count">0</span>
            </span>

            <span className="post-action comment" title="Comment">
                <img
                    className="post-bottom-button"
                    src="/svgIcons/comment.svg"
                    alt="Comment"
                />
            </span>

            <span className="post-action repost" title="Repost">
                <img
                    className="post-bottom-button"
                    src="/svgIcons/repost.svg"
                    alt="Repost"
                />
            </span>

            <span className="post-action share" title="Share">
                <img
                    className="post-bottom-button"
                    src="/svgIcons/share.svg"
                    alt="Share"
                />
            </span>

        </div>
    );
}