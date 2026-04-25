import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { deleteComment } from "../../api/postApi";
import { useComments } from "../../context/CommentContext";
import toast from "react-hot-toast";


export default function Dropdown({ userId, id }) {

  const { authUser } = useContext(AuthContext);
  const {removeComment} = useComments();

  const handleDelete = async () => {

    try {


      const res = await deleteComment(id);
      removeComment(id)
      
    }
    catch (e) {

     toast.error(e.response.data.message);
    }



  }

  return (
    <div className="dropdown ms-auto">
      <button
        className="btn text-light border-0"
        type="button"
        data-bs-toggle="dropdown"
      >
        <i className="fa-solid fa-ellipsis"></i>
      </button>

      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark">


        {authUser?._id === userId?._id && (
          <>
            <li>
              <button className="dropdown-item">Edit</button>
            </li>

            <li>
              <button className="dropdown-item text-danger" onClick={handleDelete}>
                Delete
              </button>
            </li>

            <li>
              <hr className="dropdown-divider" />
            </li>
          </>
        )}

        <li>
          <button className="dropdown-item">Share</button>
        </li>

        <li>
          <button className="dropdown-item">Report</button>
        </li>

      </ul>
    </div>
  );
}