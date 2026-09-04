import { Button } from "../../../components/base/Button"
import type { Question } from "../../../types/types"

type PlayQuestionProps = {
  question: Question
  onAnswer: (questionId: string, answerId: string) => void
  selectedAnswerIds: Record<string, string[]>
  onNextQuestion: () => void
  onPreviousQuestion: () => void
  onSubmit: () => void
  isLastQuestion: boolean
}

export const PlayQuestion = ({
  question,
  onAnswer,
  selectedAnswerIds,
  isLastQuestion,
  onNextQuestion,
  onPreviousQuestion,
  onSubmit,
}: PlayQuestionProps) => {
  if (!question) {
    return <p>No question available.</p>
  }

  return (
    <div className="flex flex-col gap-4">
      <img
        src={question.imageUrl}
        alt={`Image for question ${question.title}`}
        className="w-full max-h-64 object-cover rounded-lg"
      />

      <h2 className="text-lg font-semibold">{question.title}</h2>

      <div className="flex flex-col gap-2">
        {question.answers.map((option) => {
          const isSelected = selectedAnswerIds[question.id]?.includes(
            String(option.id),
          )
          return (
            <Button
              key={option.id}
              onClick={() => onAnswer(String(question.id), String(option.id))}
              variant={isSelected ? "secondary" : "outline"}
            >
              {option.optionText}
            </Button>
          )
        })}
      </div>
      <div className="flex justify-between mt-4">
        <Button onClick={onPreviousQuestion} variant="secondary">
          Previous
        </Button>
        {isLastQuestion ? (
          <Button onClick={onSubmit} variant="primary">
            Submit
          </Button>
        ) : (
          <Button onClick={onNextQuestion} variant="primary">
            Next
          </Button>
        )}
      </div>
    </div>
  )
}
