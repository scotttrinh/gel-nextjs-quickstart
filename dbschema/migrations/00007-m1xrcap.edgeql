CREATE MIGRATION m1xrcapfbp7n4aparhik7lx6pi6npodrlkhx5jnho3vec6fcfxy55q
    ONTO m1c664b65om3hublx74w5ghzvcsylkdx43f3pferdqjielq5t4aopa
{
  ALTER TYPE default::Card {
      ALTER ACCESS POLICY deck_creator_full_access ALLOW ALL;
  };
  ALTER TYPE default::Deck {
      CREATE ACCESS POLICY deck_creator_full_access
          ALLOW ALL USING ((.creator ?= GLOBAL default::current_user));
  };
};
