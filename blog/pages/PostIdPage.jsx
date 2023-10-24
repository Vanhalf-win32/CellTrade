import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostService from "../api/PostService";
import { useFetching } from "../components/hooks/useFetching";
import Loader from "../components/UI/loader/Loader";

export default function PostIdPage() {
    const params = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [gender, setGender] = useState("");
    const [users, setUsers] = useState("");


    const [fetchPostById, isPostLoading, postError] = useFetching(async () => {
        const response = await PostService.getById(params.id);
        setPost(response.data);
    })


    const [fetchUsers, isUsersLoading, usersError] = useFetching(async () => {
        const response = await PostService.getUsers(params.id);
        setUsers(response.data[0].username);
    })

    const [fetchComment, isComLoading, comError] = useFetching(async () => {
        const response = await PostService.getComments(params.id);
        setComments(response.data);
    })

    const [fetchGender, isGenderLoading, gendError] = useFetching(async () => {
        const response = await PostService.getGender(users);
        setGender(response.data.gender);
    })

    useEffect(() => {
        fetchPostById(params.id);
        fetchComment(params.id);
        fetchUsers(params.id);
        fetchGender(users);
    }, [users]);

    return (
        <div>
            {
                isPostLoading ? <Loader /> :
                    <p>
                        <div className="post">
                            <h1>{post.id}.</h1><br/>
                            <h2>{post.title}.</h2><br />
                            {post.body}
                            <h3>
                                User ID: {post.userId}<br/>
                                User: {users}<br/>
                                Gender: {gender}
                            </h3>

                        </div>
                        <div>
                            <div style={{ marginTop: 15, marginLeft: 5 }}>Comments:{
                                comments.map((comm) =>
                                    <div style={{ marginTop: 15 }}>
                                        <div style={{ marginLeft: 15 }}>
                                            {comm.body}
                                        </div>
                                        <h5 style={{ marginLeft: 20 }}>
                                            {comm.email}
                                        </h5>

                                    </div>
                                )}</div>
                        </div>
                    </p>
            }
        </div>
    )
}
