export interface IReview {
    id: string
    rating: number
    comment: string
    createdAt: Date
    updatedAt: Date
    userId: string
    movieId: string
    movieTitle?: string
    user: {
        id: string
        name: string
        email: string
    }
}