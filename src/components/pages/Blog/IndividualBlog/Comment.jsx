/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import moment from "moment";

const Comment = ({ cmt }) => {
 
  // const [open, setOpen] = useState(false)
  return (
    <div className="">
      <div className="pb-9">
        <div className="flex gap-4">
          <div className="flex-shrink-0"> 
            <img src={cmt.userinfo.photoURL} className="w-12 h-12 m-2 rounded-full" alt="commenter image" />
          </div>
          <div className="flex flex-col mt-3">
            <div className="items-center md:flex gap-x-7">
              <p className="md:font-bold text-semibold">{cmt.userinfo.displayName}</p>
              <p>{moment(cmt.date).format('MMMM Do YYYY')}</p>
              {/* <p className="">{cmt.date}</p> */}
            
            </div>
            <div>
              <p className="md:font-bold">
                {cmt.comment}
              </p>
            </div>


{/* Comment reply section */}
            {/* <div className="flex flex-col">
              <div className="flex items-center gap-8 pt-8">
                <img src={like} alt="" />
                <img src={dislike} alt="" />
                <p className="font-bold">Reply</p>
              </div>
              <div className="cursor-pointer">

                <div className="">
                  {
                    open ? <ReplyComment replyComments={cmt} /> : <div onClick={() => setOpen(!open)} className="flex items-center gap-2 mt-3">Reply <FaAngleDown /></div>
                  }

                  {
                    open == true ? <div onClick={() => setOpen(!open)} className="font-bold ">close reply comment</div> : ''
                  }
                </div>
              </div>
            </div> */}


          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;