CREATE MIGRATION m1kvo3bkcnuhgyn4s57fois6umpelugqbj663xjojolg257wy3kgmq
    ONTO m125ajrbqp7ov36s7aniefxc376ofxdlketzspy4yddd3hrh4lxmla
{
  ALTER TYPE default::Deck {
      CREATE LINK cards := (SELECT
          .<deck[IS default::Card]
      ORDER BY
          @order ASC
      );
  };
};
