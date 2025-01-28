CREATE MIGRATION m1xeajs7yjfabwo2yv7din4ernpyq7waslopqcrldy3tkt6nbil7da
    ONTO m1kvo3bkcnuhgyn4s57fois6umpelugqbj663xjojolg257wy3kgmq
{
  ALTER TYPE default::Card {
      CREATE REQUIRED PROPERTY order: std::int64 {
          SET REQUIRED USING (<std::int64>.deck@order ?? 0);
      };
  };
  ALTER TYPE default::Deck {
      ALTER LINK cards {
          USING (SELECT
              .<deck[IS default::Card]
          ORDER BY
              .order ASC
          );
      };
  };
};
