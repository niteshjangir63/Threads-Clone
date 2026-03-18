export default function PostActions(){

    return (

        <>
        
        <div className="d-flex flex-row mt-1 gap-4 placeholder-glow">
                    {<span class="placeholder col-4"></span> ||
                        <> <span title="Like"><img className="post-bottom-button" src="src/svgIcons\heart.svg" alt="" /></span>
                            <span title="Comment"><img className="post-bottom-button" src="src\svgIcons\comment.svg" alt="" /></span>
                            <span title="Repost"><img className="post-bottom-button" src="src\svgIcons\repost.svg" alt="" /></span>
                            <span title="Share"><img className="post-bottom-button" src="src\svgIcons\share.svg" alt="" /></span> </>}

                </div>

        </>
    )
}