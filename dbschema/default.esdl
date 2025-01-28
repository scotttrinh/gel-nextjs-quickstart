module default {
    type Deck {
        required name: str;
        description: str;

        cards := (select .<deck[is Card] order by @order);
    }

    type Card {
        required front: str;
        required back: str;

        required deck: Deck {
            order: int32;
        };
    }
}
