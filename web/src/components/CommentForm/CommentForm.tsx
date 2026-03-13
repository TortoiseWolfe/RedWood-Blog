import {
  Form,
  Label,
  TextField,
  TextAreaField,
  Submit,
  FieldError,
  FormError,
  SubmitHandler,
  useForm,
} from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY as CommentsQuery } from 'src/components/CommentsCell'

const CREATE_COMMENT = gql`
  mutation CreateCommentMutation($input: CreateCommentInput!) {
    createComment(input: $input) {
      id
      name
      body
      createdAt
    }
  }
`

interface Props {
  postId: number
}

interface FormValues {
  name: string
  body: string
}

const CommentForm = ({ postId }: Props) => {
  const formMethods = useForm()

  const [createComment, { loading, error }] = useMutation(CREATE_COMMENT, {
    onCompleted: () => {
      toast.success('Comment submitted!')
      formMethods.reset()
    },
    refetchQueries: [{ query: CommentsQuery, variables: { postId } }],
  })

  const onSubmit: SubmitHandler<FormValues> = (input) => {
    createComment({ variables: { input: { ...input, postId } } })
  }

  return (
    <div className="comment-form">
      <h3>Leave a Comment</h3>
      <Form onSubmit={onSubmit} formMethods={formMethods} error={error}>
        <FormError error={error} wrapperClassName="form-error" />

        <Label name="name" errorClassName="error">
          Name
        </Label>
        <TextField
          name="name"
          validation={{ required: true }}
          errorClassName="error"
        />
        <FieldError name="name" className="error" />

        <Label name="body" errorClassName="error">
          Comment
        </Label>
        <TextAreaField
          name="body"
          validation={{ required: true }}
          errorClassName="error"
        />
        <FieldError name="body" className="error" />

        <Submit disabled={loading}>Submit</Submit>
      </Form>
    </div>
  )
}

export default CommentForm
