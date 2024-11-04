import { Star } from "phosphor-react";

export const renderStars = (rating: number) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
        stars.push(
            <Star
                key={i}
                weight={i <= rating ? "fill" : "regular"}
                color="yellow"
                size={24}
            />
        );
    }

    return stars;
};
