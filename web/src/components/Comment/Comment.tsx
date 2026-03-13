import { useMutation } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import { QUERY as CommentsQuery } from 'src/components/CommentsCell'

const DELETE_COMMENT = gql`
  mutation DeleteCommentMutation($id: Int!) {
    deleteComment(id: $id) {
      postId
    }
  }
`

interface Props {
  comment: {
    id: number
    name: string
    body: string
    postId: number
    createdAt: string
  }
}

const Comment = ({ comment }: Props) => {
  const { hasRole } = useAuth()

  const [deleteComment] = useMutation(DELETE_COMMENT, {
    refetchQueries: [
      {
        query: CommentsQuery,
        variables: { postId: comment.postId },
      },
    ],
  })

  const onDeleteClick = () => {
    if (confirm('Are you sure?')) {
      deleteComment({ variables: { id: comment.id } })
    }
  }

  return (
    <div>
      <h2>{comment.name}</h2>
      <time dateTime={comment.createdAt}>{comment.createdAt}</time>
      <p>{comment.body}</p>
      {hasRole('moderator') && (
        <button type="button" onClick={onDeleteClick}>
          Delete
        </button>
      )}
    </div>
  )
}

export default Comment
