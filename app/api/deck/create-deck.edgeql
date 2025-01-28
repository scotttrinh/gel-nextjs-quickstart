with
  name := <str>$name,
  description := <optional str>$description,
  cards := enumerate(array_unpack(<array<tuple<front: str, back: str>>>$cards)),
  DECK := (
    insert Deck {
      name := name,
      description := description,
      creator := global current_user,
    }
  ),
  CARDS := (
    for card in cards
    insert Card {
      order := card.0,
      front := card.1.front,
      back := card.1.back,
      deck := DECK,
    }
  ),
select DECK;
