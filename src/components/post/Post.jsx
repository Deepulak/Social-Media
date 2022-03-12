import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Post({post}) {
    const [like, setLike ] = useState(post.likes.length);
    const [isLiked, setIsLiked ] = useState(false);
    const [user, setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user: currentUser} = useContext(AuthContext)

    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id));
    }, [currentUser._id, post.likes]);

    useEffect = ( async () => {
        const fetchUser = async ()  => {
          const res = await axios.get(`/users?userId=${post.userId}`);
          setUser(res.data);
        };
        fetchUser();
      }, [post.userId]);

    const likeHandler = () => {
        try {
            axios.put("/possts/"+post._id+"/like", { userId: currentUser._id });
        } catch(err) {

        }
        setLike(isLiked ? like-1 : like+1);
        setIsLiked(!isLiked);
    }
    return (
    <div className="post">
        <div className="postWrapper">
            <div className="postTop">
                <div className="topPostLeft">
                    <Link to={`profile.${user.username}`}>
                    <img src={ user.prfofilePicture ? PF + user.prfofilePicture : PF+"person.noAvatar.png"} alt="postProfileImg" className="postProfileImg" />
                    </Link>
                    <span className="postUserName">{user.username}</span>
                    <span className="postDate">{format(post.createAt)}</span>
                </div>
                <div className="postTopRight">
                    <MoreVert />
                </div>
            </div>
            <div className="postCenter">
                <span className="postText">{post?.desc}</span>
                <img className="postImg" src={PF + post.photo} alt="postImg" />
            </div>
            <div className="postBottom">
                <div className="postBottoLeft">
                    <img className="likeIcon" src={`${PF}like.png`} onClick={likeHandler} alt="likeIcon" />
                    <img className="likeIcon" src={`${PF}dislike.png`} onClick={likeHandler} alt="likeIcon" />
                    <span className="postLikeCounter">{post.like} people liked it</span>
                </div>
                <div className="postBottom">
                    <span className="postCommentText">{post.comment} comments</span>
                </div>
            </div>
        </div>
    </div>
  );
};
