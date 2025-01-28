module default {
    type Deck {
        required name: str;
        description: str;

        cards := (select .<deck[is Card] order by .order);
    }

    type Card {
        required order: int64 {
            constraint exclusive;
        };
        required front: str;
        required back: str;

        required deck: Deck;
    }
}
