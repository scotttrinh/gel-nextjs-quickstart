with
  cardId := <uuid>$cardId,
  front := <str>$front,
  back := <str>$back,
update Card
filter .id = cardId
set {
  front := front,
  back := back,
};
