export default function CommentActions() {

    return (


        <>

            <div className="d-flex flex-row mt-1 gap-2">

                <span title="Like">
                    <img
                        className="post-bottom-button"
                        src="/svgIcons/heart.svg"

                    />
                    <span style={{ fontSize: "13px" }}>
                        {0}
                    </span>
                </span>

                <span title="Comment">
                    <img className="post-bottom-button" src="/svgIcons/comment.svg" alt="comment" />
                    <span style={{ fontSize: "13px" }}>

                    </span>
                </span>

                <span title="Repost">
                    <img className="post-bottom-button" src="/svgIcons/repost.svg" alt="repost" />
                </span>

                <span title="Share">
                    <img className="post-bottom-button" src="/svgIcons/share.svg" alt="share" />
                </span>

            </div>

        </>
    )
}