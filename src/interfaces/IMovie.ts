import { IReview } from "./IReview"

export interface IMovie {
    id: string
    title: string
    description: string
    genre: string
    releaseYear: number
    duration: number
    createdAt: Date
    updatedAt: Date
    userId: string
    reviews: IReview[]
    user: {
        name: string
        email: string
    }
}