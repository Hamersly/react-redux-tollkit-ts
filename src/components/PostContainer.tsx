import {
	useCreatePostMutation,
	useDeletePostMutation,
	useFetchAllPostsQuery,
	useUpdatePostMutation
} from "../services/postService";
import {PostItem} from "./PostItem";
import React, {useState} from "react";
import {IPost} from "../models/IPost";

export const PostContainer = () => {
	const [limit, setLimit] = useState(10)
	const {data: posts, error, isLoading, refetch} = useFetchAllPostsQuery(limit)
	const [createPost, {error: createError, isLoading: createIsLoading}] = useCreatePostMutation()
	const [updatePost, {error: updateError, isLoading: updateIsLoading}] = useUpdatePostMutation()
	const [deletePost, {error: deleteError, isLoading: deleteIsLoading}] = useDeletePostMutation()
	// const {data: posts, error, isLoading, refetch} = postAPI.useFetchAllPostsQuery(limit,
	// 	{pollingInterval: 1000})

	// useEffect(() => {
	// 	setTimeout(() => {
	// 		setLimit(5)
	// 	}, 2000)
	// }, [])

	const handleCreate = async () => {
		const title = prompt()
		await createPost({title, body: title,} as IPost)
	}

	return (
		<div>
			<button onClick={() => refetch()}>REFETCH</button>
			<button onClick={handleCreate}>Create post</button>
			{isLoading && <h1>Loading...</h1>}
			{error && <h1>Произошла ошибка(((</h1>}
			{posts && posts.map(post => <PostItem key={post.id} post={post} update={updatePost} remove={deletePost}/>)}
		</div>
	);
};