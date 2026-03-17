import "./Post.css"
export default function Post(){

    return (

        <>

        <div className="container post-box p-3">

            
                <div className="d-flex flex-row">
                    <span className="ml-auto mb-3 post-profile ">
                        <img src="https://img.freepik.com/premium-photo/nature-wallpaper-beautiful-nature-wallpaper-4k-nature-wallpapers-hd-nature-wallpaper-green-nature_722194-175.jpg?w=1380" alt="profile" />
                    </span>
                    <span className="ms-2">
                        Username
                    </span>
                    <span className="ms-2">
                        Follow
                    </span>

                    <span className="ms-auto">
                        <i class="fa-solid fa-ellipsis"></i>
                    </span>

                </div>
                
                <div className="mb-3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam possimus fugit aperiam reprehenderit dolorum! Dolores ipsum fugiat saepe nostrum dolor culpa doloribus quos deleniti mollitia facere. Ex quaerat atque in?
                </div>

                <div className="col-6 post">
                
                <img src="https://img.freepik.com/premium-photo/nature-wallpaper-beautiful-nature-wallpaper-4k-nature-wallpapers-hd-nature-wallpaper-green-nature_722194-175.jpg?w=1380" alt="image" />
                </div>

                <div className="d-flex flex-row mt-1 gap-4">
                    
                    <span title="Like"><img className="post-bottom-button" src="src/svgIcons\heart.svg" alt="" /></span>
                    <span title="Comment"><img className="post-bottom-button" src="src\svgIcons\comment.svg" alt="" /></span>
                    <span title="Repost"><img className="post-bottom-button" src="src\svgIcons\repost.svg" alt="" /></span>
                    <span title="Share"><img className="post-bottom-button" src="src\svgIcons\share.svg" alt="" /></span>

                </div>


        </div>
        <hr />

        </>
    )
}