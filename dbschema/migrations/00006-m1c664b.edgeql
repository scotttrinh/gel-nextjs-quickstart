CREATE MIGRATION m1c664b65om3hublx74w5ghzvcsylkdx43f3pferdqjielq5t4aopa
    ONTO m1wvmr2ph7loivjknt2swyvtnstlf6wpf3vlioihtjp27obrvffb3a
{
  CREATE SINGLE GLOBAL default::access_token -> std::str;
  CREATE TYPE default::User {
      CREATE REQUIRED PROPERTY name: std::str;
  };
  CREATE TYPE default::AccessToken {
      CREATE REQUIRED LINK user: default::User;
      CREATE REQUIRED PROPERTY token: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
  };
  CREATE SINGLE GLOBAL default::current_user := (((SELECT
      default::AccessToken
  FILTER
      (.token = GLOBAL default::access_token)
  )).user);
  ALTER TYPE default::Deck {
      CREATE REQUIRED LINK creator: default::User {
          SET REQUIRED USING (std::assert_exists((SELECT
              default::User 
          LIMIT
              1
          )));
      };
  };
  ALTER TYPE default::Card {
      CREATE ACCESS POLICY deck_creator_full_access
          ALLOW SELECT, UPDATE, INSERT USING ((.deck.creator ?= GLOBAL default::current_user));
  };
};
