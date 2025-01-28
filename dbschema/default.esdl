module default {
    single global access_token: str;
    single global current_user := (select AccessToken filter .token = global access_token).user;

    type User {
        required name: str;
    }

    type AccessToken {
        required user: User;
        required token: str {
            constraint exclusive;
        };
    }

    type Deck {
        required name: str;
        description: str;

        required creator: User;

        cards := (select .<deck[is Card] order by .order);

        access policy deck_creator_full_access
            allow all using (
                .creator ?= global current_user
            );
    }

    type Card {
        required order: int64 {
            constraint exclusive;
        };
        required front: str;
        required back: str;

        required deck: Deck;

        access policy deck_creator_full_access
            allow all using (
                .deck.creator ?= global current_user
            );
    }
}
