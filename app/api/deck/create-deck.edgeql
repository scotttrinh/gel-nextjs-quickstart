with
  name := <str>$name,
  description := <optional str>$description,
  cards := enumerate(array_unpack(<array<tuple<front: str, back: str>>>$cards)),
  DECK := (
    insert Deck {
      name := name,
      description := description,
    }
  ),
  CARDS := (
    for card in cards
    insert Card {
      front := card.1.front,
      back := card.1.back,
      deck := (
        select DECK {
          @order := <int32>card.0,
        }
      ),
    }
  ),
select DECK;
