module default {
    type Deck {
        required name: str;
        description: str;

        multi cards := .<deck[is Card];
    }

    type Card {
        required front: str;
        required back: str;

        required deck: Deck;
    }
}
