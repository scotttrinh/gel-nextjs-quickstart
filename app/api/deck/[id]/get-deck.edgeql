with deckId := <uuid>$deckId,
select Deck {
  id,
  name,
  description,
  cards: {
    id,
    front,
    back,
  },
} filter .id = deckId
