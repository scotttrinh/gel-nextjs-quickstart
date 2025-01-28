module default {
    type Deck {
        required name: str;
        description: str;
    }

    type Card {
        required front: str;
        required back: str;

        required deck: Deck {
            order: int32;
        };
    }
}
