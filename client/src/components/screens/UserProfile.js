import React,{useEffect,useState,useContext} from "react";
import {UserContext} from '../../App'
import { useParams } from "react-router-dom";

const Profile = ()=>{
    const [userProfile,setProfile] = useState(null);
    const {state,dispatch} = useContext(UserContext)
    const [showfollow,setShowFollow] = useState(true);
    const {userid} = useParams();
    console.log(userid);
    useEffect(()=>{
     fetch(`/user/${userid}`,{
        headers:{
            "Authorization":"Bearer "+localStorage.getItem("jwt")

        }
     }).then(res=>res.json())
     .then(result=>{
      console.log(result);
      setProfile(result);
     })
    },[])

    const followUser = () => {
        fetch("/follow", {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
          body: JSON.stringify({
            followId: userid,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            dispatch({
              type: "UPDATE",
              payload: { following: data.following, followers: data.followers },
            });
            localStorage.setItem("user", JSON.stringify(data)); // localstorage got updated
            setProfile((prevState) => {
              return {
                ...prevState,
                user: {
                  ...prevState.user,
                  followers: [...prevState.user.followers, data._id],
                }, // we have override prevoius state with new state(data)  basically we updated the followers of a user immediently after we followed him
              };
            });
            setShowFollow(false);
          });
      };

      const unfollowUser = () => {
        fetch("/unfollow", {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
          body: JSON.stringify({
            unfollowId: userid,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            dispatch({
              type: "UPDATE",
              payload: { following: data.following, followers: data.followers },
            });
            localStorage.setItem("user", JSON.stringify(data)); // localstorage got updated
    
            setProfile((prevState) => {
              const newFollower = prevState.user.followers.filter(
                (item) => item !== data._id
              );
              return {
                ...prevState,
                user: {
                  ...prevState.user,
                  followers: newFollower,
                }, // we have override prevoius state with new state(data)  basically we updated the followers of a user immediently after we followed him
              };
            });
            setShowFollow(true);
          });
      };


return (
    <>
    {userProfile? <div style={{
        maxWidth:"550px",
        margin:"0px auto"
    }}>
        <div style={{
            display:"flex",
            justifyContent:"space-around",
            margin:"18px 0px",
            borderBottom:"1px solid grey"
        }}>
            <div>
            <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
           src={userProfile.user.pic}
           />
            </div>
            <div>
             <h4>{userProfile.user.name}</h4>
             <h5>{userProfile.user.email}</h5>
             <div style={{
                 display:"flex",
                 justifyContent:"space-between",
                 width:"108%"
             }}>
                <h6>{userProfile.posts.length} posts</h6>
                <h6> {userProfile.user.followers.length} followers </h6>
                <h6> {userProfile.user.following.length} following</h6>
             </div>

             {showfollow?<button className="waves-effect waves-light btn-small #42a5f5 blue darken-1"
onClick={()=>followUser()}
>Follow</button>:<button className="waves-effect waves-light btn-small #42a5f5 blue darken-1"
onClick={()=>unfollowUser()}
>Unfollow</button>}
             

            </div>
        </div>
        <div className="gallery">
            {
                userProfile.posts.map(item=>{
                    return(
                    <img src={item.photo} alt={item.title}/>
                    )
                })
            }
  
  
        </div>
    </div> :<h2>loading.......</h2>}
    
    </>

)
}

export default Profile;