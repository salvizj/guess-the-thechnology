import { CalendarIcon, CircleQuestionMark } from "lucide-react"
import Card from "../../../components/base/Card"
import { Pill } from "../../../components/base/Pill"
import type { Quiz } from "../../../types/types"

type QuizCardProps = {
  quiz: Quiz
}
export const QuizCard = ({ quiz }: QuizCardProps) => {
  return (
    <Card className="flex flex-col justify-between gap-4 border border-border bg-surface-secondary p-5 hover:border-primary hover:bg-surface-secondary/50 hover:shadow-md">
      <div className="space-y-1.5">
        <h3 className="line-clamp-1">{quiz.title}</h3>
        <p className="line-clamp-2 text-content-secondary">
          {quiz.description}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/40">
        <Pill icon={<CircleQuestionMark />}>
          {quiz.questions.length}{" "}
          {quiz.questions.length === 1 ? "Question" : "Questions"}
        </Pill>
        <Pill icon={<CalendarIcon />}>
          {new Date(quiz.createdAt).toLocaleDateString()}
        </Pill>
      </div>
    </Card>
  )
}
